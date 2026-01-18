require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const connectDB = require('./database');

// Import Mongoose models
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const Appointment = require('./models/Appointment');
const DoctorReview = require('./models/DoctorReview');
const Order = require('./models/Order');
const LabTest = require('./models/LabTest');

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_change_in_production';

// Connect to MongoDB
connectDB();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) return res.status(401).json({ error: 'Authentication token required' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Invalid or expired token' });
        req.user = user;
        next();
    });
};

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes

// Get all doctors with filters
app.get('/api/doctors', async (req, res) => {
    try {
        const {
            specialization,
            city,
            hospital,
            minRating,
            maxPrice,
            availableDay,
            search
        } = req.query;

        let filter = { is_active: true };

        if (specialization) {
            filter.specialization = new RegExp(specialization, 'i');
        }
        if (city) {
            filter.city = new RegExp(city, 'i');
        }
        if (hospital) {
            filter.hospital_name = new RegExp(hospital, 'i');
        }
        if (minRating) {
            filter.rating = { $gte: parseFloat(minRating) };
        }
        if (maxPrice) {
            filter.consultation_fee = { $lte: parseFloat(maxPrice) };
        }
        if (availableDay) {
            filter.available_days = new RegExp(availableDay, 'i');
        }
        if (search) {
            filter.$or = [
                { name: new RegExp(search, 'i') },
                { specialization: new RegExp(search, 'i') },
                { hospital_name: new RegExp(search, 'i') }
            ];
        }

        const doctors = await Doctor.find(filter);
        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});

// Get doctor by ID
app.get('/api/doctors/:id', async (req, res) => {
    try {
        const doctor = await Doctor.findById(req.params.id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        res.json(doctor);
    } catch (error) {
        console.error('Error fetching doctor:', error);
        res.status(500).json({ error: 'Failed to fetch doctor' });
    }
});

// Get available slots for a doctor
app.get('/api/doctors/:id/available-slots', async (req, res) => {
    try {
        const { date } = req.query;
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Get booked appointments for this doctor on this date
        const appointments = await Appointment.find({
            doctor_id: req.params.id,
            appointment_date: new Date(date),
            appointment_status: { $ne: 'cancelled' }
        });

        const bookedTimes = appointments.map(apt => apt.appointment_time);

        // Generate available slots based on doctor's time slots
        const generateAvailableSlots = (timeSlots, bookedTimes) => {
            const slots = [];
            const timeRanges = timeSlots.split(',').map(t => t.trim());

            timeRanges.forEach(range => {
                const [start, end] = range.split('-');
                const [startHour] = start.split(':').map(Number);
                const [endHour] = end.split(':').map(Number);

                for (let hour = startHour; hour < endHour; hour++) {
                    const time = `${hour.toString().padStart(2, '0')}:00`;
                    if (!bookedTimes.includes(time)) {
                        slots.push(time);
                    }
                }
            });

            return slots;
        };

        const availableSlots = generateAvailableSlots(doctor.available_time_slots, bookedTimes);

        res.json({
            availableSlots,
            availableDays: doctor.available_days
        });
    } catch (error) {
        console.error('Error fetching available slots:', error);
        res.status(500).json({ error: 'Failed to fetch available slots' });
    }
});

// Get specializations
app.get('/api/specializations', async (req, res) => {
    try {
        const specializations = await Doctor.distinct('specialization');
        res.json(specializations);
    } catch (error) {
        console.error('Error fetching specializations:', error);
        res.status(500).json({ error: 'Failed to fetch specializations' });
    }
});

// Get cities
app.get('/api/cities', async (req, res) => {
    try {
        const cities = await Doctor.distinct('city');
        res.json(cities);
    } catch (error) {
        console.error('Error fetching cities:', error);
        res.status(500).json({ error: 'Failed to fetch cities' });
    }
});

// Get hospitals
app.get('/api/hospitals', async (req, res) => {
    try {
        const hospitals = await Doctor.distinct('hospital_name');
        res.json(hospitals);
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        res.status(500).json({ error: 'Failed to fetch hospitals' });
    }
});

// Book appointment (PROTECTED)
app.post('/api/appointments', authenticateToken, async (req, res) => {
    try {
        const {
            user_id,
            doctor_id,
            appointment_date,
            appointment_time,
            consultation_type,
            symptoms,
            notes
        } = req.body;

        console.log("Appointment Booking Request:");
        console.log("Logged in User:", req.user);
        console.log("Request Body:", req.body);

        // Security: Enforce that the logged-in user can only book for themselves
        if (String(req.user.id) !== String(user_id)) {
            console.error(`User mismatch: Token ID ${req.user.id} vs Body ID ${user_id}`);
            return res.status(403).json({ error: 'Cannot book appointments for other users' });
        }

        if (!user_id || !doctor_id || !appointment_date || !appointment_time) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Get doctor to fetch consultation fee
        const doctor = await Doctor.findById(doctor_id);
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }

        // Check if slot is available
        const existingAppointment = await Appointment.findOne({
            doctor_id,
            appointment_date: new Date(appointment_date),
            appointment_time,
            appointment_status: { $ne: 'cancelled' }
        });

        if (existingAppointment) {
            return res.status(409).json({ error: 'This time slot is already booked' });
        }

        // Create appointment
        const appointment = await Appointment.create({
            user_id,
            doctor_id,
            appointment_date: new Date(appointment_date),
            appointment_time,
            consultation_type: consultation_type || 'in-person',
            symptoms: symptoms || '',
            notes: notes || '',
            total_amount: doctor.consultation_fee,
            payment_status: 'pending'
        });

        res.status(201).json(appointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: `Database error: ${error.message}` });
    }
});

// Get user appointments (PROTECTED)
app.get('/api/users/:userId/appointments', authenticateToken, async (req, res) => {
    try {
        const appointments = await Appointment.find({ user_id: req.params.userId })
            .populate('doctor_id', 'name specialization hospital_name consultation_fee')
            .sort({ appointment_date: -1 });

        // Transform to match expected format
        const formattedAppointments = appointments.map(apt => ({
            ...apt.toObject(),
            doctor_name: apt.doctor_id?.name,
            specialization: apt.doctor_id?.specialization,
            hospital_name: apt.doctor_id?.hospital_name,
            consultation_fee: apt.doctor_id?.consultation_fee
        }));

        res.json(formattedAppointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

// Update appointment (PROTECTED)
app.patch('/api/appointments/:id', authenticateToken, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Security: Only the user who created the appointment can update it
        if (String(appointment.user_id) !== String(req.user.id)) {
            return res.status(403).json({ error: 'Not authorized to update this appointment' });
        }

        Object.assign(appointment, req.body);
        await appointment.save();

        res.json({ message: 'Appointment updated successfully', appointment });
    } catch (error) {
        console.error('Error updating appointment:', error);
        res.status(500).json({ error: 'Failed to update appointment' });
    }
});

// Cancel appointment (PROTECTED)
app.delete('/api/appointments/:id', authenticateToken, async (req, res) => {
    try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found' });
        }

        // Security: Only the user who created the appointment can cancel it
        if (String(appointment.user_id) !== String(req.user.id)) {
            return res.status(403).json({ error: 'Not authorized to cancel this appointment' });
        }

        appointment.appointment_status = 'cancelled';
        await appointment.save();

        res.json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).json({ error: 'Failed to cancel appointment' });
    }
});

// Add doctor review (PROTECTED)
app.post('/api/doctors/:id/reviews', authenticateToken, async (req, res) => {
    try {
        const { rating, review_text, appointment_id } = req.body;

        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Invalid rating' });
        }

        const review = await DoctorReview.create({
            user_id: req.user.id,
            doctor_id: req.params.id,
            appointment_id,
            rating,
            review_text: review_text || ''
        });

        // Update doctor's average rating
        const reviews = await DoctorReview.find({ doctor_id: req.params.id });
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        await Doctor.findByIdAndUpdate(req.params.id, {
            rating: avgRating.toFixed(1),
            total_reviews: reviews.length
        });

        res.status(201).json(review);
    } catch (error) {
        console.error('Error adding review:', error);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

// User Management

// Get all users (PROTECTED - Admin only in production)
app.get('/api/users', authenticateToken, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Create user (Sign up)
app.post('/api/users', async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User with this email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            phone: phone || ''
        });

        res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

// Login
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check password
        const match = await bcrypt.compare(password, user.password);

        // Fallback for plain text passwords (auto-migrate)
        if (!match) {
            if (user.password === password) {
                // Auto-hash plain text password
                const newHash = await bcrypt.hash(password, 10);
                user.password = newHash;
                await user.save();
            } else {
                return res.status(401).json({ error: 'Invalid credentials' });
            }
        }

        // Generate JWT
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role || 'user'
            },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role || 'user'
            }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Lab Tests

// Book lab test (PROTECTED)
app.post('/api/lab-tests', authenticateToken, async (req, res) => {
    try {
        const data = { ...req.body };
        if (data.userId && !data.user_id) data.user_id = data.userId;

        const labTest = await LabTest.create(data);
        res.status(201).json(labTest);
    } catch (error) {
        console.error('Error creating lab test:', error);
        res.status(500).json({ error: `Failed to create lab test: ${error.message}` });
    }
});

// Get user lab tests (PROTECTED)
app.get('/api/users/:userId/lab-tests', authenticateToken, async (req, res) => {
    try {
        const labTests = await LabTest.find({ user_id: req.params.userId })
            .sort({ test_date: -1 });
        res.json(labTests);
    } catch (error) {
        console.error('Error fetching lab tests:', error);
        res.status(500).json({ error: 'Failed to fetch lab tests' });
    }
});

// Orders

// Get orders (PROTECTED)
app.get('/api/orders', authenticateToken, async (req, res) => {
    try {
        const { userId } = req.query;
        const orders = await Order.find({ user_id: userId }).sort({ created_at: -1 });
        res.json(orders);
    } catch (error) {
        console.error('Error fetching orders:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Create order (PROTECTED)
app.post('/api/orders', authenticateToken, async (req, res) => {
    try {
        const data = { ...req.body };
        // Normalize user_id
        if (data.userId && !data.user_id) data.user_id = data.userId;

        // Normalize total_amount
        if (data.total && !data.total_amount) data.total_amount = data.total;

        // Map orderType to order_type
        if (data.orderType && !data.order_type) data.order_type = data.orderType;

        // Normalize items for Mongoose schema (name -> product_name)
        if (data.items && Array.isArray(data.items)) {
            data.items = data.items.map(item => ({
                ...item,
                product_name: item.product_name || item.name,
                item_id: item.id || item.item_id
            }));
        }

        const order = await Order.create(data);
        res.status(201).json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ error: `Failed to create order: ${error.message}` });
    }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../build', 'index.html'));
    });
}

// Export for Vercel
module.exports = app;

// Start server (only in non-serverless environments)
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => {
        console.log(`[Server] Running on http://localhost:${PORT}`);
        console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`);
    });
}
