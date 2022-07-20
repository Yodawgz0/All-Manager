import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";

const Components = () => {
  const [numberPin, onChangeNumberPin] = useState("");

  return (
    <View>
      <TextInput
        style={styles.TextInput}
        onChangeText={onChangeNumberPin}
        value={numberPin}
        placeholder="Enter The Pin"
        keyboardType="numeric"
      />
      <TouchableOpacity
        style={styles.FirstPageButton}
        onPress={() => {
          console.log("Hello");
        }}
      >
        <Text style={styles.FirstPageButtonText}>Press Here</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.FirstPageButton}
        onPress={() => {
          console.log("Hello");
        }}
      >
        <Text style={styles.FirstPageButtonText}>Press Here</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.FirstPageButton}
        onPress={() => {
          console.log("Hello");
        }}
      >
        <Text style={styles.FirstPageButtonText}>Press Here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  TextInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  FirstPageButton: {
    alignItems: "center",
    backgroundColor: "#190979",
    padding: 20,
    marginTop: 100,
    borderRadius: 25,
  },
  FirstPageButtonText: {
    color: "pink",
  },
});

export default Components;
