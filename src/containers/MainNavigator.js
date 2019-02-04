import React from "react";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import FocusesScreen from '../components/FocusesScreen';
import StatsScreen from '../components/StatsScreen';
import SettingsScreen from '../components/SettingsScreen';

const MainNavigator = createBottomTabNavigator({
  Stats: {
    screen: StatsScreen
  }, 
  Focuses: {
    screen: FocusesScreen
  },
  Settings: {
    screen: SettingsScreen
  },
});

export default createAppContainer(MainNavigator);