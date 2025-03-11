import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  borderAllow? : boolean
};

export function ThemedView({ style, lightColor, darkColor, borderAllow, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  const styleProp:any = {
    backgroundColor
  }
  if(borderAllow){
    const secondryBg = useThemeColor({ light: lightColor, dark: darkColor }, 'secondryBg');
    styleProp['borderColor'] = secondryBg;
    styleProp['borderWidth'] = 1;
  }

  return <View style={[styleProp , style]} {...otherProps} />;
}
