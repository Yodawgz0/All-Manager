import { Text, View, FlatList, StyleSheet } from "react-native";
import React from "react";

const FlatListComponent = () => {
  const FlatName = [
    {
      id: "1",
      name: "Ash",
    },
    {
      id: "2",
      name: "Ley",
    },
    {
      id: "3",
      name: "Tenn",
    },
    {
      id: "5",
      name: "Yson",
    },
    {
      id: "6",
      name: "Yson",
    },
  ];
  return (
    <FlatList
      data={FlatName}
      renderItem={({ item }) => {
        return (
          <View>
            <Text style={styles.textStyle}>
              {" "}
              The name that we can see is {item.name}
            </Text>
          </View>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "blue",
  },
});

export default FlatListComponent;
