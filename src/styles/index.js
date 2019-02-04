import { StyleSheet, Dimensions } from 'react-native';

export const dimension = {
  h: Dimensions.get('window').height,
  w: Dimensions.get('window').width,
};
  
export const colors  = {
  primary: '#22b674',
  secondary: '#254b5a',
  tertiary: '#5da6a7',
};

export const padding = {
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40,
};

export const fonts = {
  primary: 'Arial',
  sm: 12,
  md: 18,
  lg: 28,
};

const baseStyles = {
  container: {
    backgroundColor: colors.secondary,
    width: dimension.w, 
    height: dimension.h,
    paddingHorizontal: padding.sm,
    paddingVertical: padding.lg,
  },
};


export default function createStyles(overrides = {}) {
  return StyleSheet.create({...baseStyles, ...overrides})
}