/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '../config/Constants';
import { useTheme } from '../providers/ThemeContextProvider';

export function useThemeColor(colorName?: keyof typeof Colors.light & keyof typeof Colors.dark) {
  const { theme } = useTheme();
  return colorName ? Colors[theme][colorName] : Colors[theme];
}
