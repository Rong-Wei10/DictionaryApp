import React from 'react';
import { View, Text, TouchableOpacity, Platform, } from 'react-native';
import Logo from 'context/svgr/Logo';

export const commonScreenOptions = ({ navigation, colors, selectedFont }) => ({
  headerStyle: {
    backgroundColor: colors.background,
    borderBottomColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
  },

  // Navigation to Home screen
  headerLeft: () => (
    <View style={styles.container}>
      <Logo />
      <View style={styles.homeContainer}>
        <TouchableOpacity
          style={[styles.homeStyle, styles.navButton, {backgroundColor: colors.navButtons}]}
          onPress={() => {
            navigation.navigate('HomeScreen');
          }}
          testID='home-page-nav'
        >
          <View style={styles.theme}>
            <Text style={[styles.homeButton, { color: colors.text, fontFamily: selectedFont }]}>Home</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  ),

  // Navigation to Font selection screen
  headerTitle: () => (
    <View style={styles.fontContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FontSelection');
        }}
        testID='font-select-nav'
        style={[styles.navButton, {backgroundColor: colors.navButtons}]}
      >
        <View style={styles.sidebyside}>
          <Text style={[styles.fontButton, { color: colors.text, fontFamily: selectedFont }]}>Fonts</Text>
        </View>
      </TouchableOpacity>
    </View>
  ),

  // Navigation to Theme selection screen
  headerRight: () => (
    <View style={styles.themeContainer}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ThemeSelection');
        }}
        testID='theme-select-nav'
        style={[styles.navButton, {backgroundColor: colors.navButtons}]}
      >
        <View style={styles.theme}>
          <Text style={[styles.button, { color: colors.text, fontFamily: selectedFont }]}>Theme</Text>
        </View>
      </TouchableOpacity>
    </View>
  ),
});

// Style sheet for RootNavigation.js
const styles = {
  container: {
    marginLeft: 20,
    flexDirection: 'row',
  },
  homeContainer: {
    marginLeft: 20,
  },
  navButton: {
    width: 80,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Platform.OS !== 'ios' ? 2 : 20,
    borderRadius: 13,
  },
  fontContainer: {
    marginLeft: Platform.OS !== 'ios' ? 2 : 75,
    flexDirection: 'row',
  },
  logo: {
    marginLeft: 20,
  },
  verticalLine: {
    borderLeftWidth: 2,
    height: 25,
    marginRight: 20,
    marginTop: 5,
    borderColor: '#E9E9E9',
  },
  sidebyside: {
    flexDirection: 'row',
  },
};

export default styles;


