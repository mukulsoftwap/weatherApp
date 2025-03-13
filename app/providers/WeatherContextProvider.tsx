import React, { createContext, useReducer, useEffect, useContext } from 'react';
import { weatherReducer } from '../reducers/weatherContextReducer';
import { fetchWeather, fetchWeatherByLatLong, loadSavedWeather } from '../actions/weatherContextActions';

interface WeatherContextProps {
    state: any;
    fetchWeather: (city: string) => void;
    fetchWeatherByLatLong: (lat: number, lon: number) => void;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error("useWeather must be used within a WeatherProvider");
    }
    return context;
};

export const WeatherContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const initialState = { weatherInfo: null, loading: false, error: null };
    const [state, dispatch] = useReducer(weatherReducer, initialState);

    useEffect(() => {
        loadSavedWeather(dispatch);
    }, []);

    return (
        <WeatherContext.Provider value={{ 
          state, 
          fetchWeather: (city) => fetchWeather(dispatch, city), 
          fetchWeatherByLatLong: (lat, lon) => fetchWeatherByLatLong(dispatch, lat, lon)
        }}>
            {children}
        </WeatherContext.Provider>
    );
};