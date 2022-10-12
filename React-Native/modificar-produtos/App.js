import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/Home';
import DetailScreen from './screens/Details';

const MainStack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>

        <MainStack.Screen name='Home' component={HomeScreen} />
        <MainStack.Screen name='Details' component={DetailScreen} />

      </MainStack.Navigator>
    </NavigationContainer>
  );
}