import { StyleSheet, Platform, Dimensions } from 'react-native';

export const Screen = {
  h: Dimensions.get('window').height,
  w: Dimensions.get('window').width,
};

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;  

export const Colors  = {
  primary: '#343434',
  secondary: '#aeaeae',
  text: '#000000',
};

export const Padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

export const Fonts = {
  primary: 'Arial',
  sm: 12,
  md: 18,
  lg: 28,
};

const BaseStyles = {
  container: {
    flex: 1,
  },
  statusBar: {
    backgroundColor: Colors.primary,
    width: Screen.w,
    height: 20,
  },
  screen: {
    backgroundColor: "#ffffff",
    width: Screen.w,
    height: Screen.h,
  },
};


export default function createStyles(overrides = {}) {
  return StyleSheet.create({...BaseStyles, ...overrides})
}