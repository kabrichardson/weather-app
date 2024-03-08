const express = require('express');
const axios = require('axios');

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  router.post('/', async(req, res, next) => {
    const { city, state, country} = req.body;
    const apiKey = "d840fbeab237f986413c4ce5ecf0c0a7";

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${state},${country}&appid=${apiKey}&units=imperial`);
        const weatherData = response.data;
        res.json(weatherData)
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching weather data');
    }
  });

module.exports =  router;