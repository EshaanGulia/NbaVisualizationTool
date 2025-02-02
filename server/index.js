// Import the Express module
const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Create an Express application
const app = express();
app.use(cors());

// Define a port
const PORT = 3000;

// Set up a simple route
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Route to fetch all players
app.get('/allPlayers', async (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.balldontlie.io/v1/players?page=1&per_page=10',
        headers: { 
            'Authorization': '42045409-d194-4bab-b5bc-50cea9a824c1',
        },
    };

    try {
        const response = await axios.request(config);
        console.log('Players Response: ', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching players:', error.message);
        res.status(500).json({ error: 'Failed to fetch players.' });
    }
});

// Route to fetch all teams
app.get('/allTeams', async (req, res) => {
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://api.balldontlie.io/v1/teams',
        headers: { 
            'Authorization': '42045409-d194-4bab-b5bc-50cea9a824c1',
        },
    };

    try {
        const response = await axios.request(config);
        console.log('Teams Response: ', response.data);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error fetching teams:', error.message);
        res.status(500).json({ error: 'Failed to fetch teams.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});