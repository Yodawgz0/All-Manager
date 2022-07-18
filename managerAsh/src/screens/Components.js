import { StyleSheet, Text, View, Button, TextInput } from "react-native";
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
      <Button title="Start" onPress={() => console.log("Hello")} />
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
});

export default Components;
