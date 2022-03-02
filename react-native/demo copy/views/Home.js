import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  SafeAreaView,
} from 'react-native';

export default function Home({ navigation, route }) {
  const [colors, setColors] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const newPalette = route.params ? route.params.newPalette : null;

  const fetchColorsFromAPI = useCallback(async () => {
    const response = await fetch(
      'https://color-palette-api.kadikraman.vercel.app/palettes',
    );
    const data = await response.json();
    setColors(data);
  }, []);

  useEffect(() => {
    fetchColorsFromAPI();
  }, []);

  useEffect(() => {
    newPalette && setColors(current => [...current, newPalette]);
  }, [newPalette]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorsFromAPI();
    setIsRefreshing(false);
  });

  return (
    <View>
      <SafeAreaView>
        <TouchableOpacity onPress={() => navigation.navigate('ColorModal')}>
          <Text
            style={{
              color: '#00A0B0',
              fontSize: 22,
              fontWeight: '600',
              marginLeft: 12,
              marginVertical: 6,
            }}>
            Add a color scheme
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <View style={{height: '94%'}}>
        {colors.length > 0 && (
          <FlatList
            data={colors}
            renderItem={({ item }) => (
              <View>
                <ColorsType
                  type={item.colors}
                  name={item.paletteName}
                  navigation={navigation}
                />
              </View>
            )}
            keyExtractor={item => item.id}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
          />
        )}
      </View>
    </View>
  );
}

const ColorsType = ({ type, name, navigation }) => {
  return (
    <View
      style={{
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 10,
      }}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Colors', {
            name,
            colors: type,
          })
        }>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          {name}
        </Text>
        <View
          style={{
            marginTop: 12,
          }}>
          <FlatList
            data={type}
            renderItem={({ item, index }) => {
              if (index >= 5) return;

              return <Color hexCode={item.hexCode} />;
            }}
            keyExtractor={item => item.hexCode}
            horizontal={true}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Color = ({ hexCode }) => {
  return (
    <View
      style={{
        backgroundColor: hexCode,
        height: 50,
        width: 50,
        marginRight: 12,
        borderRadius: 3,
      }}></View>
  );
};
