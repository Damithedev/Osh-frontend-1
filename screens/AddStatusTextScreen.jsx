import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  EvilIcons,
} from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { swiftNotifySwitch } from "../store/actions/swiftNotifyActions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../store/api";
import axios from "axios";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";

const AddStatusTextScreen = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmitStatus = () => {
    var formData = new FormData();

    formData.append("caption", description);

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

    setDescription("");
  };

  // useEffect(() => {
  //   timeline.message
  //     ? dispatch(swiftNotifySwitch(timeline.message, true))
  //     : null;
  // }, [timeline]);

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen bg-[#3B7CDD]">
      <View className="flex flex-row justify-center items-end p-2 bg-black/60 w-full h-[100px] absolute top-0">
        {description && (
          <TouchableOpacity
            onPress={onSubmitStatus}
            className="rounded-lg border-white border p-[5px] px-[10px]"
          >
            <MyText content={"post"} myStyle={"text-white"} />
          </TouchableOpacity>
        )}
      </View>
      <StatusBar style="light" />
      {description == "" && (
        <MyText
          content="Type a status"
          myStyle="text-white text-2xl font-bold"
        />
      )}
      <View className="absolute flex justify-center items-center h-1/2 w-full">
        <Controller
          control={control}
          name="description"
          rules={{ required: false }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <View className="flex justify-center items-center h-full w-full">
              <MyTextInput
                value={description}
                onChangeText={(text) => setDescription(text)}
                onBlur={onBlur}
                autoFocus={true}
                // placeholder={`Type your message...`}
                placeholderTextColor={"#c1c1c1"}
                multiline={true}
                textAlignVertical="top"
                className="text-white text-2xl font-bold text-center"
                // numberOfLines={10}
              />
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddStatusTextScreen;
