import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Constants from 'expo-constants';

export default function Details({ route, navigation }) {
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: image.download_url}}
      />
      <Text style={styles.paragraph}>
        { image.author }
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text>Voltar</Text>
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
  paragraph: {
    margin: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
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
    backgroundColor: '#b7b7a4',
    alignItems: 'center'
  }
});
