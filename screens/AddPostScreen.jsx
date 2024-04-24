import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import {
  FontAwesome5,
  MaterialIcons,
  Feather,
  AntDesign,
  Entypo,
  Ionicons,
  Fontisto,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

import { useSelector, useDispatch } from "react-redux";
import { swiftNotifySwitch } from "../store/actions/swiftNotifyActions";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";

import { getUserChannels } from "../store/actions/channelActions";
import { createPost } from "../store/actions/timelineActions";

const AddPostScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPostTypeVisible, setModalPostTypeVisible] = useState(false);
  const [isKeyMessage, setIsKeyMessage] = useState("");
  const [currentChannel, setCurrentChannel] = useState("");
  const [contentType, setContentType] = useState("post");

  const channel = useSelector((state) => state.channel);
  const timeline = useSelector((state) => state.timeline);

  useEffect(() => {
    timeline.message
      ? dispatch(swiftNotifySwitch(timeline.message, true))
      : null;
  }, [timeline]);

  const dispatch = useDispatch();

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View>
        <MyText content={"No Update Yet!"} myStyle="text-[#000000]" />
      </View>
    );
  };

  // Key Message Starts
  const [keyMessageFiles, setKeyMessageFiles] = useState([]);
  // Key Message Ends

  const [isDisabled, setIsDisabled] = useState(true);

  const isSubmitDisable =
    "flex justify-center items-center p-1 px-2 rounded-full bg-gray-300 w-full";
  const isSubmitNotDisable =
    "flex justify-center items-center p-1 px-2 rounded-full bg-[#2917FC] w-full";

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmitPost = () => {
    var formData = new FormData();

    formData.append("keyMessageText", isKeyMessage);
    {
      isKeyMessage &&
        keyMessageFiles.forEach((file, index) => {
          formData.append("keyMessageFiles", {
            name: `keyMsg${Date.now()}${index}-${file.name}`,
            uri: file.uri,
            type: `${file.type}/*`,
          });
        });
    }

    console.log("form data", formData);

    dispatch(createPost(formData));
    setIsKeyMessage("");
    setKeyMessageFiles([]);
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

        setKeyMessageFiles((prev) => [arrEl, ...prev]);
      }
    }
  };
  /*********************************************************UPLOAD FUNCTION ENDS************************************************ */
  useEffect(() => {
    keyMessageFiles.length === 0 ? setIsDisabled(true) : setIsDisabled(false);

    isKeyMessage === "" ? setIsDisabled(true) : setIsDisabled(false);
  }, [isKeyMessage]);

  return (
    <SafeAreaView className="flex-1 mt-10 bg-white">
      <StatusBar style="auto" />
      <View className="flex w-full h-full">
        <View className="flex w-full p-2">
          <View className="flex flex-row w-full justify-between items-start mb-5">
            <View className="flex flex-row justify-center items-center">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons
                  name="arrow-u-left-top"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalPostTypeVisible(true)}
                className="ml-2 justify-center items-center flex flex-row"
              >
                <MyText
                  content={"Create a post"}
                  myStyle={"font-bold text-xl ml-1"}
                />
                <View className="ml-2">
                  <AntDesign name="down" size={18} color="black" />
                </View>
              </TouchableOpacity>
            </View>
            <View className="flex justify-center items-center w-[20%]">
              <TouchableOpacity
                className={
                  isDisabled === true ? isSubmitDisable : isSubmitNotDisable
                }
                activeOpacity={0.8}
                onPress={handleSubmit(onSubmitPost)}
                disabled={isDisabled}
              >
                <MyText myStyle="text-sm text-white" content={"Post"} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row">
            <View className="flex justify-center items-center h-10 w-10 rounded-full bg-[#2917FC]">
              <Image
                source={require("../assets/Avatar-19.png")}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <View className="ml-4">
              <MyText content={"Something"} myStyle={"font-bold"} />
              <View className="flex flex-row my-2">
                <View className="flex flex-row justify-center items-center p-1 rounded-lg bg-gray-200">
                  <MyText content={"Public"} myStyle="text-xs mr-2" />
                  <Fontisto name="world" size={12} color="black" />
                </View>
                <View className="flex flex-row justify-center items-center p-1 rounded-lg bg-gray-200 ml-2">
                  <MyText content={"Share to story"} myStyle="text-xs mr-2" />
                  <View className="h-3 w-3 rounded-full bg-white"></View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="mb-14">
          <View className="mb-1 p-1">
            {/* Key Message */}
            <View className="rounded-lg p-2 pb-3 mb-5 bg-white">
              {keyMessageFiles.length > 0 && (
                <View className="flex flex-row justify-start items-center py-1 w-full h-[80px]">
                  {keyMessageFiles.map((image, index) => {
                    return (
                      <View className="w-1/4 h-full mx-[2px]">
                        <Image
                          className="h-full w-full object-cover mb-px"
                          source={{
                            uri: image.uri,
                          }}
                        />
                        <TouchableOpacity
                          onPress={() => alert("iDey work")}
                          activeOpacity={0.8}
                          className="m-1 absolute h-8 w-8 bg-[#2917FC]/50 items-center justify-center p-1 rounded-full"
                        >
                          <AntDesign
                            name="closecircleo"
                            size={20}
                            color="#fff"
                          />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </View>
              )}

              <Controller
                control={control}
                name="keyMessage"
                rules={{ required: false }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <View className="flex-1 w-full">
                    <MyTextInput
                      value={isKeyMessage}
                      onChangeText={(text) => setIsKeyMessage(text)}
                      onBlur={onBlur}
                      placeholder={`Type your message...`}
                      placeholderTextColor={"#c1c1c1"}
                      multiline={true}
                      textAlignVertical="top"
                      numberOfLines={10}
                    />
                  </View>
                )}
              />
              <View className="flex flex-row justify-between items-center self-start ml-2 w-[40%] bottom-[-20px] rounded-full bg-white border border-gray-300 absolute">
                <View className="flex flex-row justify-between items-center p-2 w-2/5">
                  <TouchableOpacity
                    onPress={openImageLibraryKeyMessage}
                    className="flex justify-center items-center rounded-full p-1"
                  >
                    <Feather name="image" size={24} color="#2917FC" />
                  </TouchableOpacity>
                  <TouchableOpacity className="flex justify-center items-center rounded-full p-1">
                    <FontAwesome5 name="smile" size={24} color="#2917FC" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      {modalPostTypeVisible && (
        <TouchableOpacity
          onPress={() => setModalPostTypeVisible(false)}
          className="flex justify-center items-center w-full h-full bg-black/70 absolute"
        >
          <View className="flex justify-evenly items-center h-[250px] w-[200px] bg-white rounded-lg p-3">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => [
                setContentType("post"),
                setModalPostTypeVisible(false),
              ]}
              className="bg-[#000000] w-full rounded-md p-4 flex justify-center items-center"
            >
              <MyText content={"Post"} myStyle={"text-xl text-white"} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => [
                setContentType("reel"),
                setModalPostTypeVisible(false),
                navigation.navigate("AddReel"),
              ]}
              className="bg-[#000000] w-full rounded-md p-4 flex justify-center items-center"
            >
              <MyText content={"Reel"} myStyle={"text-xl text-white"} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => alert("Going to live screen")}
              className="bg-[#000000] w-full rounded-md p-4 flex justify-center items-center"
            >
              <MyText content={"Live"} myStyle={"text-xl text-white"} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textAreaContainer: {
    borderColor: "#000000",
    borderWidth: 1,
    padding: 5,
  },
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
});

export default AddPostScreen;
