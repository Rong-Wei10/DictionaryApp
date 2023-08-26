import React, {useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../constants/Colors';

// Available themes
const Themes = ['light', 'dark'];

// Create the initial ThemeContext with default values
const ThemeContext = createContext({
  theme: 'light',
  setTheme: () => {},
  colors: Colors['dark'],
  loading: true,
});


const ThemeProvider = ({ children }) => {
  // State to track the current theme and loading status
  const [theme, setTheme] = useState('light');
  const [loading, setLoading] = useState(true);

  // Get the colors based on the current theme
  const colors = Colors[theme];

  // Load the preferred theme from AsyncStorage on component mount
  useEffect(() => {
    AsyncStorage.getItem('@user_preferred_theme')
      .then((storedTheme) => {
        if (storedTheme && Themes.includes(storedTheme)) {
          setTheme(storedTheme);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // Save the selected theme to AsyncStorage whenever it changes
  useEffect(() => {
    AsyncStorage.setItem('@user_preferred_theme', theme);
  }, [theme]);

  // Function to handle changing the theme
  const handleChangeTheme = (selectedTheme) => {
    if (Themes.includes(selectedTheme)) {
      setTheme(selectedTheme);
    }
  };

  return (
     // Provide the theme context value to the children components
    <ThemeContext.Provider value={{ theme, setTheme: handleChangeTheme, loading, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider, Themes };