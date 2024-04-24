import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";

const EditProfileScreen = ({ navigation }) => {
  const [gendervalue, setGenderValue] = useState("");
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

  const renderButton = () => {
    return (
      <TouchableOpacity
        onPress={() => alert("I dey work")}
        activeOpacity={0.5}
        className="flex justify-center items-center w-full h-14 bg-[#380181] rounded-lg mt-5"
      >
        <MyText
          content="Update"
          myStyle="text-white font-bold text-justify text-base"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex justify-center items-center mb-12 p-5 h-full">
          <TouchableOpacity
            onPress={() => alert("I dey work buddy")}
            className="flex justify-center items-center w-20 h-20 rounded-full border-2 border-dotted border-[#380181] bg-[#E8EDF1]"
          >
            <Image
              source={require("../assets/Avatar-19.png")}
              style={{ width: 60, height: 60 }}
            />
            <View className="bg-[#380181] p-1 rounded-full absolute bottom-0 right-0">
              <AntDesign name="edit" size={15} color="white" />
            </View>
          </TouchableOpacity>
          <View>
            <Controller
              control={control}
              name="displayName"
              rules={{ required: "Full name is required" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full mt-8">
                    <View>
                      <FontAwesome name="user" size={16} color="#333333" />
                    </View>
                    <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                      <MyTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Display Name"
                        className="w-full"
                      />
                    </View>
                  </View>
                  {error && (
                    <View className="flex-none justify-center items-center">
                      <MaterialIcons
                        name="error-outline"
                        size={24}
                        color="red"
                      />
                    </View>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="phoneNumber"
              rules={{ required: "Phone number is required" }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full mt-8">
                    <View>
                      <FontAwesome name="phone" size={16} color="#333333" />
                    </View>
                    <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                      <MyTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Phone Number"
                        className="w-full"
                        keyboardType="numeric"
                      />
                    </View>
                  </View>
                  {error && (
                    <View className="flex-none justify-center items-center">
                      <MaterialIcons
                        name="error-outline"
                        size={24}
                        color="red"
                      />
                    </View>
                  )}
                </>
              )}
            />
            <Controller
              control={control}
              name="birthday"
              // rules={{required: "Full name is required"}}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full mt-8">
                    <View>
                      <FontAwesome
                        name="birthday-cake"
                        size={16}
                        color="#333333"
                      />
                    </View>
                    <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                      <MyTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Birthday"
                        className="w-full"
                      />
                    </View>
                  </View>
                  {error && (
                    <View className="flex-none justify-center items-center">
                      <MaterialIcons
                        name="error-outline"
                        size={24}
                        color="red"
                      />
                    </View>
                  )}
                </>
              )}
            />
            <View>
              <Controller
                control={control}
                name="gender"
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <>
                    <View className="flex flex-row justify-center items-center w-full mt-8">
                      <View>
                        <MaterialCommunityIcons
                          name="human"
                          size={20}
                          color="#333333"
                        />
                      </View>
                      <View className="flex-1 flex-row justify-center items-center border-b ml-3 border-b-[#C1C1C1]">
                        <View className="flex w-2/5">
                          <MyTextInput
                            value={gendervalue}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder="Gender"
                            className="w-full"
                            readOnly="true"
                          />
                        </View>
                        <View className="flex flex-row justify-between items-center w-3/5 h-7 mb-2 rounded-lg">
                          <TouchableOpacity
                            onPress={() => setGenderValue("male")}
                            className="flex flex-row justify-center items-center h-full w-1/2 mr-1 bg-[#E8EDF1] rounded-lg"
                          >
                            <View
                              className={
                                gendervalue === "male"
                                  ? selectedCategoryStyle
                                  : commonCategoryStyle
                              }
                            ></View>
                            <MyText
                              content="Male"
                              myStyle="text-center font-semibold text-sm"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => setGenderValue("female")}
                            className="flex flex-row justify-center items-center h-full w-1/2 bg-[#E8EDF1] rounded-lg"
                          >
                            <View
                              className={
                                gendervalue === "female"
                                  ? selectedCategoryStyle
                                  : commonCategoryStyle
                              }
                            ></View>
                            <MyText
                              content="Female"
                              myStyle="text-center font-semibold text-sm"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </>
                )}
              />
              <Controller
                control={control}
                name="biography"
                // rules={{required: "Phone number is required"}}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <>
                    <View className="flex flex-row justify-center items-center w-full mt-8">
                      <View>
                        <MaterialCommunityIcons
                          name="bio"
                          size={24}
                          color="black"
                        />
                      </View>
                      <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                        <MyTextInput
                          value={value}
                          onChangeText={onChange}
                          onBlur={onBlur}
                          placeholder="Biography"
                          className="w-full"
                        />
                      </View>
                    </View>
                    {error && (
                      <View className="flex-none justify-center items-center">
                        <MaterialIcons
                          name="error-outline"
                          size={24}
                          color="red"
                        />
                      </View>
                    )}
                  </>
                )}
              />
            </View>
          </View>
          {renderButton()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfileScreen;
