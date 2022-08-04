import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MainPagestyle } from "../stylesFiles/MainPageStyles";
import * as Haptics from "expo-haptics";
const MusicPlayerPage = (props) => {
  return (
    <View style={MainPagestyle.ButtonLayout}>
      <TouchableOpacity style={MainPagestyle.ButtonOptions} onPress={() => {}}>
        <Text style={MainPagestyle.ButtonOptionsText}>Hey There</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MusicPlayerPage;
