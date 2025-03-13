import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveLastSearchedCity(city: string) {
    await AsyncStorage.setItem('lastSearchedCity', city.trim());
}
  
export async function loadLastSearchedCity() {
    return await AsyncStorage.getItem('lastSearchedCity');
}

export async function saveTheme(theme:string) {
    await AsyncStorage.setItem('savedTheme', theme);
}

export async function getTheme() {
    return await AsyncStorage.getItem('savedTheme');
}
