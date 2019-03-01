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
};

export const Fonts = {
  primary: 'Arial',
  timer: 'Helvetica Neue',
};

const BaseStyles = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  section: {
    color: 'black',
    fontSize: 18,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({...BaseStyles, ...overrides})
}