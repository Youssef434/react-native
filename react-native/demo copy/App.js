import React from 'react';
import Home from './views/Home';
import Colors from './views/Colors';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ColorModal from './views/ColorModal';
import { Text, View } from 'react-native';

const RootStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator
          mode="modal"
          screenOptions={{ animationEnabled: false }}>
          <RootStack.Screen
            name="Main"
            component={MainStackScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen name="ColorModal" component={ColorModal} />
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
}

const MainStackScreen = () => (
  <MainStack.Navigator>
    <MainStack.Screen name="Home" component={Home} />
    <MainStack.Screen
      name="Colors"
      component={Colors}
      options={({ route }) => ({ title: route.params.name })}
    />
  </MainStack.Navigator>
);
