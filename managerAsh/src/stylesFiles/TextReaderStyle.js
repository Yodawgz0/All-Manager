import { StyleSheet } from "react-native";

export const TextReaderStyle = StyleSheet.create({
  back_image: {
    height: "100%",
  },
  cameraButton: {
    width: 70,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 70,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: "grey",
    marginBottom: 20,
  },
  ButtonOptionsText: {
    color: "pink",
    fontSize: 20,
    fontFamily: "CherrySwash_400Regular",
  },
  cameraContainer: {
    flex: 0.7,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  preview: {
    alignSelf: "stretch",
    flex: 1,
  },
});
