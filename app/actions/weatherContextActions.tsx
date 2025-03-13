import { fetchWeatherData, fetchWeatherByCoordinates } from '../services/apiService';
import { saveLastSearchedCity, loadLastSearchedCity } from '../services/preferenceService';

export const fetchWeather = async (dispatch: Function, city: string) => {
    dispatch({ type: "FETCH_WEATHER_START" });
    try {
        const data = await fetchWeatherData(city);
        dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: data });
        await saveLastSearchedCity(city);
    } catch (error: any) {
        dispatch({ type: "FETCH_WEATHER_FAILURE", payload: error.message });
    }
};

export const fetchWeatherByLatLong = async (dispatch: Function, lat: number, lon: number) => {
    dispatch({ type: "FETCH_WEATHER_START" });
    try {
        const data = await fetchWeatherByCoordinates(lat, lon);
        dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: data });
        await saveLastSearchedCity(data.name);
    } catch (error: any) {
        dispatch({ type: "FETCH_WEATHER_FAILURE", payload: error.message });
    }
};

export const loadSavedWeather = async (dispatch: Function) => {
    dispatch({ type: "FETCH_WEATHER_START" });
    try {
        const city = await loadLastSearchedCity();
        if (city) {
            const data = await fetchWeatherData(city);
            dispatch({ type: "FETCH_WEATHER_SUCCESS", payload: data });
        }else{
            dispatch({ type: "FETCH_WEATHER_FAILURE", payload: null });
        }
    } catch (error: any) {
        dispatch({ type: "FETCH_WEATHER_FAILURE", payload: error.message });
    }
};