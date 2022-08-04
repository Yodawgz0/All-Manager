import { Text, View, ImageBackground } from "react-native";
import { MainPagestyle } from "../stylesFiles/MainPageStyles";
import React from "react";
import MainPageComponents from "./MainPageComponents";
const MainPage = ({ navigation }) => {
  return (
    <View>
      <ImageBackground
        source={require("../../assets/mainPag_back.jpg")}
        style={MainPagestyle.back_image}
        resizeMode="cover"
      >
        <View style={MainPagestyle.mainSheetStyle}>
          <Text style={MainPagestyle.textStyle}>Select!{"\n"}The Option </Text>
        </View>
        <MainPageComponents title="Text Reader" navigation={navigation} />
        <MainPageComponents title="Music Player" navigation={navigation} />
        <MainPageComponents title="Items Tracker" />
      </ImageBackground>
    </View>
  );
};

export default MainPage;
