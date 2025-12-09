// Vercel Serverless Function for Hospitals
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
            // Get unique hospitals
            const hospitals = [...new Set(DOCTORS_DATA.map(d => d.hospital_name))].sort();
            res.status(200).json(hospitals);
        } catch (error) {
            console.error('Error in hospitals API:', error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
