import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import React, { useState } from "react";

const Components = () => {
  const [numberPin, onChangeNumberPin] = useState("");
  const [getdata, ongetdata] = useState("");

  async function get_data() {
    await fetch("http://" + ipAddress + ":5000/Hello")
      .then((response) => {
        var ip = request.getRemoteHost();
        console.log(ip);
        return response.json();
      })
      .then((res) => {
        ongetdata(res.data);
      });
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.FirstPageButton}
        onPress={() => {
          get_data();
        }}
      >
        <Text style={styles.FirstPageButtonText}>{getdata}</Text>
        <Text style={styles.FirstPageButtonText}>Get</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.FirstPageButton}
        onPress={() => {
          console.log("Hello");
        }}
      >
        <TextInput
          style={styles.TextInput}
          onChangeText={onChangeNumberPin}
          value={numberPin}
          placeholder="Enter The Pin"
          keyboardType="numeric"
        />
        <Text style={styles.FirstPageButtonText}>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.FirstPageButton}
        onPress={() => {
          console.log("Hello");
        }}
      >
        <Text style={styles.FirstPageButtonText}>Show</Text>
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
    color: "white",
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
