import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet ,TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Botao from '../services/botao'
import { Ionicons } from '@expo/vector-icons';
import firebase from '../services/firebase';
const db = firebase.firestore();



export default function Editar({navigation, route}){
  const  id  = route.params;
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState(0);
  
  
  useEffect(() => {
    getProdutos();
  }, []);

  function getProdutos() {
    db.collection('products')
      .doc(id)
      .get()
      .then((doc) => {
        setNome(doc.data().name)
        setPreco(doc.data().price)
      });
  }

  function removeProdutos() {
    db.collection('products')
      .doc(id)
      .delete()
      .then(() => {
        navigation.navigate('Home');
      })
      .catch((error) => {
        alert('Erro ao excluir o Produto');
      });
  }

  function modificarProdutos(){
    db.collection('products')
    .doc(id)
    .update({
      name: nome,
      price: preco,
    })
    .then(() => {
        getProdutos();
        alert('Produto editado com sucesso');
      })
      .catch((error) => {
        alert('Erro ao editar o Produto');
      });
    
  }
  
  return(
    
    <View style={styles.main}>
      <Botao navigation={navigation}></Botao>
        <TouchableOpacity
        style={styles.rmBtn}
        onPress={() => removeProdutos()}
      >
        <Ionicons name='trash' size={24} color='#000000' />
      </TouchableOpacity>
        
        <TextInput style={styles.input} value={nome} placeholder='Nome'
          onChangeText={(text) => setNome(text)}
          placeholderTextColor='#00000066' />
        <TextInput style={styles.input} value={preco} placeholder='Preco'
          onChangeText={(text) => setPreco(text)}
          placeholderTextColor='#00000066' />

        <TouchableOpacity style={styles.btn}
          onPress={() => modificarProdutos()}>
          <Text>Editar Produto</Text>
        </TouchableOpacity>
      </View>
   
  )
}
const styles = StyleSheet.create({
  
  input: {
    borderColor: '#00000066',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: '#000000',
    
  },
  rmBtn: {
    position: 'absolute',
    top: (Constants.statusBarHeight + 10),
    right: 10
  },
  main: {
    paddingVertical: 30,
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingTop: 250
  },
  btn: {
    backgroundColor: '#95D5B2',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'
  },

});