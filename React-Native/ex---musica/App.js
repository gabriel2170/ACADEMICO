import React , {useState, useEffect} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';


export default function App() {

 var album = {
   'track 1': 'Highway to Hell',
   'track 2': 'Girls Got Rhythm',
   'track 3': 'Walk All Over You',
   'track 4': 'Touch Too Much',
   'track 5': 'Beating Around the Bush',
   'track 6': 'Shot Down In Flames',
   'track 7': 'Get It Hot',
   'track 8': 'If You Want Blood (You Got It)',
   'track 9': 'Love Hungry Man',
   'track 10': 'Night Prowler'
 }

  const [track, setTrack] = useState([]);

  useEffect(()=>{
    setTrack (album)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Highway to Hell 
      </Text>

      <View style={styles.corpo}>
        <Text style={styles.texto}>{track['track 1']}</Text>
        <Text style={styles.texto}>{track['track 2']}</Text>
        <Text style={styles.texto}>{track['track 3']}</Text>
        <Text style={styles.texto}>{track['track 4']}</Text>
        <Text style={styles.texto}>{track['track 5']}</Text>
        <Text style={styles.texto}>{track['track 6']}</Text>
        <Text style={styles.texto}>{track['track 7']}</Text>
        <Text style={styles.texto}>{track['track 8']}</Text>
        <Text style={styles.texto}>{track['track 9']}</Text>
        <Text style={styles.texto}>{track['track 10']}</Text>
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
    padding: 8,
  },
  paragraph: {
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18
  },
  corpo:{
    backgroundColor: '#CDCDCD',
    borderRadius: 5,
    padding: 10,
   
  },
  texto: {
    borderBottomColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 10,
    fontSize: 16
  }

});
