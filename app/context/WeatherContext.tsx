import { createContext, useContext } from 'react';

interface WeatherContextProps {
  weaterInfo: any;
  loading: boolean;
  error: string | null;
  fetchWeather: (city: string) => void;
  fetchWeatherByLatLong: (lat: number, lon: number) => void;
}

export const WeatherContext = createContext<WeatherContextProps>({
  weaterInfo: null,
  loading: false,
  error: null,
  fetchWeather: () => {},
  fetchWeatherByLatLong: () => {}
});

export const useWeather = () => useContext(WeatherContext);