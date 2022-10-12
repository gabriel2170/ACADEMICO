import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Product from './components/Product.js';

export default function App() {
  return (
    <View>
      <Text style={styles.title}>Produtos: </Text>
      <View style={styles.container}>
        <Product name="Camiseta" image="https://imgcentauro-a.akamaihd.net/900x900/85769829/camisa-adams-soccer-masculina-img.jpg" price="20.18" />
        <Product name="Bone" image="https://cdn.shopify.com/s/files/1/0549/7470/9796/products/dsc00615-editar1-0475f8f7da012d273116270627373248-1024-1024_540x.jpg?v=1635195988" price="42.56" />
        <Product name="Sapato" image="https://static.zattini.com.br/produtos/sapato-social-democrata-prime-masculino/56/D83-1271-256/D83-1271-256_zoom1.jpg?ts=1599850944&ims=544x" price="122.11" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    backgroundColor: '#ffffff',
    justifyContent: 'space-evenly',
    padding: 8,
    flexDirection: 'row',
    alignContent: 'center'
  },


  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
