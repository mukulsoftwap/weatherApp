import { ThemedText } from '@/app/components/ThemedText';
import { ThemedView } from '@/app/components/ThemedView';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useThemeColor } from '../hooks/useThemeColor';

interface WeatherProps {
  weather: {
    name: string;
    temp: number;
    condition: string;
    icon: string;
  };
}

const WeatherCard: React.FC<WeatherProps> = ({ weather }) => {
  
  const secondryBg = useThemeColor('secondryBg');

  const getImgSource = (source:any)=>{
    return typeof source == 'string'  ? {uri : source} : source;
  }

  return (
    <ThemedView style={styles.card} borderAllow={true}>
      <ThemedView style={[styles.header, {backgroundColor: secondryBg}]}>
        <ThemedText type='subtitle'>{weather.name}</ThemedText>
      </ThemedView>
      <Image source={getImgSource(weather.icon)} style={styles.icon} accessibilityLabel="weather-icon" />
      <ThemedText>{weather.condition}</ThemedText>
      <ThemedText type='title' style={styles.temp}>{weather.temp}°C</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  card: {
    width:'100%',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    overflow:'hidden',
    paddingBottom:30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 10
  },
  header:{
    backgroundColor: '#d38e31',
    padding:10,
    width:'100%',
    alignItems:'center'
  },
  temp: { fontSize: 25 },
  condition: { fontSize: 18},
  icon: { 
    width: 180, 
    height: 180, 
    marginTop: 10,
    marginBottom: 10
  },
});

export default WeatherCard;