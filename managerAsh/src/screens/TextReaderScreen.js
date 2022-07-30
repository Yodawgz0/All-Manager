import {
  Text,
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
import TextReaderComponent from "./InbuiltScreens/TextReaderComponent";

const TextReaderScreen = (props) => {
  const [hasCameraPermissions, onHasCameraPermissions] = useState();
  const [hasMediaPermissions, onHasMediaPermissions] = useState();
  const [photo, setPhoto] = useState();
  const [cameraType, setcameraType] = useState(CameraType.back);
  let cameraRef = useRef();
  let AfterImage = false;
  useEffect(() => {
    if (photo) {
      AfterImage = true;
    }
  }, [photo]);

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
    if (hasCameraPermissions == undefined || hasMediaPermissions == undefined) {
      return <Text>Requesting Permission...</Text>;
    } else if (!hasCameraPermissions || !hasMediaPermissions) {
      return <Text>Please enable the permission</Text>;
    }
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
        <Modal visible={AfterImage}>
          <View>
            <Image
              style={TextReaderStyle.preview}
              source={{ uri: "data:image/jpg;base64," }}
            />
            <Button title="Share" onPress={sharePic} />
            {hasMediaPermissions ? (
              <Button title="Save" onPress={savePhoto} />
            ) : undefined}
            <Button title="Discard" onPress={() => setPhoto(undefined)} />
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
};

export default TextReaderScreen;
