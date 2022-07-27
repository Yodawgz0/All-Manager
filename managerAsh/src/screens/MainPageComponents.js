import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MainPagestyle } from "../stylesFiles/MainPageStyles";

const MainPageComponents = () => {
  return (
    <View style={MainPagestyle.ButtonLayout}>
      <TouchableOpacity style={MainPagestyle.ButtonOptions}>
        <Text>Text Reader</Text>
      </TouchableOpacity>
      <TouchableOpacity style={MainPagestyle.ButtonOptions}>
        <Text>Play Music</Text>
      </TouchableOpacity>
      <TouchableOpacity style={MainPagestyle.ButtonOptions}>
        <Text>Tracker Items</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainPageComponents;
