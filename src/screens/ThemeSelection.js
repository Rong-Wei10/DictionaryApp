import { Fragment, useContext } from 'react';
import { ScrollView, StyleSheet, Pressable } from 'react-native';
import { View, Text } from 'components/themed';
import { useThemeColors } from 'hooks/useThemeColors';
import { Themes } from 'context/ThemeProvider';
import { useCustomTheme } from 'hooks/useCustomTheme';
import Layout from '../layouts/Main';
import { FontContext } from 'context/FontProvider';

const Border = () => {
  // Get the theme colors using the useThemeColors hook
  const { colors } = useThemeColors();
  return <View style={[styles.border, { backgroundColor: colors.text }]} />;
};

const ThemeRow = ({ children, checked, onPress, test }) => {
  // Get the theme colors using the useThemeColors hook
  const { colors } = useThemeColors();
  const { selectedFont } = useContext(FontContext);

  const checkedStyle = [styles.checkbox, { borderColor: colors.text }, testID='check-style'];

  if (checked) {
    checkedStyle.push({
      borderColor: colors.primarySecondary,
      backgroundColor: colors.purple,
    });
  }

  // Render a Pressable component representing a row in the theme selection
  // Apply the checkbox style and call the onPress function when pressed
  return (
    <Pressable style={styles.row} onPress={onPress} testID={test}>
      <View style={checkedStyle} />
      <Text style={[styles.text, {fontFamily: selectedFont}]}>{children}</Text>
    </Pressable>

  );
};

const ThemeSelection = () => {
  // Get the current theme and the function to set the theme from useCustomTheme hook
  const { theme, setTheme } = useCustomTheme();

  return (
    <Layout>
      <ScrollView style={{ padding: 20 }} keyboardShouldPersistTaps='handled'>
        {/* Map over the available themes and render a ThemeRow for each theme */}
        {Themes.map((key, index) => (
          <Fragment key={key}>
            <ThemeRow onPress={() => setTheme(key)} checked={theme === key} test={key}>
              {key}
            </ThemeRow>
            {index !== Themes.length - 1 && <Border />}
          </Fragment>
        ))}
      </ScrollView>
    </Layout>
  );
};

// Style sheet for ThemeSelection.js
const styles = StyleSheet.create({
  border: {
    flex: 1,
    height: 1,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    marginRight: 10,
  },
});

export default ThemeSelection;
