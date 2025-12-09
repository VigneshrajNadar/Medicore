// Vercel Serverless Function for Doctors API
// Returns sample doctors directly (no database dependency for now)
const sampleDoctors = require('./sampleDoctors');

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        const { specialization, city, hospital, minRating, maxPrice, availableDay, search } = req.query;

        // Start with all doctors
        let filteredDoctors = [...sampleDoctors];

        // Apply filters
        if (specialization) {
            filteredDoctors = filteredDoctors.filter(d => d.specialization === specialization);
        }

        if (city) {
            filteredDoctors = filteredDoctors.filter(d => d.city === city);
        }

        if (hospital) {
            filteredDoctors = filteredDoctors.filter(d =>
                d.hospital_name.toLowerCase().includes(hospital.toLowerCase())
            );
        }

        if (minRating) {
            filteredDoctors = filteredDoctors.filter(d => d.rating >= parseFloat(minRating));
        }

        if (maxPrice) {
            filteredDoctors = filteredDoctors.filter(d => d.consultation_fee <= parseFloat(maxPrice));
        }

        if (availableDay) {
            filteredDoctors = filteredDoctors.filter(d =>
                d.available_days.toLowerCase().includes(availableDay.toLowerCase())
            );
        }

        if (search) {
            const searchLower = search.toLowerCase();
            filteredDoctors = filteredDoctors.filter(d =>
                d.name.toLowerCase().includes(searchLower) ||
                d.specialization.toLowerCase().includes(searchLower) ||
                d.hospital_name.toLowerCase().includes(searchLower)
            );
        }

        // Add IDs to doctors
        const doctorsWithIds = filteredDoctors.map((doctor, index) => ({
            id: index + 1,
            ...doctor
        }));

        console.log(`Returning ${doctorsWithIds.length} doctors`);
        res.status(200).json(doctorsWithIds);
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
