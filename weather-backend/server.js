const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/getWeather', async (req, res) => {
    try {
        const { cities } = req.body;
        const weatherData = {};

        for (const city of cities) {
            const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
            const temperature = weatherResponse.data.main.temp;
            weatherData[city] = `${temperature}C`;
        }

        res.json({ weather: weatherData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching weather data.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
