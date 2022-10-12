import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';

export default function Details({ route, navigation }) {
  const {image} = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: image.image}}
      />
      <Text style={styles.nome}>{image.name}</Text>
      <Text style={styles.preco}>{image.price}</Text>
      <Text style={styles.descricao}>{image.description}</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={{color: '#ffffff'}}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    alignItems: 'center'
  },
  nome:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
    marginTop: 15
  },

  preco:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34495E',
    marginTop: 15
  },
  descricao:{
    textAlign: 'center',
    color: '#34495E',
    marginTop: 15
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  btn: {
    width: 250,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#34495E',
    alignItems: 'center',
    marginTop: 15
  }
});
