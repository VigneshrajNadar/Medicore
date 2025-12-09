import json
import random

specializations = ['Cardiology', 'Dermatology', 'Pediatrics', 'Gynecology', 'Orthopedics', 'General Medicine', 
                  'Neurology', 'Ophthalmology', 'ENT', 'Psychiatry', 'Dentistry', 'Urology', 'Gastroenterology', 
                  'Pulmonology', 'Endocrinology', 'Oncology', 'Nephrology', 'Rheumatology', 'Anesthesiology', 'Radiology']

cities = [
    {'city': 'Mumbai', 'state': 'Maharashtra'}, {'city': 'Delhi', 'state': 'Delhi'},
    {'city': 'Bangalore', 'state': 'Karnataka'}, {'city': 'Hyderabad', 'state': 'Telangana'},
    {'city': 'Chennai', 'state': 'Tamil Nadu'}, {'city': 'Kolkata', 'state': 'West Bengal'},
    {'city': 'Pune', 'state': 'Maharashtra'}, {'city': 'Ahmedabad', 'state': 'Gujarat'},
    {'city': 'Jaipur', 'state': 'Rajasthan'}, {'city': 'Lucknow', 'state': 'Uttar Pradesh'},
    {'city': 'Gurgaon', 'state': 'Haryana'}, {'city': 'Chandigarh', 'state': 'Chandigarh'},
    {'city': 'Kochi', 'state': 'Kerala'}, {'city': 'Indore', 'state': 'Madhya Pradesh'},
    {'city': 'Nagpur', 'state': 'Maharashtra'}
]

hospitals = ['Apollo Hospitals', 'Fortis Healthcare', 'Max Healthcare', 'Manipal Hospitals', 'KIMS Hospitals',
            'Narayana Health', 'Medanta', 'Artemis Hospital', 'BLK Hospital', 'Saket City Hospital',
            'Kokilaben Hospital', 'Lilavati Hospital', 'Jaslok Hospital', 'Breach Candy Hospital', 'Hinduja Hospital']

first_names = ['Dr. Rajesh', 'Dr. Priya', 'Dr. Amit', 'Dr. Sunita', 'Dr. Vikram', 'Dr. Neha', 'Dr. Sanjay',
              'Dr. Anjali', 'Dr. Rohan', 'Dr. Kavya', 'Dr. Arjun', 'Dr. Meera', 'Dr. Karan', 'Dr. Divya',
              'Dr. Rahul', 'Dr. Pooja', 'Dr. Aditya', 'Dr. Shreya', 'Dr. Varun', 'Dr. Nisha']

last_names = ['Sharma', 'Patel', 'Kumar', 'Verma', 'Singh', 'Gupta', 'Malhotra', 'Reddy', 'Kapoor', 'Iyer',
             'Mehta', 'Desai', 'Joshi', 'Nair', 'Rao', 'Chopra', 'Bhat', 'Menon', 'Pillai', 'Shah']

doctors = []

for i in range(1, 501):
    spec = specializations[i % len(specializations)]
    city_data = cities[i % len(cities)]
    hospital = hospitals[i % len(hospitals)]
    first_name = first_names[i % len(first_names)]
    last_name = random.choice(last_names)
    exp = 5 + random.randint(0, 25)
    
    if spec in ['Cardiology', 'Neurology', 'Oncology']:
        fee = 1500 + random.randint(0, 1000)
    else:
        fee = 500 + random.randint(0, 800)
    
    rating = round(4.0 + random.random(), 1)
    
    doctor = {
        'id': i,
        'name': f'{first_name} {last_name}',
        'specialization': spec,
        'qualification': 'MBBS, MD',
        'experience': exp,
        'consultation_fee': fee,
        'rating': rating,
        'total_reviews': 50 + random.randint(0, 450),
        'hospital_name': hospital,
        'hospital_address': f'{i}, Street {(i%20)+1}, {city_data["city"]}, {city_data["state"]}',
        'city': city_data['city'],
        'state': city_data['state'],
        'available_days': 'Monday, Tuesday, Wednesday, Thursday, Friday' if i % 2 == 0 else 'Monday, Wednesday, Friday, Saturday',
        'available_time_slots': '09:00-17:00' if i % 3 == 0 else '10:00-18:00',
        'profile_image': f'https://randomuser.me/api/portraits/{"men" if i % 2 == 0 else "women"}/{(i%70)+1}.jpg',
        'is_active': 1
    }
    doctors.append(doctor)

with open('doctors_data.json', 'w') as f:
    json.dump(doctors, f, indent=2)

print(f'Generated {len(doctors)} doctors successfully!')
