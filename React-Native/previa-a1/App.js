import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import ResultadoScreen from './screens/Resultado';

const Mainstack = createStackNavigator()

export default function App() {
  return (
   <NavigationContainer>
    <Mainstack.Navigator>
      <Mainstack.Screen name='Home' component={HomeScreen}/>
      <Mainstack.Screen name='Resultado' component={ResultadoScreen}/>
    </Mainstack.Navigator>
   </NavigationContainer>
  );
}

