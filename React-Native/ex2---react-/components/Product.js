import * as React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

export default function produto(props) {
  return (
    <View style={styles.corpo}>    
        <Image 
          source={{uri: props.image}} 
          style={styles.image} 
          />
        <Text style={styles.name}>{props.name}</Text>
        <Text style={styles.price}>{props.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
 corpo: {
    backgroundColor: '#ffffff',
    width: 130,
    height: 160,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#95A5A6',
    margin: 10,
  },
  image: {
    width: 100,
    height: 100,  
  },
  name: {
    fontSize: 18,
    color: '#2C3E50',
    fontWeight: 'bold',
  },
  price: {
    color: '#7F8C8D',
  },
});
