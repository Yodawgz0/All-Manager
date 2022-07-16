import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const App = () => {
  return <Text style={styles.textStyle}> All Manger is about to start ! </Text>;
}



const styles = StyleSheet.create({
  textStyle: {
    color: "red",
  },
})


export default App;