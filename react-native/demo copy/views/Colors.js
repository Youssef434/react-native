import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';

export default function Colors({ route }) {
  const name = route.params.name;
  const colors = route.params.colors;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <FlatList
        data={colors}
        keyExtractor={item => item.colorName}
        renderItem={({ item }) => (
          <ColorItem colorName={item.colorName} colorHex={item.hexCode} />
        )}
        ListHeaderComponent={<Text style={styles.title}>{name}</Text>}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const ColorItem = ({ colorName, colorHex }) => (
  <View
    style={[
      styles.colorContainer,
      {
        backgroundColor: colorHex,
      },
    ]}>
    <Text
      style={[
        styles.colorText,
        {
          color:
            parseInt(colorHex.replace('#', ''), 16) > 0xffffff / 1.1
              ? 'black'
              : 'white',
        },
      ]}>{`${colorName} ${colorHex}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 20,
    marginTop: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  colorContainer: {
    marginTop: 11,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 3,
  },
  colorText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
