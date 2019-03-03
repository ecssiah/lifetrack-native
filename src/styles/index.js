import { StyleSheet, Platform, Dimensions } from 'react-native';

export const Screen = {
  h: Dimensions.get('window').height,
  w: Dimensions.get('window').width,
};

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
export const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;  

export const Color  = {
  primary: '#343434',
  secondary: '#aeaeae',
  highlight: '#820020',
  working: '#2200aa',
  break: '#990033',
};

export const Font = {
  primary: 'Arial',
  timer: 'Helvetica Neue',
};

export const FontSize = {
  headerTitle: 28, 
};

const BaseStyles = {
  container: {
    flex: 1,
  },
};

export default function createStyles(overrides = {}) {
  return StyleSheet.create({
    ...BaseStyles, 
    ...overrides
  });
};