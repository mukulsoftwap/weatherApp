import { useState } from 'react';
import { Switch, StyleSheet } from 'react-native';
import { Colors, THEME_DARK, THEME_LIGHT } from '../config/Constants';
import { useTheme } from '../providers/ThemeContextProvider';

function ThemeToggler(){

    const { theme, toggleTheme } = useTheme();

    const getThumbColor = ()=>{
        return Colors[theme].secondryBg;
    }

    const getTrackColor = ()=>{
        return {false: Colors['dark'].color , true: Colors['light'].color}
    }

    return(
        <Switch
            testID="theme-switch"
            style={styles.switch}
            trackColor={getTrackColor()}
            thumbColor={getThumbColor()}
            ios_backgroundColor="#3e3e3e"
            onValueChange={()=>toggleTheme()}
            value={theme==THEME_DARK}
        />
    )
}

export default ThemeToggler;

const styles = StyleSheet.create({
    switch: {
        margin:-10
    }
});