import React, { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { View, TextInput, ActivityIndicator, StyleSheet, TouchableOpacity, Alert, Image} from 'react-native';
import { useWeather } from '../context/WeatherContext';
import WeatherCard from '../components/WeatherCard';
import { ThemedText } from '../components/ThemedText';
import { ThemedView } from '../components/ThemedView';
import { useThemeColor } from '../hooks/useThemeColor';

const noSelect = require('../../assets/images/noSelect.png');

const HomeScreen: React.FC = () => {
    const { fetchWeather, fetchWeatherByLatLong, weaterInfo, loading, error } = useWeather();
    const [city, setCity] = useState<string>('');
    const [loader, setLoader] = useState<boolean>(true);
    const secondryBg = useThemeColor({ light: undefined, dark: undefined }, 'secondryBg');

    const onSearchButtonClicked = ()=>{
        fetchWeather(city.trim())
    }

    useEffect(() => {
        requestForLocation();
    }, []);

    const requestForLocation = async () => {
        setLoader(true);
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permission Denied', 'You can still search for weather');
            setLoader(true);
            return;
          }
          let location = await Location.getCurrentPositionAsync({});
          fetchWeatherByLatLong(location.coords.latitude, location.coords.longitude);
          setLoader(false);
        } catch (error) {
          setLoader(false);
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
        
            
            {loader || loading?
                <ActivityIndicator size="large" color="#d38e31" style={styles.loader}/> :
                <>
                    {error && <ThemedText style={styles.error}>{error}</ThemedText>}
                    {weaterInfo && !error && <WeatherCard weather={weaterInfo} />}
                    {!weaterInfo && !error &&
                        <>
                            <Image source={noSelect} style={styles.noSelect}/>
                            <ThemedText style={styles.error} type='subtitle'>Location is not ON but you can search by City.</ThemedText>
                        </>
                    }
                </>
            }
            
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
});

export default HomeScreen;