import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet , TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';



export default function Home({navigation}){

  const [number, setNumber] = useState(0)
  
  return(
    <View style={styles.container}>
      <Text style={styles.paragraph}>{number}</Text>
      <TouchableOpacity style={styles.btnAumentar} onPress={()=> setNumber(number + 1)}>
        <Text style={{color: '#FFFFFF'}}>AUMENTAR</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnResultado} onPress={()=> {
      navigation.navigate('Resultado', {numero: number})
      }}>
        <Text style={{color: '#FFFFFF'}}>RESULTADO</Text>
      </TouchableOpacity>
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
    margin: 20,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    
  },

  btnAumentar: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#0077ff',
    
  },

  btnResultado: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ffffff',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#00ff44'
  },
});
