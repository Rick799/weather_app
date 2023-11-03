/* eslint react/prop-types: 0 */

import { FaTemperatureHigh } from "react-icons/fa";
import { WiHumidity, WiStrongWind } from "react-icons/wi";

const WeatherInfo = ({ weatherData, unit, toggleUnit }) => {
  const api = {
    icons: "https://openweathermap.org/img/wn/",
  };

  // Function to generate the URL for weather icons
  const getWeatherIconUrl = (iconCode) => `${api.icons}${iconCode}@2x.png`;

  // Function to format time for the city based on timezone offset
  const formatTimeForCity = (timezoneOffset) => {
    const currentTime = new Date();
    const cityTime = new Date(currentTime.getTime() + timezoneOffset * 1000);
    const options = {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "UTC", // Use UTC to display the time correctly
    };
    return cityTime.toLocaleString("en-US", options);
  };

  // Function to convert temperature based on the selected unit (metric or imperial)
  const convertTemperature = (temp) => {
    if (unit === "metric") {
      return Math.round(temp);
    } else {
      return Math.round((temp * 9) / 5 + 32);
    }
  };

  return (
    <div className="">
      {weatherData && (
        <div className="">
          <div className="circle-size  my-12 outline-offset-8 outline-dotted border-8 border-black hover:border-white hover:transform rounded-full p-5 mx-auto relative flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="absolute top-5">
                <p className="text-xl text-center font-bold">
                  {weatherData.name}, {weatherData.sys.country}
                </p>
                <p className="text-md text-center">
                  {formatTimeForCity(weatherData.timezone)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="absolute -left-4">
                <img
                  className="w-40 h-40"
                  src={getWeatherIconUrl(weatherData.weather[0].icon)}
                  alt={weatherData.weather[0].description}
                />
              </div>
              <div className="absolute left-44 hover:scale-105 cursor-pointer">
                <p className="text-9xl font-bold flex justify-start">
                  {convertTemperature(weatherData.main.temp)}
                  <span className="text-xl">
                    {unit === "metric" ? "°C" : "°F"}
                  </span>
                </p>
              </div>
              <div className="absolute right-5 flex flex-col justify-center items-center">
                <p className="text-2xl ">{weatherData.weather[0].main}</p>
                <p className="text-xs text-center w-28">
                  [{weatherData.weather[0].description}]
                </p>
              </div>
            </div>
            <div className="absolute bottom-5 flex justify-center  text-black">
              <button
                className={`${
                  unit === "metric" ? "bg-indigo-900 text-white" : "bg-white"
                } rounded-l-md px-2 py-1`}
                onClick={toggleUnit}
              >
                °C
              </button>
              <button
                className={`${
                  unit === "imperial" ? "bg-indigo-900 text-white" : "bg-white"
                } rounded-r-md px-2 py-1`}
                onClick={toggleUnit}
              >
                °F
              </button>
            </div>
          </div>
          <div className="border w-7/12 mx-auto mb-6"></div>
          <div className="flex justify-evenly text-xl text-white pt-2 ">
            <div className="h-40 flex flex-col items-center justify-evenly">
              <p>
                <WiHumidity className="w-10 h-10" />
              </p>
              <p className="text-xl font-bold cursor-pointer hover:scale-110 py-5">
                {weatherData.main.humidity}%
              </p>
              <p className="">Humidity</p>
            </div>
            <div className="flex flex-col items-center justify-evenly">
              <p>
                <FaTemperatureHigh className="w-7 h-7" />
              </p>
              <p className="text-xl font-bold cursor-pointer hover:scale-110 py-5">
                {convertTemperature(weatherData.main.feels_like)}°
                {unit === "metric" ? "C" : "F"}
              </p>
              <p className="">Real Feel</p>
            </div>
            <div className="flex flex-col items-center justify-evenly">
              <p>
                <WiStrongWind className="w-10 h-10" />
              </p>
              <p className="text-xl font-bold cursor-pointer hover:scale-110 py-5">
                {weatherData.wind.speed} km/hr
              </p>
              <p className="">Wind</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherInfo;
