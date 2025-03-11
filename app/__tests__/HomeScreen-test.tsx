import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { useWeather } from '../context/WeatherContext';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

jest.mock('../context/WeatherContext', () => ({
  useWeather: jest.fn(),
}));

jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

describe('HomeScreen Component', () => {
  beforeEach(() => {
    (useWeather as jest.Mock).mockReturnValue({
      weaterInfo: null,
      loading: false,
      error: null,
      fetchWeather: jest.fn(),
      fetchWeatherByLatLong: jest.fn(),
    });
  });

  it('renders search input and button', () => {
    const { getByPlaceholderText, getByText } = render(<HomeScreen />);
    expect(getByPlaceholderText('Enter city')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
  });

  it('updates text input value when user types', () => {
    const { getByPlaceholderText } = render(<HomeScreen />);
    const input = getByPlaceholderText('Enter city');
    fireEvent.changeText(input, 'New York');
    expect(input.props.value).toBe('New York');
  });

  it('fetches weather when search button is clicked', () => {
    const mockFetchWeather = jest.fn();
    (useWeather as jest.Mock).mockReturnValue({
      fetchWeather: mockFetchWeather,
      fetchWeatherByLatLong: jest.fn(),
      weaterInfo: null,
      loading: false,
      error: null,
    });

    const { getByText, getByPlaceholderText } = render(<HomeScreen />);
    fireEvent.changeText(getByPlaceholderText('Enter city'), 'London');
    fireEvent.press(getByText('Search'));

    expect(mockFetchWeather).toHaveBeenCalledWith('London');
  });

  it('requests location permissions and fetches weather if granted', async () => {
    const mockFetchWeatherByLatLong = jest.fn();
    (useWeather as jest.Mock).mockReturnValue({
      fetchWeather: jest.fn(),
      fetchWeatherByLatLong: mockFetchWeatherByLatLong,
      weaterInfo: null,
      loading: false,
      error: null,
    });
  
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });
  
    (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
      coords: { latitude: 40.7128, longitude: -74.0060 },
    });
  
    const { findByPlaceholderText } = render(<HomeScreen />);
  
    await findByPlaceholderText('Enter city');
  
    await waitFor(() => {
      expect(mockFetchWeatherByLatLong).toHaveBeenCalledWith(40.7128, -74.0060);
    });
  
    await act(async () => {});
  });
  

  it('shows an alert if location permission is denied', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'denied',
    });
  
    const { findByPlaceholderText } = render(<HomeScreen />);
  
    await findByPlaceholderText('Enter city');
  
    await act(async () => {
      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith('Permission Denied', 'You can still search for weather');
      });
    });
  
    await act(async () => {});
  });

  it('shows an alert if getting location fails', async () => {
    (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
      status: 'granted',
    });
  
    (Location.getCurrentPositionAsync as jest.Mock).mockRejectedValue(new Error('Location error'));
  
    const { findByPlaceholderText } = render(<HomeScreen />);
  
    const inputField = await findByPlaceholderText('Enter city');
    expect(inputField).toBeTruthy();
  
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith('Error', 'Unable to get location But you can still search by City');
    });
  });
});
