import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider as CustomThemeProvider } from 'context/ThemeProvider';
import TopNavigation from './navigation/TopNavigation';
import { FontProvider } from './context/FontProvider';
import * as Font from 'expo-font';
import { useEffect, useState, useContext } from 'react';
import { FontContext } from './context/FontProvider';

// Define the App component
const App = () => {  
  // State to track if fonts are loaded
  const [fontLoaded, setFontLoaded] = useState(false);

  // Load the fonts when the component mounts
  useEffect(() => {
    const loadFonts = async () => {
      // Load the required fonts using Font.loadAsync
      await Font.loadAsync({
        'Mono': require('../assets/fonts/inconsolata/static/Inconsolata-Regular.ttf'),
        'Serif': require('../assets/fonts/lora/static/Lora-Regular.ttf'),
        'Sans_Serif': require('../assets/fonts/inter/static/Inter-Regular.ttf'),
        'Mono-Bold': require('../assets/fonts/inconsolata/static/Inconsolata-Bold.ttf'),
        'Serif-Bold': require('../assets/fonts/lora/static/Lora-Bold.ttf'),
        'Sans_Serif-Bold': require('../assets/fonts/inter/static/Inter-Bold.ttf'),
      });
      // Set fontLoaded to true when the fonts are loaded
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  // If fonts are not loaded yet, return null
  if (!fontLoaded) {
    return null;
  }

  // Return the app structure once fonts are loaded
  return (
    <SafeAreaProvider>
      <CustomThemeProvider>
        <FontProvider>
          <TopNavigation/>
        </FontProvider>
      </CustomThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;