import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Componenets from "./src/screens/components";
import FlatListComponent from "./src/screens/FlatListComponent";

const App = () => {
  return (
    <View>

      <Text style={styles.textStyle}> All Manger is about to start ! </Text>
      <Componenets />
      <FlatListComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "red",
  },
});

export default App;
