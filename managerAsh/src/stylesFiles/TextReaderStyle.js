import { StyleSheet } from "react-native";

export const TextReaderStyle = StyleSheet.create({
  back_image: {
    height: "100%",
  },
  cameraButton: {
    width: 70,
    backgroundColor: "white",
    flexDirection: "row",
    height: 70,
    borderRadius: 100,
    borderWidth: 8,
    borderColor: "grey",
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
    flex: 0.5,
    alignItems: "center",
    backgroundColor: "blue",
    margin: 0,
  },
  Modalpreview: {
    marginTop: 10,
  },
  cameraFlip: {
    marginLeft: "70%",
    marginBottom: "5%",
  },
});
