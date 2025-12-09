const express = require('express');
const cors = require('cors');
const db = require('./db-fixed');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Enable foreign key constraints
db.run('PRAGMA foreign_keys = ON');

// API Routes
app.get('/api/doctors', (req, res) => {
  const {
    specialization,
    city,
    hospital,
    minRating,
    maxPrice,
    availableDay,
    search
  } = req.query;

  let query = `
    SELECT * FROM doctors 
    WHERE is_active = 1
  `;
  const params = [];

  if (specialization) {
    query += ` AND specialization LIKE ?`;
    params.push(`%${specialization}%`);
  }

  if (city) {
    query += ` AND city LIKE ?`;
    params.push(`%${city}%`);
  }

  if (hospital) {
    query += ` AND hospital_name LIKE ?`;
    params.push(`%${hospital}%`);
  }

  if (minRating) {
    query += ` AND rating >= ?`;
    params.push(parseFloat(minRating));
  }

  if (maxPrice) {
    query += ` AND consultation_fee <= ?`;
    params.push(parseFloat(maxPrice));
  }

  if (availableDay) {
    query += ` AND available_days LIKE ?`;
    params.push(`%${availableDay}%`);
  }

  if (search) {
    query += ` AND (name LIKE ? OR specialization LIKE ? OR hospital_name LIKE ?)`;
    params.push(`%${search}%`, `%${search}%`, `%${search}%`);
  }

  query += ` ORDER BY rating DESC, total_reviews DESC`;

  db.all(query, params, (err, doctors) => {
    if (err) {
      console.error('Error fetching doctors:', err);
      return res.status(500).json({ error: 'Failed to fetch doctors' });
    }
    res.json(doctors);
  });
});

app.get('/api/doctors/:id', (req, res) => {
  const doctorId = req.params.id;

  db.get('SELECT * FROM doctors WHERE id = ? AND is_active = 1', [doctorId], (err, doctor) => {
    if (err) {
      console.error('Error fetching doctor:', err);
      return res.status(500).json({ error: 'Failed to fetch doctor' });
    }

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    db.all(`
      SELECT dr.*, u.name as user_name 
      FROM doctor_reviews dr 
      JOIN users u ON dr.user_id = u.id 
      WHERE dr.doctor_id = ? 
      ORDER BY dr.review_date DESC
    `, [doctorId], (err, reviews) => {
      if (err) {
        console.error('Error fetching reviews:', err);
        return res.status(500).json({ error: 'Failed to fetch reviews' });
      }

      res.json({
        ...doctor,
        reviews
      });
    });
  });
});

app.get('/api/doctors/:id/available-slots', (req, res) => {
  const doctorId = req.params.id;
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: 'Date is required' });
  }

  db.get('SELECT available_time_slots, available_days FROM doctors WHERE id = ?', [doctorId], (err, doctor) => {
    if (err) {
      console.error('Error fetching doctor:', err);
      return res.status(500).json({ error: 'Failed to fetch doctor' });
    }

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    db.all('SELECT appointment_time FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND appointment_status != "cancelled"', 
      [doctorId, date], (err, appointments) => {
        if (err) {
          console.error('Error fetching appointments:', err);
          return res.status(500).json({ error: 'Failed to fetch appointments' });
        }

        const bookedTimes = appointments.map(apt => apt.appointment_time);
        const availableSlots = generateAvailableSlots(doctor.available_time_slots, bookedTimes);

        res.json({
          availableSlots,
          availableDays: doctor.available_days
        });
      });
  });
});

app.post('/api/appointments', (req, res) => {
  const {
    user_id,
    doctor_id,
    appointment_date,
    appointment_time,
    consultation_type,
    symptoms,
    notes
  } = req.body;

  if (!user_id || !doctor_id || !appointment_date || !appointment_time) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  db.get('SELECT consultation_fee FROM doctors WHERE id = ?', [doctor_id], (err, doctor) => {
    if (err) {
      console.error('Error fetching doctor:', err);
      return res.status(500).json({ error: 'Failed to fetch doctor' });
    }

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    db.get('SELECT id FROM appointments WHERE doctor_id = ? AND appointment_date = ? AND appointment_time = ? AND appointment_status != "cancelled"', 
      [doctor_id, appointment_date, appointment_time], (err, existingAppointment) => {
        if (err) {
          console.error('Error checking appointment:', err);
          return res.status(500).json({ error: 'Failed to check appointment availability' });
        }

        if (existingAppointment) {
          return res.status(409).json({ error: 'This time slot is already booked' });
        }

        const appointment = {
          user_id,
          doctor_id,
          appointment_date,
          appointment_time,
          consultation_type: consultation_type || 'in-person',
          symptoms: symptoms || '',
          notes: notes || '',
          total_amount: doctor.consultation_fee,
          payment_status: 'pending'
        };

        db.run(`
          INSERT INTO appointments (
            user_id, doctor_id, appointment_date, appointment_time, 
            consultation_type, symptoms, notes, total_amount, payment_status
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          appointment.user_id,
          appointment.doctor_id,
          appointment.appointment_date,
          appointment.appointment_time,
          appointment.consultation_type,
          appointment.symptoms,
          appointment.notes,
          appointment.total_amount,
          appointment.payment_status
        ], function(err) {
          if (err) {
            console.error('Error creating appointment:', err);
            return res.status(500).json({ error: 'Failed to book appointment' });
          }

          res.status(201).json({
            id: this.lastID,
            ...appointment
          });
        });
      });
  });
});

app.get('/api/users/:userId/appointments', (req, res) => {
  const userId = req.params.userId;

  db.all(`
    SELECT 
      a.*,
      d.name as doctor_name,
      d.specialization,
      d.hospital_name,
      d.hospital_address,
      d.profile_image as doctor_image,
      d.rating as doctor_rating
    FROM appointments a
    JOIN doctors d ON a.doctor_id = d.id
    WHERE a.user_id = ?
    ORDER BY a.appointment_date DESC, a.appointment_time DESC
  `, [userId], (err, appointments) => {
    if (err) {
      console.error('Error fetching appointments:', err);
      return res.status(500).json({ error: 'Failed to fetch appointments' });
    }

    res.json(appointments);
  });
});

app.patch('/api/appointments/:id', (req, res) => {
  const appointmentId = req.params.id;
  const { appointment_status, payment_status } = req.body;

  const updates = [];
  const params = [];

  if (appointment_status) {
    updates.push('appointment_status = ?');
    params.push(appointment_status);
  }

  if (payment_status) {
    updates.push('payment_status = ?');
    params.push(payment_status);
  }

  if (updates.length === 0) {
    return res.status(400).json({ error: 'No updates provided' });
  }

  params.push(appointmentId);

  db.run(`UPDATE appointments SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`, 
    params, function(err) {
      if (err) {
        console.error('Error updating appointment:', err);
        return res.status(500).json({ error: 'Failed to update appointment' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      res.json({ message: 'Appointment updated successfully' });
    });
  });

app.delete('/api/appointments/:id', (req, res) => {
  const appointmentId = req.params.id;

  db.run('UPDATE appointments SET appointment_status = "cancelled", updated_at = CURRENT_TIMESTAMP WHERE id = ?', 
    [appointmentId], function(err) {
      if (err) {
        console.error('Error cancelling appointment:', err);
        return res.status(500).json({ error: 'Failed to cancel appointment' });
      }

      if (this.changes === 0) {
        return res.status(404).json({ error: 'Appointment not found' });
      }

      res.json({ message: 'Appointment cancelled successfully' });
    });
  });

app.post('/api/doctors/:id/reviews', (req, res) => {
  const doctorId = req.params.id;
  const { user_id, appointment_id, rating, review_text } = req.body;

  if (!user_id || !rating || rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Valid user_id and rating (1-5) are required' });
  }

  db.get('SELECT id FROM appointments WHERE user_id = ? AND doctor_id = ? AND appointment_status = "completed"', 
    [user_id, doctorId], (err, appointment) => {
      if (err) {
        console.error('Error checking appointment:', err);
        return res.status(500).json({ error: 'Failed to verify appointment' });
      }

      if (!appointment) {
        return res.status(403).json({ error: 'You can only review doctors you have consulted with' });
      }

      db.get('SELECT id FROM doctor_reviews WHERE user_id = ? AND doctor_id = ?', 
        [user_id, doctorId], (err, existingReview) => {
          if (err) {
            console.error('Error checking existing review:', err);
            return res.status(500).json({ error: 'Failed to check existing review' });
          }

          if (existingReview) {
            return res.status(409).json({ error: 'You have already reviewed this doctor' });
          }

          db.run(`
            INSERT INTO doctor_reviews (user_id, doctor_id, appointment_id, rating, review_text)
            VALUES (?, ?, ?, ?, ?)
          `, [user_id, doctorId, appointment_id, rating, review_text || ''], function(err) {
            if (err) {
              console.error('Error adding review:', err);
              return res.status(500).json({ error: 'Failed to add review' });
            }

            updateDoctorRating(doctorId);

            res.status(201).json({
              id: this.lastID,
              message: 'Review added successfully'
            });
          });
        });
    });
  });

app.get('/api/specializations', (req, res) => {
  db.all('SELECT DISTINCT specialization FROM doctors WHERE is_active = 1 ORDER BY specialization', (err, specializations) => {
    if (err) {
      console.error('Error fetching specializations:', err);
      return res.status(500).json({ error: 'Failed to fetch specializations' });
    }
    res.json(specializations.map(s => s.specialization));
  });
});

app.get('/api/cities', (req, res) => {
  db.all('SELECT DISTINCT city, state FROM doctors WHERE is_active = 1 ORDER BY city', (err, cities) => {
    if (err) {
      console.error('Error fetching cities:', err);
      return res.status(500).json({ error: 'Failed to fetch cities' });
    }
    res.json(cities);
  });
});

app.get('/api/hospitals', (req, res) => {
  db.all('SELECT DISTINCT hospital_name FROM doctors WHERE is_active = 1 ORDER BY hospital_name', (err, hospitals) => {
    if (err) {
      console.error('Error fetching hospitals:', err);
      return res.status(500).json({ error: 'Failed to fetch hospitals' });
    }
    res.json(hospitals.map(h => h.hospital_name));
  });
});

app.get('/api/users', (req, res) => {
  db.all('SELECT * FROM users', (err, users) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).json({ error: 'Failed to fetch users' });
    }
    res.json(users);
  });
});

app.post('/api/users', (req, res) => {
  const { name, email, phone, password, address, city, state, pincode, date_of_birth, gender, blood_group, emergency_contact, emergency_contact_relation } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }

  db.run(`
    INSERT INTO users (name, email, phone, password, address, city, state, pincode, date_of_birth, gender, blood_group, emergency_contact, emergency_contact_relation)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [name, email, phone, password, address, city, state, pincode, date_of_birth, gender, blood_group, emergency_contact, emergency_contact_relation], function(err) {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    res.status(201).json({
      id: this.lastID,
      name,
      email
    });
  });
});

app.get('/api/orders', (req, res) => {
  db.all('SELECT * FROM orders', (err, orders) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }
    res.json(orders);
  });
});

app.post('/api/orders', (req, res) => {
  const { user_id, total_amount, status, payment_method, shipping_address } = req.body;

  if (!user_id || !total_amount) {
    return res.status(400).json({ error: 'User ID and total amount are required' });
  }

  db.run(`
    INSERT INTO orders (user_id, total_amount, status, payment_method, shipping_address)
    VALUES (?, ?, ?, ?, ?)
  `, [user_id, total_amount, status || 'pending', payment_method, shipping_address], function(err) {
    if (err) {
      console.error('Error creating order:', err);
      return res.status(500).json({ error: 'Failed to create order' });
    }

    res.status(201).json({
      id: this.lastID,
      user_id,
      total_amount
    });
  });
});

// Helper functions
function generateAvailableSlots(availableTimeSlots, bookedTimes) {
  const slots = [];
  const timeRanges = availableTimeSlots.split(', ');
  
  timeRanges.forEach(range => {
    const [start, end] = range.split('-');
    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    
    for (let hour = startHour; hour < endHour; hour++) {
      const timeSlot = `${hour.toString().padStart(2, '0')}:00`;
      if (!bookedTimes.includes(timeSlot)) {
        slots.push(timeSlot);
      }
    }
  });
  
  return slots;
}

function updateDoctorRating(doctorId) {
  db.get('SELECT AVG(rating) as avg_rating, COUNT(*) as total_reviews FROM doctor_reviews WHERE doctor_id = ?', 
    [doctorId], (err, result) => {
      if (err) {
        console.error('Error calculating rating:', err);
        return;
      }

      db.run('UPDATE doctors SET rating = ?, total_reviews = ? WHERE id = ?', 
        [result.avg_rating, result.total_reviews, doctorId], (err) => {
          if (err) {
            console.error('Error updating doctor rating:', err);
          }
        });
    });
  }

// Serve React app
app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
