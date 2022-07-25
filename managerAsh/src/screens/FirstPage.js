import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  ImageBackground,
  Dimensions,
  ScrollView,
} from "react-native";
import Components from "./Components";
import React from "react";
import { FirstPagestyle } from "../stylesFiles/FirstPageStyle";

const FirstPage = () => {
  return (
    <View>
      <ScrollView>
        <ImageBackground
          source={require("../../assets/back_omg.jpg")}
          style={FirstPagestyle.back_image}
          resizeMode="cover"
        >
          <View style={FirstPagestyle.mainSheetStyle}>
            <StatusBar backgroundColor="grey" />

            <Text style={FirstPagestyle.textStyle}>
              {" "}
              Welcome!{"\n"}Please Enter the Pin{" "}
            </Text>
          </View>
          <View style={FirstPagestyle.Componenets}>
            <Components />
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

export default FirstPage;
