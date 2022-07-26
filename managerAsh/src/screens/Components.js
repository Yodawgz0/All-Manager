import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState } from "react";
import dataStore from "../../dataStore.json";
import { FirstPagestyle } from "../stylesFiles/FirstPageStyle";

const Components = () => {
  const [numberPin, onChangeNumberPin] = useState("");
  const [getdata, ongetdata] = useState("");
  const [validateResp, onvalidateResp] = useState("");

  async function sendPinVerify() {
    await fetch(dataStore.mainData.IPAddr, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ validatePin: numberPin }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        onvalidateResp(res.PIN);
        if (validateResp == "Wrong") {
          Alert.alert("OOPS!!", "PIN WAS WRONG!!!", [
            {
              text: "OK",
              onPress: () => console.log("PIN WAS WRONG"),
            },
          ]);
        }
        if (validateResp == "Correct") {
          console.log("PIN was correct");
        }
      })
      .catch((err) => {
        ongetdata(err);
      });
  }

  async function get_data() {
    await fetch(dataStore.mainData.IPAddr)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        ongetdata(res.data);
      })
      .catch((err) => {
        ongetdata(err);
      });
  }

  const showAlert = () => {
    get_data();
    Alert.alert(
      "Connection Details:",
      dataStore.mainData.IPAddr + "\n" + getdata,
      [
        {
          text: "OK",
          onPress: () => console.log("Connection Status was Viewed"),
        },
      ]
    );
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
        secureTextEntry={true}
      />
      <TouchableOpacity
        style={FirstPagestyle.FirstPageButton}
        onPress={() => {
          sendPinVerify();
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
