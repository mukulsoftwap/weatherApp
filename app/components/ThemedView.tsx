import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '../hooks/useThemeColor';

export type ThemedViewProps = ViewProps & {
  borderAllow? : boolean
};

export function ThemedView({ style, borderAllow, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor( 'background');
  const styleProp:any = {
    backgroundColor
  }
  if(borderAllow){
    const secondryBg = useThemeColor('secondryBg');
    styleProp['borderColor'] = secondryBg;
    styleProp['borderWidth'] = 1;
  }

  return <View style={[styleProp , style]} {...otherProps} />;
}
