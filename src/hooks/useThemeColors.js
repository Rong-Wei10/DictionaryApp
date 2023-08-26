import Colors from 'constants/Colors';
import { useCustomTheme } from './useCustomTheme';

// Custom hook to access the theme colors based on the current theme
export const useThemeColors = () => {
  // Get the current theme from the custom theme hook
  const customTheme = useCustomTheme();

  // Return an object with the current theme and corresponding color palette
  return {
    theme: customTheme.theme,
    colors: Colors[customTheme.theme],
  };
}