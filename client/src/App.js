import React, { useState } from "react";
import axios from 'axios';
import './Location.css';

function Location() {

    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [locationError, setLocationError] = useState('');

    const handleCityChange = (event) => {
        setCity(event.target.value);
    };

    const handleStateChange = (event) => {
        setState(event.target.value);
    };

    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (city || state || country) {
        try {
            const response = await axios.post("http://localhost:5000/weather", {
                "city" : city,
                "state" : state,
                "country" : country
            });
        
            setWeatherData(response.data);
            setLocationError('');
        } catch (error) {
            console.error('Error fetching weather data: client side', error);
        }
    } else {
        setLocationError('Please enter a city, state, and/or country');
    }
        
    }

    return (
        <div className="location-container">
            <h1>Please enter your location for Weather Updates</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>City: 
                <input type="text" id="city" value={city} onChange={handleCityChange} />
                </label>
            </div>
            <div className="form-group">
                <label>State: 
                <input type="text" id="state" value={state} onChange={handleStateChange} />
                </label>
            </div>
            <div className="form-group">
                <label>Country: 
                <input type="text" id="country" value={country} onChange={handleCountryChange} />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
        {locationError && <p className="error-message">{locationError}</p>}{}
        {weatherData && (
            <div className="weather-info">
                <h2>Weather Information</h2>
                <p>City: {weatherData.name}</p>
                <p>Temperature: {weatherData.main.temp} degrees Fahrenheit</p>
                <p>Feels Like: {weatherData.main.feels_like} degrees Fahrenheit</p>
                <p>Min Temperature: {weatherData.main.temp_min} degrees Fahrenheit</p>
                <p>Max Temperature: {weatherData.main.temp_max} degrees Fahrenheit</p>
                <p>Description: {weatherData.weather[0].description}</p>
            </div>
        )}
        </div>
    )
}

export default Location;
