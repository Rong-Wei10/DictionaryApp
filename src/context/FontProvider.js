import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fonts from '../constants/Fonts';

// Create the FontContext
const FontContext = createContext();

// Create the FontProvider component
const FontProvider = ({ children }) => {
  // State to track the selected font
  const [selectedFont, setSelectedFont] = useState('Sans_Serif');

  // Load the preferred font from AsyncStorage on component mount
  useEffect(() => {
    AsyncStorage.getItem('@user_preferred_font')
      .then((storedFont) => {
        if (storedFont && Fonts.includes(storedFont)) {
          setSelectedFont(storedFont);
        }
      })
      .catch((error) => {
        console.log('Error retrieving font from AsyncStorage:', error);
      });
  }, []);

  // Function to handle font selection
  const handleFontSelection = (font) => {
    if (Fonts.includes(font)) {
      setSelectedFont(font);
      AsyncStorage.setItem('@user_preferred_font', font)
        .catch((error) => {
          console.log('Error storing font in AsyncStorage:', error);
        });
    }
  };

  return (
    // Provide the font context value to the children components
    <FontContext.Provider value={{ selectedFont, handleFontSelection }}>
      {children}
    </FontContext.Provider>
  );
};

export { FontContext, FontProvider, Fonts };
