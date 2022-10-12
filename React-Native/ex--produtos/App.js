import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet ,TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import firebase from './services/firebase';
const db = firebase.firestore();

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);

  useEffect(() => {
    getProdutos();
  }, []);

  function getProdutos() {
    db.collection('products').get().then((col) => {
      setProdutos(col);
    });
  }

  function renderProdutos() {
    const jsx = [];

    produtos.forEach((doc) => {
      jsx.push(
        
        <View style={styles.linha}>
          <Text>{doc.data().name}</Text>
          <Text>{doc.data().price}</Text>
        </View>
      )
    });

    return jsx;
  }

  function addProdutos(){
    db.collection('products').add({
      name: nome,
      price: preco
    }).then(() => {
        getProdutos();
        alert('Produto for criado!');
      })
      .catch(() => {
        alert('Erro ao criar Produto!');
      })
  }
  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
      

        <TextInput style={styles.input} placeholder='Nome do produto'
          onChangeText={(text) => setNome(text)}
          placeholderTextColor='#00000066' />
        <TextInput style={styles.input} placeholder='Preco do produto'
          onChangeText={(text) => setPreco(text)}
          placeholderTextColor='#00000066' />

        <TouchableOpacity style={styles.btn}
          onPress={() => addProdutos()}>
          <Text>Adicionar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.paragraph}>
          Produtos
      </Text>
      {renderProdutos()}
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ECF0F1',
    padding: 8,
  },
  paragraph: {
    fontSize: 25,
    textAlign: 'center',
  },
  linha: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  input: {
    borderColor: '#00000066',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: '#000000'
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 10
  },
  btn: {
    backgroundColor: '#95D5B2',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center'
  },

});
