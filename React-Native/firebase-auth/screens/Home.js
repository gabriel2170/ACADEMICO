import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

import Loading from './Loading';
import firebase from '../services/firebase';

const auth = firebase.auth();
const db = firebase.firestore();

export default function SignUp({ navigation }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const uid = auth.currentUser.uid;
    db.collection('users')
      .doc(uid)
      .get()
      .then((doc) => {
        setUser(doc.data());
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, { user.name }</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => auth.signOut()}
      >
        <Text style={styles.btnText}>Sair</Text>
      </TouchableOpacity>
    </View>
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
  }
});
