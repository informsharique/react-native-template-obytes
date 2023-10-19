import { useIsFocused } from '@react-navigation/native';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import { StatusBar } from 'react-native';

import { colors } from './theme';

type Props = React.ComponentProps<typeof StatusBar>;
export const FocusAwareStatusBar = (props: Props) => {
  const isFocused = useIsFocused();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const barStyle = isDark ? 'light-content' : 'dark-content';
  const barBackground = isDark ? colors.charcoal[950] : colors.white;

  return isFocused ? (
    <StatusBar
      backgroundColor={barBackground}
      barStyle={barStyle}
      animated
      {...props}
    />
  ) : null;
};
