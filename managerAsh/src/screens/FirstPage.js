import { Text, View, ImageBackground, StatusBar } from "react-native";
import Components from "./Components";
import React from "react";
import { FirstPagestyle } from "../stylesFiles/FirstPageStyle";
import { useFonts } from "expo-font";
import Apploading from "expo-app-loading";
import { CherrySwash_400Regular } from "@expo-google-fonts/cherry-swash";

const FirstPage = () => {
  let [fontsload] = useFonts({
    CherrySwash_400Regular,
  });

  if (!fontsload) {
    return <Apploading />;
  }
  return (
    <View>
      <ImageBackground
        source={require("../../assets/back_omg.jpg")}
        style={FirstPagestyle.back_image}
        resizeMode="cover"
      >
        <View style={FirstPagestyle.mainSheetStyle}>
          <StatusBar backgroundColor="#483D8B" StatusBarStyle="light-content" />

          <Text style={FirstPagestyle.textStyle}>
            Welcome!{"\n"}Please Enter the Pin{" "}
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
