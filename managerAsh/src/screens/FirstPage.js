import { StatusBar } from "expo-status-bar";
import { Text, View, ImageBackground } from "react-native";
import Components from "./Components";
import React from "react";
import { FirstPagestyle } from "../stylesFiles/FirstPageStyle";

const FirstPage = () => {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/back_omg.jpg")}
        style={FirstPagestyle.back_image}
      >
        <View style={FirstPagestyle.mainSheetStyle}>
          <StatusBar backgroundColor="grey" />

          <Text style={FirstPagestyle.textStyle}>
            {" "}
            Welcome! <br /> Please Enter the Pin{" "}
          </Text>
        </View>
        <View style={FirstPagestyle.Componenets}>
          <Components />
        </View>
      </ImageBackground>
    </View>
  );
};

export default FirstPage;
