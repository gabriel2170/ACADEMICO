import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

import Loading from './Loading';
import firebase from '../services/firebase';

const auth = firebase.auth();

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  function signIn() {
    
    auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        alert('Login efetuado com sucesso');
      })
      .catch(() => {
        alert('Nao foi possivel fazer o login');
       
      });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <ImageBackground 
      style={styles.container}
      source={require('../assets/bg.png')}
    >
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        onChangeText={(text) => setEmail(text)}
        placeholder='E-mail'
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => setPassword(text)}
        placeholder='Senha'
        secureTextEntry={true}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => signIn()}
      >
        <Text style={styles.btnText}>Enviar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
      >
        <Text style={styles.link}>Cadastrar</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#565656',
    marginBottom: 20
  },
  input: {
    backgroundColor: '#FFFFFF99',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10
  },
  btn: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#9D4EDD',
    marginVertical: 10
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 22
  },
  link: {
    color: '#787878',
    fontSize: 22,
    textAlign: 'right',
    marginTop: 10
  }
});
