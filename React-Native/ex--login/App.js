import React, {useState} from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import firebase from './services/firebase'

const auth = firebase.auth();



export default function App() {
const [email, setEmail] = useState('')
const [pass, setPass] = useState('')


function login(){
  auth.signInWithEmailAndPassword(email, pass)
      .then(() => {
        alert('Login efetuado com sucesso');
      })
      .catch(() => {
        alert('Nao foi possivel fazer o login');
       
      });
}

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
       Login
      </Text>
      
      <TextInput placeholder='E-mail' style={styles.input} onChangeText={(e)=> setEmail(e)}></TextInput>
      <TextInput placeholder='Senha' style={styles.input} onChangeText={(e)=> setPass(e)}></TextInput>
      <TouchableOpacity style={styles.btn}>
        <Text style={{color: '#ffffff'}} onPress={()=>{login()}}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ECF0F1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  input:{
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10
  },

  btn:{
    backgroundColor: '#2C3E50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center'
  },
});
