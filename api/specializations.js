// Vercel Serverless Function for Specializations
const DOCTORS_DATA = require('./doctors_data.json');

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'GET') {
        try {
            // Get unique specializations
            const specializations = [...new Set(DOCTORS_DATA.map(d => d.specialization))].sort();
            res.status(200).json(specializations);
        } catch (error) {
            console.error('Error in specializations API:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
