import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity , TextInput } from 'react-native';
import Constants from 'expo-constants';
import firebase from './services/firebase'


const db = firebase.firestore();
export default function App(){
  const [nome, setNome] = useState("")
  const [items, setItems] = useState([])
  
 
  useEffect(()=>{
    getItem()
  },[])


  function getItem(){
    db.collection('shopping')
    .get()
    .then((doc)=>{
      setItems(doc)
    })
  }
  
  function removerItens(id){
    db.collection('shopping')
    .doc(id)
    .delete()
    .then((col)=>{
      alert('Item removido com sucesso!!')
      getItem()
    })
  }
  
 
  function adicionarItens(){
    db.collection('shopping')
    .add({
      name: nome
    })
    .then((col)=>{
      alert('Item adicionado com sucesso')
      getItem()
    })
    .catch(() =>{
      alert('Erro ao adicionar item')   
      
    })
    
  }

 

  function renderItens(){
    var jsx = []

    items.forEach((doc)=>{
     
      jsx.push( 
      <View style={styles.container}>
       <Text>{doc.data().name}</Text>   
        <TouchableOpacity onPress={()=> removerItens(doc.id)}>
          <Text style={{color: '#FF0000'}}>Remover</Text>
        </TouchableOpacity>  
      </View>  
      )
    })

    return jsx
  }
  

  return(
      <View style={styles.content}>
        <Text style={styles.titulo}>Lista de Compras</Text>
        <TextInput 
          placeholder='Nome do item' 
          style={styles.caixa}
          onChangeText={(e)=> setNome(e)}
        ></TextInput>
        <TouchableOpacity 
          style={styles.btnAdicionar}
          onPress={()=> adicionarItens()}
        >
        <Text>Adicionar</Text>
        </TouchableOpacity>
      {renderItens()}
      </View>
    
  )
}

const styles = StyleSheet.create({

content:{
  flex: 1,
  padding: 10,
  backgroundColor: '#ECF0F1',
  justifyContent: 'center'
},
 caixa:{
   padding: 10,
   borderWidth: 1,
   borderRadius: 10,
   marginBottom: 20,
 },
  titulo:{
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 20,
  },
 btnAdicionar:{
   backgroundColor: '#3498DB',
   padding: 10,
   borderRadius: 10,
   alignItems: 'center',
   marginBottom: 20,
 },
 
 container: {
  borderBottomWidth: 1,
  marginBottom: 20,
  flexDirection: 'row',
  justifyContent: 'space-between',
 },
 
});