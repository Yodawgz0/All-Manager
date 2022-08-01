import {
  TouchableOpacity,
  View,
  ImageBackground,
  Image,
  Button,
  Modal,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { TextReaderStyle } from "../stylesFiles/TextReaderStyle";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { shareAsync } from "expo-sharing";
import { MaterialIcons } from "@expo/vector-icons";
import dataStore from "../../dataStore.json";

const TextReaderScreen = (props) => {
  const [hasCameraPermissions, onHasCameraPermissions] = useState();
  const [hasMediaPermissions, onHasMediaPermissions] = useState();
  const [photo, setPhoto] = useState();
  const [cameraType, setcameraType] = useState(CameraType.back);
  let cameraRef = useRef();

  useEffect(() => {
    if (hasCameraPermissions == undefined || hasMediaPermissions == undefined) {
      //return <Text>Requesting Permission...</Text>;
    } else if (!hasCameraPermissions || !hasMediaPermissions) {
      //return <Text>Please enable the permission</Text>;
    }
  }, [photo, hasCameraPermissions, hasMediaPermissions]);

  const flipCamera = () => {
    if (cameraType == "back") {
      setcameraType(CameraType.front);
    } else {
      setcameraType(CameraType.back);
    }
  };

  let takePic = async () => {
    const cameraPermissions = await Camera.requestCameraPermissionsAsync();

    const mediaPermissions = await MediaLibrary.requestPermissionsAsync();
    onHasCameraPermissions(cameraPermissions.status == "granted");
    onHasMediaPermissions(mediaPermissions.status == "granted");

    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    setPhoto(newPhoto);
  };
  let sharePic = () => {
    shareAsync(photo.uri).then(() => {
      setPhoto(undefined);
    });
  };

  let savePhoto = () => {
    MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
      setPhoto(undefined);
    });
  };

  async function sendPicProcess() {
    console.log("hello");
    await fetch(dataStore.mainData.IPAddr, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ photo: photo.base64 }),
    })
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res);
        //onvalidateResp(res.TEXT);
        //onvalidateResp("");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View>
      <ImageBackground
        source={require("../../assets/TextReader_back.jpg")}
        style={TextReaderStyle.back_image}
        resizeMode="cover"
      >
        <Camera
          style={TextReaderStyle.cameraContainer}
          ref={cameraRef}
          type={cameraType}
        >
          <TouchableOpacity
            style={TextReaderStyle.cameraButton}
            onPress={() => takePic()}
          ></TouchableOpacity>
          <TouchableOpacity
            style={TextReaderStyle.cameraFlip}
            onPress={() => flipCamera()}
          >
            <MaterialIcons name="flip-camera-ios" size={34} color="white" />
          </TouchableOpacity>
        </Camera>
        {photo != undefined ? (
          <Modal style={TextReaderStyle.Modalpreview} animationType="slide">
            <Image
              style={TextReaderStyle.preview}
              source={{ uri: "data:image/jpg;base64," + photo.base64 }}
            />
            <Button title="Share" onPress={sharePic} />
            {hasMediaPermissions ? (
              <Button
                title="Save"
                onPress={() => {
                  savePhoto();
                  sendPicProcess();
                }}
              />
            ) : undefined}
            <Button title="Discard" onPress={() => setPhoto(undefined)} />
          </Modal>
        ) : null}
      </ImageBackground>
    </View>
  );
};

export default TextReaderScreen;
