import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import dataStore from "../../dataStore.json";
import { FirstPagestyle } from "../stylesFiles/FirstPageStyle";

const Components = () => {
  const [numberPin, onChangeNumberPin] = useState("");
  const [getdata, ongetdata] = useState("");

  async function get_data() {
    await fetch(dataStore.mainData.IPAddr)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        ongetdata(res.data);
      });
  }
  const showAlert = () => {
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Ask me later",
        onPress: () => console.log("Ask me later pressed"),
      },
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  };
  return (
    <View>
      <TextInput
        style={FirstPagestyle.TextInput}
        onChangeText={onChangeNumberPin}
        value={numberPin}
        placeholder="Enter The Pin"
        keyboardType="numeric"
        textAlign="center"
      />
      <TouchableOpacity
        style={FirstPagestyle.FirstPageButton}
        onPress={() => {
          console.log("Hello");
        }}
      >
        <Text style={FirstPagestyle.FirstPageButtonText}>Validate</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={FirstPagestyle.FirstPageButtonGetData}
        onPress={() => {
          showAlert();
        }}
      >
        <Text style={FirstPagestyle.FirstPageButtonText}>
          Connection Details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Components;
