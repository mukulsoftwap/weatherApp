import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, TextInput, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useWeather } from '../providers/WeatherContextProvider';
import WeatherCard from '../components/WeatherCard';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { loadLastSearchedCity } from '../services/preferenceService';
import ThemeToggler from '../components/ThemeToggler';
import { useTheme } from '../providers/ThemeContextProvider';
import { useThemeColor } from '../hooks/useThemeColor';


const noSelect = require('../../assets/images/noSelect.png');

const HomeScreen: React.FC = () => {
    const { state, fetchWeather, fetchWeatherByLatLong } = useWeather();
    const [ city, setCity] = useState<string>('');
    const [ locationLoad, setLocationLoad ] = useState<boolean>(true);

    const { theme } = useTheme();

    const secondryBg = useThemeColor('secondryBg');

    const onSearchButtonClicked = ()=>{
        fetchWeather(city.trim());
    }

    useEffect( () => {
        initApp();
    }, []);

    const initApp = async ()=>{
        const searchedCity = await loadLastSearchedCity();
        if(searchedCity){
            setCity(searchedCity);
            setLocationLoad(false);
        }else{
            requestForLocation();
        }
    }

    const requestForLocation = async () => {
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Triggering Alert for Permission Denied'); //
            Alert.alert('Permission Denied', 'You can still search for weather');
            setLocationLoad(false);
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          await fetchWeatherByLatLong(location.coords.latitude, location.coords.longitude);
          setLocationLoad(false);
        } catch (error) {
            console.log('Triggering Alert for Location Error'); 
          setLocationLoad(false);
          Alert.alert('Error', 'Unable to get location But you can still search by City');
        }
    };

    return (
        <ThemedView style={[styles.container]}>
            <View style={[styles.buttonGroup, {borderColor: secondryBg}]}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter city"
                    placeholderTextColor={'#ddd'}
                    value={city}
                    onChangeText={setCity}
                />
                <TouchableOpacity onPress={onSearchButtonClicked} style={[styles.button, {backgroundColor:secondryBg}]}>
                    <ThemedText type='default'>Search</ThemedText>
                </TouchableOpacity>
            </View>
        
            {(state.loading || locationLoad)  ? (
                <ActivityIndicator size="large" color="#d38e31" style={styles.loader} />
            ) : (state.weatherInfo && !state.error) ? (
                <WeatherCard weather={state.weatherInfo} />
            ) : state.error ?  <ThemedText style={styles.error} type="default">{state.error}</ThemedText> : (
                <>
                    <Image source={noSelect} style={styles.noSelect} />
                    <ThemedText style={styles.error} type="subtitle">
                        Location is not ON but you can search by City.
                    </ThemedText>
                </>
            )}

            <ThemedView style={styles.themeContainer} borderAllow={true}>
                <ThemedText type="subtitle">Theme : {theme}</ThemedText>
                <ThemeToggler />
            </ThemedView>
            
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        paddingTop: 50, 
        paddingLeft:20, 
        paddingRight:20, 
        alignItems: 'center',
        justifyContent:'space-between'
    },
    loader:{
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        height:'95%'
    },
    input: {
        color: '#FFF',
        flex:1,
    },
    noSelect:{
        width: 200,
        height: 200,
        marginTop: 120
    },  
    buttonGroup:{
        flexDirection:'row',
        backgroundColor : '#00000065',
        borderRadius : 40,
        paddingLeft:20,
        borderColor: '#d38e31',
        borderWidth:1
    },
    button:{
        backgroundColor : '#d38e31',
        borderTopEndRadius : 20,
        borderBottomEndRadius : 20,
        paddingLeft: 20,
        paddingRight:20,
        paddingTop: 7
    },
    error: { 
        color: 'red', 
        marginTop: 10,
        textAlign: 'center'
    },
    themeContainer:{
        width:'100%',
        flexDirection: 'row',
        paddingLeft:20,
        paddingRight:30,
        paddingTop:10,
        paddingBottom:10,
        justifyContent:'space-between',
        borderRadius: 30,
        marginBottom:10
    }
});

export default HomeScreen;