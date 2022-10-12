import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import axios from 'axios';

export default function Home({ navigation }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('https://picsum.photos/v2/list?limit=10')
      .then((response) => {
        setImages(response.data);
      });
  }, []);

  function renderImages() {
    const jsx = [];

    images.forEach((item) => {
      jsx.push(
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate('Details', {image: item});
          }}
        >
          <Image 
            style={styles.image} 
            source={{uri: item.download_url}}
          />
        </TouchableOpacity>
      );
    });

    return jsx;
  }

  return (
    <View style={styles.container}>
      <Text>Imagens</Text>
      <ScrollView contentContainerStyle={styles.images}>
        { renderImages() }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1'
  },
  images: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap'
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    margin: 10
  }
});
