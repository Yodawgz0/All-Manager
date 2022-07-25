import { StyleSheet } from "react-native";

export const FirstPagestyle = StyleSheet.create({
  mainSheetStyle: {
    paddingTop: "15%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontSize: 30,
    fontFamily: "cherry-swash",
  },
  back_image: {
    width: "100%", // applied to Image
    height: "100%",
  },

  Componenets: {
    display: "flex",
    justifyContent: "space-around",
  },
  TextInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "white",
    marginTop: 180,
    marginLeft: "25%",
    marginRight: "25%",
  },
  FirstPageButtonGetData: {
    alignItems: "center",
    backgroundColor: "#1f3d7a",
    padding: 20,
    borderRadius: 25,
    marginTop: "78%",
    marginRight: 220,
    marginLeft: 30,
  },
  FirstPageButton: {
    alignItems: "center",
    backgroundColor: "#190979",
    padding: 20,
    borderRadius: 25,
    marginLeft: "30%",
    marginRight: "30%",
  },
  FirstPageButtonText: {
    color: "pink",
  },
});
