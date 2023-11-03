/* eslint react/prop-types: 0 */

import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

const WeatherSearch = ({ handleWeatherData, unit}) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Define the API key and base URL for OpenWeatherMap API
  const api = {
    key: "90f5434310ab89c24f6dd2d264939631",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  // Function to fetch weather data based on the city/town query
  const fetchWeatherData = async (query) => {
    try {
      const response = await fetch(
        `${api.base}weather?q=${query}&units=${unit}&APPID=${api.key}`
      );
      if (response.ok) {
        const result = await response.json();
        handleWeatherData(result);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Function to handle key press events
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchWeatherData(search);
      setSuggestions([]); // Clear suggestions
    }
  };

  // Function to fetch city suggestions based on user input
  const getCitySuggestions = async (query) => {
    try {
      const response = await fetch(
        `${api.base}find?q=${query}&type=like&sort=population&cnt=10&appid=${api.key}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.list) {
          const citySuggestions = data.list.map(({ name, sys }) => ({
            name,
            country: sys.country,
          }));
          setSuggestions(citySuggestions);
        }
      }
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  // Function to handle input change
  const onInputChange = (event) => {
    const { value } = event.target;
    setSearch(value);
    getCitySuggestions(value);
  };

  // Function to handle suggestion selection
  const onSuggestionClick = (suggestion) => {
    setSearch(`${suggestion.name}, ${suggestion.country}`);
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="text-center pb-5">
      <input
        type="text"
        placeholder="Enter city/town..."
        onKeyDown={handleKeyPress}
        onChange={onInputChange}
        value={search}
        className="bg-transparent text-white w-2/6 focus:outline-none border-b-2 border-white mx-auto"
      />
      <button
        className="border-2 border-white rounded-md mx-3 p-1"
        onClick={() => fetchWeatherData(search)}
      >
        <AiOutlineSearch className="w-6 h-6 hover:scale-110 text-white" />
      </button>
      {suggestions.length > 0 && (
        <ul className="cursor-pointer">
          {suggestions.map((suggestion) => (
            <li
              key={`${suggestion.name}-${suggestion.country}`}
              onClick={() => onSuggestionClick(suggestion)}
              className="hover:scale-105"
            >
              {suggestion.name}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WeatherSearch;
