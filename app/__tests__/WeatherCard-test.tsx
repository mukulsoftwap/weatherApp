import React from 'react';
import { render } from '@testing-library/react-native';
import WeatherCard from '../components/WeatherCard';

jest.mock('@/app/components/ThemedText', () => {
  return {
    ThemedText: ({ children }: { children: React.ReactNode }) => {
      const { Text } = require('react-native');
      return <Text>{children}</Text>;
    },
  };
});

jest.mock('@/app/components/ThemedView', () => {
  return {
    ThemedView: ({ children }: { children: React.ReactNode }) => {
      const { View } = require('react-native');
      return <View>{children}</View>;
    },
  };
});

jest.mock('../hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(() => '#ffffff'),
}));

describe('WeatherCard Component', () => {
  const mockWeather = {
    name: 'New York',
    temp: 20,
    condition: 'Sunny',
    icon: 'https://openweathermap.org/img/wn/01d@2x.png',
  };

  it('renders weather details correctly', () => {
    const { getByText, getByLabelText } = render(<WeatherCard weather={mockWeather} />);

    expect(getByText('New York')).toBeTruthy();

    expect(getByText('Sunny')).toBeTruthy();

    expect(getByText('20°C')).toBeTruthy();
    
    const image = getByLabelText('weather-icon');
    expect(image.props.source).toEqual({ uri: mockWeather.icon });
  });
});
