import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { useWeather } from '../providers/WeatherContextProvider';
import { useTheme } from '../providers/ThemeContextProvider';
import * as Location from 'expo-location';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('../providers/WeatherContextProvider', () => ({
  useWeather: jest.fn(),
}));

jest.mock('../providers/ThemeContextProvider', () => ({
  useTheme: jest.fn(),
}));

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(() => Promise.resolve(null)),
  setItem: jest.fn(() => Promise.resolve()),
}));

jest.spyOn(Alert, 'alert');

describe('HomeScreen Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useWeather as jest.Mock).mockReturnValue({
      state: { weatherInfo: null, loading: false, error: null },
      fetchWeather: jest.fn(),
      fetchWeatherByLatLong: jest.fn(),
    });

    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    (AsyncStorage.getItem as jest.Mock).mockImplementation(async (key) => {
      if (key === 'lastSearchedCity') return 'New York';
      return null;
    });
  });

  it('renders the search input and button', async () => {
    const { getByPlaceholderText, getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByPlaceholderText('Enter city')).toBeTruthy();
      expect(getByText('Search')).toBeTruthy();
    });
  });

  it('updates the text input when user types', async () => {
    const { getByPlaceholderText } = render(<HomeScreen />);
    const input = getByPlaceholderText('Enter city');

    act(() => {
      fireEvent.changeText(input, 'New York');
    });

    await waitFor(() => {
      expect(input.props.value).toBe('New York');
    });
  });

  it('fetches weather when search button is clicked', async () => {
    const mockFetchWeather = jest.fn();
    (useWeather as jest.Mock).mockReturnValue({
        state: { weatherInfo: null, loading: false, error: null },
        fetchWeather: mockFetchWeather,
        fetchWeatherByLatLong: jest.fn(),
    });

    const { getByText, getByPlaceholderText } = render(<HomeScreen />);
    const input = getByPlaceholderText('Enter city');
    const searchButton = getByText('Search');

    act(() => {
        fireEvent.changeText(input, 'London');
    });

    await waitFor(() => {
        expect(input.props.value).toBe('London');
    });

    act(() => {
        fireEvent.press(searchButton);
    });

    await waitFor(() => {
        expect(mockFetchWeather).toHaveBeenCalledWith('London');
    });
  });

  it('loads last searched city from AsyncStorage', async () => {
    const { findByDisplayValue } = render(<HomeScreen />);
    expect(await findByDisplayValue('New York')).toBeTruthy();
  });

  it('renders the weather card if weather info is available', async () => {
    (useWeather as jest.Mock).mockReturnValue({
      state: {
        weatherInfo: {
          name: 'New York',
          temp: 25,
          condition: 'Sunny',
          icon: 'https://openweathermap.org/img/wn/01d.png',
        },
        loading: false,
        error: null,
      },
      fetchWeather: jest.fn(),
      fetchWeatherByLatLong: jest.fn(),
    });

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('New York')).toBeTruthy();
      expect(getByText('25°C')).toBeTruthy();
      expect(getByText('Sunny')).toBeTruthy();
    });
  });

  it('displays an error message if there is an error', async () => {
    (useWeather as jest.Mock).mockReturnValue({
      state: { weatherInfo: null, loading: false, error: 'City not found' },
      fetchWeather: jest.fn(),
      fetchWeatherByLatLong: jest.fn(),
    });

    const { getByText } = render(<HomeScreen />);

    await waitFor(() => {
      expect(getByText('City not found')).toBeTruthy();
    });
  });

  it('toggles theme when ThemeToggler is pressed', async () => {
    const mockToggleTheme = jest.fn();
    (useTheme as jest.Mock).mockReturnValue({
        theme: 'light',
        toggleTheme: mockToggleTheme,
    });

    const { getByTestId } = render(<HomeScreen />);
    
    fireEvent(getByTestId('theme-switch'), 'valueChange');

    await waitFor(() => {
        expect(mockToggleTheme).toHaveBeenCalledTimes(1);
    });
  });
});
