import React, { useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [isloading, setIsLoading] = useState(false);

  const fetchWeatherData = async () => {
    try {
      setIsLoading(true);
      const api_key = "783bd44922b94b0dbbc40512242910";
      const response = await axios.get(
        ` https://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (error) {
      alert("Failed to fetch weather data");
    } finally {
      setIsLoading(false);
    }
  };

  const handlerSearch = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData();
    }
  };
  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          placeholder="Enter city name"
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="search" onClick={handlerSearch}>
          Search
        </button>
      </div>
      {isloading ? (
        <p className="loading">Loading data...</p>
      ) : (
        <div className="weather-cards">
          {weatherData && (
            <>
              <div className="weather-card">
                <h2>Temperature</h2>
                <p>{weatherData.current.temp_c}</p>
              </div>
              <div className="weather-card">
                <h2>Humidity</h2>
                <p>{weatherData.current.humidity}%</p>
              </div>
              <div className="weather-card">
                <h2>Condition</h2>
                <p>{weatherData.current.condition.text}</p>
              </div>
              <div className="weather-card">
                <h2>Wind Speed</h2>
                <p>{weatherData.current.wind_kph} kph</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
