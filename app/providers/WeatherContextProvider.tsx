import React, { useState } from 'react';
import { fetchWeatherByCoordinates, fetchWeatherData } from '../services/apiService';
import { WeatherContext } from '../context/WeatherContext';

export const WeatherContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [weaterInfo, setWeaterInfo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const fetchWeather = async (city: string) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherData(city);
        setWeaterInfo(data);
      } catch (err:any) {
        setError(err.message);
      }
      setLoading(false);
    };

    const fetchWeatherByLatLong = async (lat: number, lon: number) => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherByCoordinates(lat, lon);
        setWeaterInfo(data);
      } catch (err:any) {
        setError(err.message);
      }
      setLoading(false);
    };
  
    return (
      <WeatherContext.Provider value={{ weaterInfo, fetchWeather, fetchWeatherByLatLong, loading, error }}>
        {children}
      </WeatherContext.Provider>
    );
};