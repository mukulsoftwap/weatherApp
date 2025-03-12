import { API_KEY, BASE_URL } from "../config/Constants";
import { fetchIcon } from "./iconService";

export async function fetchWeatherData(city:string) {
  const url = `${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`;
  return await fetchDataFromApi(url);
}

export async function fetchWeatherByCoordinates(lat: number, lon: number) {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  return await fetchDataFromApi(url);
}

async function fetchDataFromApi(url:string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log(response);
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