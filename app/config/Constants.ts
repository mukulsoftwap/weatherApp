/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors:any = {
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    secondryBg: '#187fd7',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    secondryBg: '#d38e31',
    tabIconSelected: tintColorDark,
  },
};

export const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
export const API_KEY = 'e5d645d9ffedbe2b4d6140edbac20fde';
export const THEME_LIGHT = "light";
export const THEME_DARK = "dark"