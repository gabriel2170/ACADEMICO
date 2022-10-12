import React, { useState, useEffect } from 'react';

import Loading from './screens/Loading';
import AuthStack from './navigation/AuthStack';
import MainStack from './navigation/MainStack';

import firebase from './services/firebase';
const auth = firebase.auth();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (user) {
    return <MainStack />;
  }

  return <AuthStack />;
}
