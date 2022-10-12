import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from
  'react-native';
import Constants from 'expo-constants';
import axios from 'axios';


export default function Home({ navigation }) {

  const [prod, setProd] = useState([])

  useEffect(() => {
    axios.get('https://api.npoint.io/dedaa72db29c8437f728').then((response) => {
      setProd(response.data)
    })
  }, [])

  function renderAnuncio() {
    const jsx = [];

    prod.forEach((item) => {
      jsx.push(

        <View>
          <TouchableOpacity
            style={styles.imageBtn}
            onPress={() => {
              navigation.navigate('Details', { image: item })
            }}
          >
          <View style={styles.corpo}>
            <Image
              style={styles.image}
              source={{ uri: item.image }}/>
            <Text>{item.name}</Text>
          </View>
          </TouchableOpacity>

        </View>
      )
    })
    return jsx;
  }


  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Produtos</Text>
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {renderAnuncio()}
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  
  container: {
    flex: 1, 
    backgroundColor: '#34495E',
    paddingTop: Constants.statusBarHeight,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  corpo:{ 
    height: 180,
    width: 340,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
    marginBottom: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  imageContainer:{
    flex: 1,
    height: 180,
    width: 340,
  },
  titulo:{
    color: "#ffffff",
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 25
  },
  imageBtn: {
    
    width: 120, 
    height: 150,
    marginBottom: 60,
  },
  image: {
    width: 75, 
    height: 75,
  }
});


