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
  break: '#227755',
};

export const Font = {
  primary: 'Arial',
  timer: 'Helvetica Neue',
};

export const FontSize = {
  timer: 142,
  splashTitle: 68,
  focusSubtitle: 32,
  headerTitle: 28, 
  modalTitle: 24,
  modalInput: 20,
  sectionHeader: 18,
  settingItem: 19,
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