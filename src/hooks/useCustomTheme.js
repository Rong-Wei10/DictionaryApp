import { useContext } from 'react';
import { ThemeContext } from 'context/ThemeProvider';

// Custom hook to access the theme context values
export const useCustomTheme = () => {
  // Get the theme context values using useContext
  const context = useContext(ThemeContext);

  // Return the relevant theme context values
  return {
    theme: context.theme,
    colors: context.colors,
    setTheme: context.setTheme,
    loading: context.loading,
  };
};