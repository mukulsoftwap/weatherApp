import { API_KEY, BASE_URL } from "../config/Constants";
import { fetchIcon } from "./iconService";

export async function fetchWeatherData(city:string) {
  try {
    const response = await fetch(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();
    const { name, main, weather } = data;
    return {
      name,
      temp: main.temp,
      condition: weather[0].main,
      icon: fetchIcon(weather[0].main, weather[0].icon),
    };
  } catch (error:any) {
    throw new Error(error.message);
  }
}

export async function fetchWeatherByCoordinates(lat: number, lon: number) {
  try {
    const response = await fetch(`${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
    if (!response.ok) {
      throw new Error('Unable to fetch weather for location');
    }
    const data = await response.json();
    return {
      name: data.name,
      temp: data.main.temp,
      condition: data.weather[0].main,
      icon: fetchIcon(data.weather[0].main, data.weather[0].icon),
    };
  } catch (error:any) {
    throw new Error(error.message);
  }
}