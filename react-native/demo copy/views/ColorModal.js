import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Switch } from 'react-native-gesture-handler';
import { useCallback, useState } from 'react/cjs/react.development';
import { COLORS } from '../data/allNamedColors';

export default function ColorModal({ navigation }) {
  const [paletteName, setPaletteName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const handleUpdate = useCallback(
    (color, newValue) => {
      if (newValue === true) {
        setSelectedColors(current => [...current, color]);
      } else {
        setSelectedColors(current =>
          current.filter(c => c.colorName !== color.colorName),
        );
      }
    },
    [selectedColors],
  );

  const submitForm = () => {
    if (paletteName.trim().length <= 0 || selectedColors.length <= 0) return

    navigation.navigate('Home', {
      newPalette: { paletteName: paletteName.trim(), colors: selectedColors },
    });
  };

  return (
    <View>
      <Text style={styles.inputText}>Name Of Your Color Palette</Text>
      <TextInput
        style={styles.input}
        value={paletteName}
        onChangeText={(text) => setPaletteName(text)}
      />
      <View style={{ height: '85%', width: '90%', alignSelf: 'center' }}>
        <FlatList
          data={COLORS}
          renderItem={({ item }) => (
            <View style={styles.colorContainer}>
              <Text style={styles.colorName}>{item.colorName}</Text>
              <Switch
                value={Boolean(
                  selectedColors.find(
                    color => color.colorName === item.colorName,
                  ),
                )}
                onValueChange={newValue => handleUpdate(item, newValue)}
              />
            </View>
          )}
          keyExtractor={item => item.colorName}
          horizontal={false}
          showsVerticalScrollIndicator={false}
        />
        <TouchableOpacity style={styles.submit} onPress={submitForm}>
          <Text style={styles.submitText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputText: {
    marginTop: 12,
    marginLeft: 12,
    fontSize: 18,
    fontWeight: '500',
  },
  input: {
    borderWidth: 0.2,
    marginHorizontal: 12,
    marginVertical: 12,
    height: 40,
    fontSize: 18,
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 12,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 0.2,
  },
  colorName: {
    fontSize: 16,
  },
  submit: {
    marginTop: 12,
    alignSelf: 'center',
    backgroundColor: '#00A0B0',
    paddingVertical: 9,
    borderRadius: 5,
    width: '100%',
  },
  submitText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    fontWeight: '500',
  },
});
