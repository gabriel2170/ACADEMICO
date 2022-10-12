import React, {useState} from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Constants from 'expo-constants';
import firebase from './services/firebase'


const db = firebase.firestore()
const auth = firebase.auth()

function logup(email, pass){
  auth.createUserWithEmailAndPassword(email, pass).then(snap=>{
    const user = snap.user

    db.collection('login').doc(user.uid).set({
      email: user.email,
      
    })
    .then(()=>{
      alert('Cadastro feito com sucesso')
    })

  })
  
}

export default function App() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Cadastro
      </Text>
      
      <TextInput placeholder='E-mail' style={styles.input} onChangeText={(e)=> setEmail(e)}></TextInput>
      <TextInput placeholder='Senha' style={styles.input} onChangeText={(e)=> setPass(e)}></TextInput>
      <TouchableOpacity style={styles.btn} onPress={()=> logup(email, pass)}>
        <Text style={{color: '#ffffff'}}>Enviar</Text>
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
    padding: 10,
  },
  paragraph: {
    margin: 24,
    fontSize: 35,
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
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    padding: 10,
    borderRadius: 8,
  
  },
});
