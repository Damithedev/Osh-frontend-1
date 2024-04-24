import React, { useRef, useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Video } from "expo-av";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Modal,
  StatusBar,
  Dimensions,
} from "react-native";
import MyText from "../components/MyText";
import { createStatus } from "../store/actions/singleStatusAction";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import MyTextInput from "../components/MyTextInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../store/api";
import axios from "axios";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const AddStatusMediaScreen = () => {
  const profile = useSelector((state) => state.profile);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [image, setImage] = useState();
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [seconds, setSeconds] = useState(0); // Initial countdown time in seconds
  const [modalVisible, setModalVisible] = useState(false);
  const [media, setMedia] = useState(null);
  const videoRef = useRef(null);
  const [cameraMode, setCameraMode] = useState("Photo");
  const [isPlaying, setIsPlaying] = useState(false);
  const [description, setDescription] = useState("");
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    media ? setModalVisible(true) : setModalVisible(false);
  }, [media]);

  useEffect(() => {
    let intervalId;

    if (isRecording) {
      // Start the timer when recording begins
      intervalId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      // Stop the timer when recording ends
      clearInterval(intervalId);
    }

    // Clean up the interval when the component unmounts or recording ends
    return () => clearInterval(intervalId);
  }, [isRecording]);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const ext = photo.uri.split(".").pop();
      const arrEl = {
        uri: photo.uri,
        name: `file.${ext}`,
        type: "image",
      };
      setMedia(arrEl);
      // Handle the taken picture (e.g., save it, display it, etc.)
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const dispatch = useDispatch();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const onSubmitStatus = () => {
    var formData = new FormData();

    formData.append("caption", description);
    formData.append("files", {
      name: `${profile?.data?.data?.username}${Date.now()}-${media.name}`,
      uri: media.uri,
      type: `${media.type}/*`,
    });

    console.log("form data", formData);

    const sendData = async () => {
      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
          Authorization: token,
        },
      };
      axios
        .post(`${url}status`, formData, config)
        .then((response) => {
          console.log("send status", response.data);
        })
        .catch((error) => {
          console.log("err", error);
        });
    };
    sendData();
    // dispatch(createReelPost(formData));
    setDescription("");
    setMedia("");
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  /*********************************************************UPLOAD FUNCTION START************************************************ */
  const openImageLibraryKeyMessage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
      });

      if (!response.cancelled) {
        const ext = response.uri.split(".").pop();
        const arrEl = {
          uri: response.uri,
          name: `file.${ext}`,
          type: response.type,
        };

        setMedia(arrEl);
      }
    }
  };
  /*********************************************************UPLOAD FUNCTION ENDS************************************************ */
  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const { uri } = await cameraRef.current.recordAsync();
        const ext = uri.split(".").pop();
        const arrEl = {
          uri: uri,
          name: `file.${ext}`,
          type: "video",
        };
        setMedia(arrEl);
      } catch (error) {
        console.error("Error starting recording:", error);
      }
    }
  };

  const stopRecording = async () => {
    if (cameraRef.current) {
      try {
        await cameraRef.current.stopRecording();
        setIsRecording(false);
        setSeconds(0);
        // Save the recorded video to the device's media library
        // const asset = await MediaLibrary.createAssetAsync(uri);
        // console.log("Video saved to media library:", asset);
      } catch (error) {
        console.error("Error stopping recording:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} backgroundColor={"#00000050"} />
      <Camera
        style={styles.camera}
        type={type}
        ref={(ref) => (cameraRef.current = ref)}
      >
        <View className="flex flex-col justify-center items-center  w-full absolute bottom-0 pb-4 bg-black/50">
          <View className="flex flex-row mb-1 justify-center items-center">
            <TouchableOpacity
              onPress={() => setCameraMode("Photo")}
              className="flex justify-center items-center"
            >
              <MyText
                content={"Photo"}
                myStyle={"p-1 rounded-full text-white"}
              />
              <View
                className={`w-4 h-1 ${
                  cameraMode == "Photo" ? "bg-white" : null
                } rounded-full`}
              ></View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCameraMode("Video")}
              className="flex justify-center items-center"
            >
              <MyText
                content={"Video"}
                myStyle={"p-1 rounded-full text-white"}
              />
              <View
                className={`w-4 h-1 ${
                  cameraMode == "Video" ? "bg-white" : null
                } rounded-full`}
              ></View>
            </TouchableOpacity>
          </View>
          {cameraMode == "Video" && (
            <View className="flex justify-center items-center my-1 w-full">
              <MyText
                content={`${seconds} secs`}
                myStyle={"p-[4px] py-[2px] rounded-full bg-black text-white"}
              />
            </View>
          )}
          <View className="flex flex-row justify-evenly items-center w-full">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={toggleCameraType}
              className="flex justify-center items-center rounded-full p-2 bg-black/50"
            >
              <MaterialIcons
                name="flip-camera-android"
                size={24}
                color="white"
              />
            </TouchableOpacity>
            {cameraMode == "Video" ? (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={isRecording ? stopRecording : startRecording}
                className="flex justify-center items-center p-1 border-2 border-black rounded-full h-16 w-16"
              >
                {!isRecording ? (
                  <View className="h-full w-full bg-red-800 rounded-full"></View>
                ) : (
                  <View className="h-8 w-8 bg-red-800 rounded-sm"></View>
                )}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={takePicture}
                className="flex justify-center items-center p-1 border-2 border-black rounded-full h-16 w-16"
              >
                <View className="h-full w-full bg-red-800 rounded-full"></View>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={openImageLibraryKeyMessage}
              className="flex justify-center items-center h-10 w-10 rounded-full"
            >
              <Image
                source={require("../assets/galleryicon.png")}
                style={{ width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="flex flex-col justify-center items-center w-full bg-black h-full">
          {media?.type == "video" ? (
            <Video
              ref={videoRef}
              source={{ uri: media?.uri }}
              className={"w-full h-full"}
              controls={true}
              resizeMode="cover"
              shouldPlay={true}
              isLooping={true}
            />
          ) : (
            <Image
              style={{
                width: windowWidth,
                height: windowHeight / 2,
                resizeMode: "stretch",
              }}
              source={{ uri: media?.uri }}
            />
          )}
        </View>
        <View className="flex flex-row justify-center items-center p-2 bg-black/60 w-full absolute top-0">
          <TouchableOpacity
            onPress={onSubmitStatus}
            className="rounded-full border-white border p-px px-2"
          >
            <MyText content={"post"} myStyle={"text-white"} />
          </TouchableOpacity>
          <View className="h-4 w-4"></View>
          <TouchableOpacity
            onPress={() => setMedia(null)}
            className="rounded-full border-white border p-px px-2"
          >
            <MyText content={"cancel"} myStyle={"text-white"} />
          </TouchableOpacity>
        </View>

        <View className="flex flex-row justify-center items-center p-2 bg-black/60 w-full h-12 absolute bottom-8">
          <Controller
            control={control}
            name="description"
            rules={{ required: false }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <View className="flex-1 w-full text-white">
                <MyTextInput
                  value={description}
                  onChangeText={(text) => setDescription(text)}
                  onBlur={onBlur}
                  style={{ color: "white" }}
                  placeholder={`Type your caption...`}
                  placeholderTextColor={"#c1c1c1"}
                  multiline={true}
                  textAlignVertical="top"
                  numberOfLines={10}
                />
              </View>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default AddStatusMediaScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  video: {
    width: "100%",
    height: 200,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
  },
});
