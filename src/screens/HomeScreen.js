import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Keyboard, Linking } from 'react-native';
import axios from 'axios';
import Meaning from 'components/Meaning';
import { Audio } from 'expo-av';
import { useThemeColors } from 'hooks/useThemeColors';
import Play from "context/svgr/PlaySvg";
import HoverPlay from "context/svgr/HoverPlaySvg";
import NewWindow from "context/svgr/NewWindow";
import Search from "context/svgr/Search";
import { FontContext } from 'context/FontProvider';

const HomeScreen = ({ navigation }) => {
  // State variables
  const [word, setWord] = useState('');
  const [fullWord, setFullWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [phonetic, setPhonetic] = useState('');
  const [apiResponse, setApiResponse] = useState(null);
  const [source, setSource] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [emptyword, setEmptyWord] = useState(false);
  const [startScreen, setStartScreen] = useState(false);
  const [isAudioButtonHovered, setIsAudioButtonHovered] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { colors } = useThemeColors();
  const { selectedFont } = useContext(FontContext);
  const [apiError, setApiError] = useState(false);

  // Function to handle the search button press
  const handleSearch = async () => {
    try {
      Keyboard.dismiss();
      // Send a GET request to the dictionary API
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

      // Check if no definitions were found
      if (response.data.title === 'No Definitions Found') {
        setDefinition(false);
        return;
      }

      // Update state with the API response
      setApiResponse(response.data[0]);
      setDefinition(true);

      // Extract values from the API response
      let phoneticValue = '';
      response.data[0].phonetics.forEach((phonetic) => {
        if (phonetic.audio !== '') {
          phoneticValue = phonetic.text;
          return; 
        }
      });
      setPhonetic(phoneticValue);
      setFullWord(word);
      setEmptyWord(false);
      setSource(response.data[0].sourceUrls[0]);
      let audioUrl = '';
      response.data[0].phonetics.forEach((phonetic) => {
        if (phonetic.audio !== '') {
          audioUrl = phonetic.audio;
          return;
        }
      });
      setAudioUrl(audioUrl);
    } catch (error) {
      // Handle API call failed errors
      if (error.response && error.response.status === 404) {
        setDefinition(false);
        setApiError(true); 
      }
      // Handle non word errors
      if (word.length > 0){
        setEmptyWord(false);
        setStartScreen(true);
        setApiError(false);
      } else { //Handle empty word error
        setEmptyWord(true);
        setApiError(false);
      }
    }
  };

  // Function to play the audio pronunciation
  const playAudio = async () => {
    if (audioUrl) {
      // Create a new sound object
      const soundObject = new Audio.Sound();
      try {
        // Load the audio file from the provided URL
        await soundObject.loadAsync({ uri: audioUrl });
        // Play the loaded audio
        await soundObject.playAsync();
      } catch (error) {
        console.error('Failed to load and play audio', error);
      }
    }
  };

  // Styling for the search bar
  const searchBarStyle = {
    borderColor: emptyword && word === '' ? '#ff5252' : isInputFocused ? '#a445ed' : colors.searchBar,
    borderWidth: 1,
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} testID='background-1'>
      {/* Search Box */}
      <View style={styles.searchBox}>
          <TextInput
          style={[styles.input, searchBarStyle, {color: colors.text, backgroundColor: colors.searchBar, fontFamily: selectedFont !== null ? selectedFont + '-Bold' : selectedFont}]}
          placeholder="Search for any word..."
          placeholderTextColor='#757575'
          value={word}
          onChangeText={text => setWord(text)}
          onBlur={() => setIsInputFocused(false)}
          onFocus={() => setIsInputFocused(true)}
          testID='search-bar-1'
        />
            <TouchableOpacity style={styles.button} onPress={handleSearch} testID='search-button'>
              <Search />
            </TouchableOpacity>
      </View>
      
      <ScrollView>
        {/* Display Definition */}
        {definition ? (
          <>
            <View style={styles.sidebyside}>
            <View style={styles.wordContainer}>
              <Text style={[styles.word, { color: colors.fullWord, fontFamily: selectedFont !== null ? selectedFont + '-Bold' : selectedFont}]}>{fullWord}</Text>
              <Text style={[styles.phonetic]}>{phonetic}</Text>
            </View>
            
            <TouchableOpacity style={styles.audioButton}
            onPress={playAudio} onPressIn={() => setIsAudioButtonHovered(true)}
            onPressOut={() => setIsAudioButtonHovered(false)}
            activeOpacity={1.0}>
              {isAudioButtonHovered ? <HoverPlay /> : <Play />}
            </TouchableOpacity>
            </View>
            {/* Meanings */}
            {
              apiResponse.meanings.map((item, index) => (
                <Meaning key={index} response={item} style={styles.meaning}></Meaning>
              ))
            }
            {/* Source */}
            <View style={styles.line} />
            <View style={styles.sidebyside}>
              <Text style={[styles.sourceHeader, {fontFamily: selectedFont}]}>Source</Text>
              <TouchableOpacity onPress={() => Linking.openURL(source)}>
                <View style={styles.sidebyside}>
                  <Text style={[styles.sourceText, {color: colors.text, fontFamily: selectedFont}]}>{source}</Text>
                  <View style={styles.windowIcon}>
                    <NewWindow />
                  </View> 
                </View>
              </TouchableOpacity> 
            </View>
            
          </>
        ) : (
          <>
            {/* Empty Word Error */}
            {emptyword ? (
              <>
                <Text style={[styles.emptyWord, {fontFamily: selectedFont}]}>Whoops, can't be empty...</Text>
              </>
            ): (
              <>
                {/* No Definitions Found */}
                {startScreen ? (
                  <>
                    <Text style={[styles.errorTextHeader, {color: colors.text, fontFamily: selectedFont + '-Bold'}]}>No Defintions Found</Text>
                    <Text style={[styles.errorText, {color: colors.text, fontFamily: selectedFont}]}>Sorry pal, we couldn't find definitions for the word you were looking for. You can try the search again at later time or head to the web instead</Text>
                  </>
                ): (
                  <Text ></Text>
                )}
                {/* API call Error */}
                {apiError && <Text style={[styles.errorTextHeader, {color: colors.text, fontFamily: selectedFont + '-Bold'}]}>Error: Try again later</Text>}
              </>

            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// Style sheet for HomeScreen.js
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wordContainer: {
    flex:1,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  input: {
    width: '90%',
    height: 50,
    padding: 10,
    marginBottom: 10,
    borderRadius: 13,
    marginTop: 10,
    alignSelf: 'center',
    marginLeft: 20,
    fontWeight: 'bold',
  },
  button: {
    padding: 5,
    borderRadius: 5,
    alignSelf: 'center',
    marginLeft: -40,
  },
  searchBox: {
    flexDirection: 'row',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  definition: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 5,
    color: '#050505',
  },
  audioButton: {
    marginRight: 23,
    marginTop: 10,
  },
  word: {
    fontSize: 40,
    alignSelf: 'flex-start',
    marginTop: 10,
    marginLeft: 20,
    fontWeight: "bold",
  },
  phonetic: {
    fontSize: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
    color: '#A445ED'
  },
  meaning: {
    marginLeft: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: '#e9e9e9',
    paddingRight: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  sourceHeader: {
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: 15,
    textDecorationLine: 'underline',
    color: '#757575',
  },
  sourceText: {
    paddingTop: 20,
    fontSize: 15,
    paddingLeft: 10,
    textDecorationLine: 'underline',
  },
  sidebyside: {
    flexDirection: 'row',
  },
  windowIcon: {
    paddingTop: 22,
    marginLeft: 10,
  },
  emptyWord: {
    fontSize: 16,
    marginLeft: 20,
    marginTop: -4,
    color: '#FF5252',
  },
  errorTextHeader: {
    textAlign: 'center',
    marginTop: 200,
    fontSize: 20,
  },
  errorText: {
    marginTop: 15,
    textAlign: 'center',
    margin: 12,
  },
});

export default HomeScreen;
