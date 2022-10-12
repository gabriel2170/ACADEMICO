import  * as React from 'react';
import { Text, View, StyleSheet ,ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';



export default function Details({route, navigation}){
  const itens = route.params;
  const image = {uri: 'https://s2.glbimg.com/pPmizZbZCPyoT-k1LAxqM3ltL3M=/620x430/e.glbimg.com/og/ed/f/original/2020/05/13/gettyimages-1169568782.jpg'}


  function celsius(){
    var calc = (itens.cont - 32) * 5/9
    var result = calc.toFixed(2)
    return result
  }
  return(
    <View style={styles.container}>
      <ImageBackground style={styles.fundo} source={image}>
        <Text style={styles.paragraph}>{celsius()} °C</Text>
        <TouchableOpacity style={styles.btn} onPress={()=>{navigation.goBack()}}>
          <Text style={{color: '#ffffff'}}>
            Voltar
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  )
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fundo:{
    flex: 1,
    justifyContent: "center",
    padding: 8,
  },
  btn:{
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: '#0044ff',
    alignItems: 'center',
    marginTop: 10
  }
});
