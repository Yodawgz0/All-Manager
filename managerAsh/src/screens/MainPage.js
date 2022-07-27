import { Text, View, ImageBackground } from "react-native";
import { MainPagestyle } from "../stylesFiles/MainPageStyles";
import React from "react";
import MainPageComponents from "./MainPageComponents";
const MainPage = () => {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/back_omg.jpg")}
        style={MainPagestyle.back_image}
        resizeMode="cover"
      >
        <View style={MainPagestyle.mainSheetStyle}>
          <Text style={MainPagestyle.textStyle}>Select!{"\n"}The Option </Text>
        </View>
        <MainPageComponents />
      </ImageBackground>
    </View>
  );
};

export default MainPage;
