import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet , TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';



export default function Home({route, navigation}){

  const x = route.params
  
  
  return(
    <View style={styles.container}>
      <Text style={styles.paragraph}>{x.numero}</Text>
    </View>
  )
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 100,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },
});
