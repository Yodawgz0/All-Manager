import { Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import dataStore from "../../dataStore.json";
import { FirstPagestyle } from "../stylesFiles/FirstPageStyle";

const Components = ({ navigation }) => {
  const [numberPin, onChangeNumberPin] = useState("");
  const [getdata, ongetdata] = useState("");
  const [validateResp, onvalidateResp] = useState("");
  useEffect(() => {
    console.log(validateResp);
    if (validateResp == "Wrong") {
      Alert.alert("OOPS!!", "PIN WAS WRONG!!!", [
        {
          text: "OK",
          onPress: () => console.log("PIN WAS WRONG"),
        },
      ]);
    } else if (validateResp == "Correct") {
      Alert.alert("YAY!!", "PIN WAS Correct!!!", [
        {
          text: "OK",
          onPress: () => console.log("PIN WAS Correct"),
        },
      ]);
      navigation.navigate("mainPage");
    }
  }, [validateResp]);

  useEffect(() => {
    if (getdata) {
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
    }
  }, [getdata]);
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
        onvalidateResp("");
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
          get_data();
          ongetdata("");
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
