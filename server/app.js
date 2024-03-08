const express = require("express");
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser');
const weatherRoutes = require('./weather/weather-routes');


app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));

app.use('/weather', weatherRoutes);

module.exports = app;