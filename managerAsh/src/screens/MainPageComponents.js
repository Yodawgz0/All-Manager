import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MainPagestyle } from "../stylesFiles/MainPageStyles";
import * as Haptics from "expo-haptics";
const MainPageComponents = (props) => {
  const pressHandler = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (props.title == "Text Reader") {
      props.navigation.navigate("TextReaderScreen");
    } else if (props.title == "Music Player") {
      props.navigation.navigate("MusicPlayerPage");
    }
  };
  return (
    <View style={MainPagestyle.ButtonLayout}>
      <TouchableOpacity
        style={MainPagestyle.ButtonOptions}
        onPress={() => pressHandler()}
      >
        <Text style={MainPagestyle.ButtonOptionsText}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MainPageComponents;
