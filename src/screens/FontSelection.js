import React, { useContext } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { View, Text } from 'components/themed';
import { FontContext } from '../context/FontProvider';
import { useThemeColors } from 'hooks/useThemeColors';

const FontSelection = () => {
  // set up state variable
  const { selectedFont, handleFontSelection } = useContext(FontContext);
  const { colors } = useThemeColors();
  const isSansSerifSelected = selectedFont === 'Sans_Serif';
  const isSerifSelected = selectedFont === 'Serif';
  const isMonoSelected = selectedFont === 'Mono';

  return (
    <ScrollView style={{ padding: 20, backgroundColor: colors.background}}>
    <View style={[styles.container, { backgroundColor: colors.background, marginTop: 30 }]}>
      {/* Sans Serif option */}
      <View style={styles.option}>
        <TouchableOpacity
          style={[styles.fontOption, {borderColor: colors.text}, selectedFont === 'Sans_Serif']}
          onPress={() => handleFontSelection('Sans_Serif')}
        >
          <View style={[styles.checkbox, !isSansSerifSelected && {borderColor: colors.text}, isSansSerifSelected && { backgroundColor: colors.purple },]}/>
          <Text style={[styles.optionText, {fontFamily: selectedFont, color: colors.text}]}>Sans serif</Text>
        </TouchableOpacity>
      </View>

      {/* Serif option */}
      <View style={styles.option}>
        <TouchableOpacity
          style={[styles.fontOption, {borderColor: colors.text}, selectedFont === 'Serif']}
          onPress={() => handleFontSelection('Serif')}
        >
          <View style={[styles.checkbox, !isSerifSelected && {borderColor: colors.text}, isSerifSelected && { backgroundColor: colors.purple},]}/>
          <Text style={[styles.optionText, {fontFamily: selectedFont, color: colors.text}]}>Serif</Text>
        </TouchableOpacity>
      </View>

      {/* Mono option */}
      <View style={styles.option}>
        <TouchableOpacity
          style={[styles.bottomOption, selectedFont === 'Mono']}
          onPress={() => handleFontSelection('Mono')}
          testID='mono-button'
        >
          <View style={[styles.checkbox, !isMonoSelected && {borderColor: colors.text}, isMonoSelected && { backgroundColor: colors.purple}]}/>
          <Text style={[styles.optionText, {fontFamily: selectedFont, color: colors.text}]}>Mono</Text>
        </TouchableOpacity>
      </View>
    </View>    
    </ScrollView>
    
  );
};

// Style sheet for FontSelection.js
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    option: {
      height: 80,
      position: 'relative',
    },
    fontOption: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        alignItems: 'center',
    },
    bottomOption: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 20,
        borderWidth: 1,
        marginRight: 10,
    },
    selectedOption: {
        backgroundColor: '#f0f0f0',
    },
    optionText: {
        fontSize: 20,
        position: 'absolute',
        marginLeft: 75,
    },
});

export default FontSelection;
