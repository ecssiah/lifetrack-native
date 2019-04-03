import { StyleSheet, Dimensions } from 'react-native'

export const Screen = {
  h: Dimensions.get('window').height,
  w: Dimensions.get('window').width,
}

export const Color  = {
  primary: '#343434',
  secondary: '#aeaeae',
  highlight: '#820020',
  working: '#2200aa',
  break: '#227755',
}

export const Size = {
  small: 4,
  medium: 8,
  large: 16,
}

export const Font = {
  primary: 'AppleSDGothicNeo-Regular',
  timer: 'HelveticaNeue-Light',
}

export const FontSize = {
  timer: 140,
  splashTitle: 68,
  subtitle: 32,
  headerTitle: 28, 
  sectionHeader: 18,
  settingItem: 19,
  modalTitle: 24,
  modalInput: 20,
}

const BaseStyles = {
  headerStyle: {
    backgroundColor: Color.primary,
  },
  headerTitleStyle: {
    fontFamily: Font.primary,
    fontSize: FontSize.headerTitle,
    fontWeight: 'bold',
  },
}

export default function createStyles(overrides = {}) {
  return StyleSheet.create({
    ...BaseStyles, 
    ...overrides,
  })
}