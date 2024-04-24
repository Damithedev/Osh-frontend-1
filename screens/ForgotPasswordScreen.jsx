import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  Ionicons,
  Octicons,
} from "@expo/vector-icons";
import { primaryColor, secondaryColor } from "../components/CommonStyle";
import { useForm, Controller } from "react-hook-form";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";

const MAX_STEPS = 4;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}`~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;

const ForgotPasswordScreen = ({ navigation }) => {
  const [step, setStep] = useState("email");
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
  console.log("st", step);

  const onForgotPasswordPress = (data) => {
    const { firstname, lastname, username, email, phone, password } = data;
    var renderData = {
      firstname,
      lastname,
      username,
      gender: gendervalue,
      email,
      phone,
      password,
    };
  };

  const renderButton = () => {
    if (step === "email") {
      return (
        <TouchableOpacity
          onPress={() => setStep("code")}
          activeOpacity={0.5}
          className="flex justify-center items-center w-full h-14 bg-[#2917FC] rounded-full mt-10"
        >
          <MyText
            content="Submit"
            myStyle="text-white font-bold text-justify text-base"
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => alert("Password changed")}
          activeOpacity={0.5}
          className="flex justify-center items-center w-full h-14 bg-[#2917FC] rounded-full mt-10"
        >
          <MyText
            content="Verify Account"
            myStyle="text-white font-bold text-justify text-base"
          />
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen bg-white p-5">
      <StatusBar style="auto" />
      <View className="absolute top-10 w-full justify-center items-start">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={30} color="#380181" />
        </TouchableOpacity>
      </View>
      <View className="flex w-full mb-10">
        <MyText
          content="Forgot Password?"
          myStyle="text-[#2917FC] font-bold text-justify text-3xl mb-5 w-1/2"
        />
        <View className="flex flex-row flex-wrap justify-start items-center w-full">
          <MyText
            content="Don't worry! it happens. Please enter the address associated with your account."
            myStyle="text-[#000000] font-bold text-justify text-sm mb-5"
          />
        </View>
      </View>

      <View className="flex flex-col justify-center items-center w-full">
        {step === "email" && (
          <View>
            <Controller
              control={control}
              name="email"
              rules={{
                required: "E-mail is required",
                pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full">
                    <View>
                      <Entypo name="email" size={16} color="#333333" />
                    </View>
                    <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                      <MyTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Email ID"
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
        )}
        {step === "code" && (
          <View>
            <Controller
              control={control}
              name="code"
              rules={{
                required: "E-mail is required",
                pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
              }}
              render={({
                field: { value, onChange, onBlur },
                fieldState: { error },
              }) => (
                <>
                  <View className="flex flex-row justify-center items-center w-full">
                    <View>
                      <Octicons name="number" size={16} color="#333333" />
                      {/* <Entypo name="email" size={16} color="#333333" /> */}
                    </View>
                    <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                      <MyTextInput
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholder="Enter code sent to your email here"
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
        )}
        {renderButton()}
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;
