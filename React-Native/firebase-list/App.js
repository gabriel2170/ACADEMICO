import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Constants from 'expo-constants';

import firebase from './services/firebase';
const db = firebase.firestore();

export default function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemons();
  }, []);

  function getPokemons() {
    db.collection('pokemons')
      .get()
      .then((col) => {
        setPokemons(col);
      });
  }

  function renderPokemons() {
    const jsx = [];

    pokemons.forEach((doc) => {
      jsx.push(
        <View style={styles.card}>

          <Image style={styles.image}
            source={{ uri: doc.data().image }} />

          <Text>{ doc.data().name }</Text>

        </View>
      )
    });

    return jsx;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Hello World
      </Text>

      <View style={styles.pokemons}>
        { renderPokemons() }
      </View>
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
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    width: 120,
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderWidth: 1
  },
  image: {
    width: 100,
    height: 100
  },
  pokemons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly'
  }
});
