import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect, useContext } from 'react';
import { ThemeContext } from 'context/ThemeProvider';
import HomeScreen from 'screens/HomeScreen';
import ThemeSelection from 'screens/ThemeSelection';
import { useThemeColors } from 'hooks/useThemeColors';
import FontSelection from 'screens/FontSelection';
import { FontContext } from 'context/FontProvider';
import { commonScreenOptions } from './RootNavigation';

// Create a stack navigator
const Stack = createStackNavigator();

const TopNavigation = () => {
  // Get states from the custom hook
  const { colors } = useThemeColors();
  const { setTheme } = useContext(ThemeContext);
  const { selectedFont } = useContext(FontContext);

  // Set the theme when the colors change
  useEffect(() => {
    setTheme(colors);
  }, [colors, setTheme]);

  // Return the navigation container and stack navigator
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={({ navigation }) => commonScreenOptions({ navigation, colors, selectedFont })}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="FontSelection" component={FontSelection} />
        <Stack.Screen name="ThemeSelection" component={ThemeSelection} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TopNavigation;