import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from 'hooks/useThemeColors';
import { FontContext } from 'context/FontProvider';

const Meaning = ({ response }) => {
    const { partOfSpeech, definitions, synonyms, antonyms, example } = response;
    const { colors } = useThemeColors();
    const { selectedFont } = useContext(FontContext);

    return (
        <View style={styles.container}>
            <View style={styles.speechArea}>
                <Text style={[styles.partOfSpeech, {color: colors.fullWord, fontFamily: selectedFont + '-Bold'}]}>{partOfSpeech}</Text>
                <View style={styles.line} />
            </View>
            <Text style={[styles.meaning, {fontFamily: selectedFont}]}>Meaning</Text>

            {/* Display each definition for this meaning */}
            {definitions && definitions.length > 0 ? (
                definitions.map((item, index) => (
                    <View key={index} style={styles.listItem}>
                        <View style={styles.definitionContainer}>
                            <Text style={styles.bulletPoint}>•</Text>
                            <Text style={[styles.definition, { color: colors.fullWord, fontFamily: selectedFont}]}>{item.definition}</Text>
                        </View>
                        {item.example && (
                            <View style={styles.exampleContainer}>
                                <Text style={[styles.example, {fontFamily: selectedFont}]}>"{item.example}"</Text>
                            </View>
                        )}
                    </View>
                ))
            ) : (
                <Text>Failed</Text>
            )}

            {/* Display sentence example, synonyms, and antonyms if they exist for this word */}
            {example && (
                <Text style={styles.example}>{example}</Text>
            )}
            {synonyms && synonyms.length > 0 && (
                <View style={styles.synonymRow}>
                    <Text style={[styles.synonymsText, {fontFamily: selectedFont}]}>Synonyms</Text>
                    <Text style={[styles.synonyms, {fontFamily: selectedFont + '-Bold'}]}>{synonyms.join(', ')}</Text>
                </View>
                
            )}
            {antonyms && antonyms.length > 0 && (
                <View style={styles.synonymRow}>
                    <Text style={[styles.synonymsText, {fontFamily: selectedFont}]}>Antonyms</Text>
                    <Text style={[styles.synonyms, {fontFamily: selectedFont + '-Bold'}]}>{antonyms.join(', ')}</Text>
                </View>
            )}
        </View>
    );

};

const styles = StyleSheet.create({
    speechArea: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    partOfSpeech: {
        fontStyle: 'italic',
        fontSize: 17,
        marginLeft: 20,
        paddingVertical: 20,
        paddingRight: 10,
    },
    line: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#e9e9e9',
        paddingRight: 10,
        marginHorizontal: 10,
    },
    meaning: {
        marginLeft: 20,
        color: '#757575',
        fontSize: 15,
    },
    listItem: {
        marginBottom: 8,
        width: '80%',
        marginLeft: 20,
    },
    definitionContainer: {
        flexDirection: 'row',
    },
    bulletPoint: {
        marginRight: 8,
        fontSize: 30,
        color: '#a445ed',
        marginLeft: 10,
    },
    definition: {
        lineHeight: 21,
        marginTop: 8,
    },
    example: {
        marginLeft: 28,
        lineHeight: 20,
        color: '#757575',
    },
    synonymRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        width: '80%',
        marginLeft: 20,
    },
    synonymsText: {
        fontSize: 15,
        color: '#757575',
        marginRight: 25,
    },
    synonyms: {
        marginTop: -2,
        fontSize: 18,
        color: '#a445ed',
        fontWeight: 'bold',
    },
  });

export default Meaning;