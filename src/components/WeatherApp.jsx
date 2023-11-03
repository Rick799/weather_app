
import { useState } from "react";
import "./WeatherStyle.css";
import WeatherSearch from "./WeatherSearch";
import WeatherInfo from "./WeatherInfo";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [unit, setUnit] = useState("metric");

  // Function to handle weather data from the API
  const handleWeatherData = (data) => {
    setWeatherData(data);
  };

  // Function to toggle between metric and imperial units
  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="h-screen overflow-y-scroll font-mono bg-[url(https://media.istockphoto.com/id/1299235090/vector/cartoon-mountain-landscape-in-flat-style-design-element-for-poster-card-banner-flyer-vector.jpg?s=170667a&w=0&k=20&c=m2BurOEhl2Kn_0wvgIL2UoEVMwGL95se83T3PcG4Eps=)] bg-cover">
      <header className="App-header">
        <h1 className="text-3xl text-white font-bold text-center pt-4 pb-8">
          Weather App
        </h1>
      </header>
      <WeatherSearch
        handleWeatherData={handleWeatherData}
        unit={unit}
        toggleUnit={toggleUnit}
      />
      <WeatherInfo
        weatherData={weatherData}
        unit={unit}
        toggleUnit={toggleUnit}
      />
    </div>
  );
};

export default WeatherApp;
