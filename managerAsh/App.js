import React from "react";
import FirstPage from "./src/screens/FirstPage";
import MainPage from "./src/screens/MainPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LoginPage"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="LoginPage" component={FirstPage} />
        <Stack.Screen name="mainPage" component={MainPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
