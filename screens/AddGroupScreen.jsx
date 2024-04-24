import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import * as ImagePicker from "expo-image-picker";

import { getFacets } from "../store/actions/facetActions";
import { useDispatch, useSelector } from "react-redux";
import { createChannel } from "../store/actions/channelActions";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";
import { createGroup } from "../store/actions/groupActions";

const AddGroupScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [facetValue, setFacetValue] = useState("");
  const [facetId, setFacetId] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupAvatar, setGroupAvatar] = useState({});
  const facets = useSelector((state) => state.facet);

  const commonCategoryStyle = "h-3 w-3 rounded-full bg-white mr-3";
  const selectedCategoryStyle = "h-3 w-3 rounded-full bg-[#380181] mr-3";
  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const dispatch = useDispatch();

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View>
        <MyText content={"No Update Yet!"} myStyle={{ color: "#05375a" }} />
      </View>
    );
  };

  const onPressSubmit = () => {
    var formData = new FormData();

    formData.append("name", groupName);
    formData.append("description", descriptionValue);
    formData.append("groupAvatar", {
      name: `groupAvatar${Date.now()}-${groupAvatar.name}`,
      uri: groupAvatar.uri,
      type: `${groupAvatar.type}/*`,
    });

    console.log("form data", formData);

    dispatch(createGroup(formData));
    setGroupAvatar({});
    setGroupName("");
    setDescriptionValue("");
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

        console.log("image", arrEl);
        setGroupAvatar(arrEl);
      }
    }
  };
  /*********************************************************UPLOAD FUNCTION ENDS************************************************ */

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      <View className="flex justify-center items-center mb-12 p-5 h-full">
        <TouchableOpacity
          onPress={openImageLibraryKeyMessage}
          className="flex justify-center items-center w-20 h-20 rounded-full border-2 border-dotted border-[#380181] bg-[#E8EDF1]"
        >
          <Image
            source={
              groupAvatar?.uri
                ? { uri: groupAvatar.uri }
                : require("../assets/Avatar-19.png")
            }
            className="w-full h-full rounded-full"
            // style={{ width: 60, height: 60 }}
          />
          <View className="bg-[#380181] p-1 rounded-full absolute bottom-0 right-0">
            <AntDesign name="edit" size={15} color="white" />
          </View>
        </TouchableOpacity>
        <View>
          <Controller
            control={control}
            name="group"
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <View className="flex flex-row justify-center items-center w-full mt-8">
                  <View>
                    <Entypo name="network" size={18} color="#333333" />
                  </View>
                  <View className="flex-1 flex-row justify-center items-center border-b ml-3 border-b-[#C1C1C1]">
                    <View className="flex w-full">
                      <MyTextInput
                        value={groupName}
                        onChangeText={(text) => setGroupName(text)}
                        onBlur={onBlur}
                        placeholder="Group name"
                        className="w-full"
                        readOnly="true"
                      />
                    </View>
                  </View>
                </View>
              </>
            )}
          />
          <Controller
            control={control}
            name="description"
            rules={{ required: "Description is required" }}
            render={({
              field: { value, onChange, onBlur },
              fieldState: { error },
            }) => (
              <>
                <View className="flex flex-row justify-center items-center w-full mt-8">
                  <View>
                    <MaterialCommunityIcons
                      name="bio"
                      size={20}
                      color="#333333"
                    />
                  </View>
                  <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                    <MyTextInput
                      value={descriptionValue}
                      onChangeText={(text) => setDescriptionValue(text)}
                      onBlur={onBlur}
                      placeholder="Description"
                      className="w-full"
                    />
                  </View>
                </View>
                {error && (
                  <View className="flex-none justify-center items-center">
                    <MaterialIcons name="error-outline" size={24} color="red" />
                  </View>
                )}
              </>
            )}
          />
        </View>
        <TouchableOpacity
          onPress={() => onPressSubmit()}
          activeOpacity={0.5}
          className="flex justify-center items-center w-full h-14 bg-[#380181] rounded-full mt-5"
        >
          <MyText
            content="Create group"
            myStyle="text-white font-bold text-justify text-base"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddGroupScreen;
