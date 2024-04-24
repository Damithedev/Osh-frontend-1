import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { signIn } from "../store/actions/authActions";
import { swiftNotifySwitch } from "../store/actions/swiftNotifyActions";
import Indicator from "../components/Indicator";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";

const SignInScreen = ({ navigation }) => {
  const [secureEntryText, setSecureEntryText] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const auth = useSelector((state) => state.auth);
  // console.log("auth signin", auth);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  // useEffect(() => {
  //   console.log("auth", auth);
  // }, []);

  const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}`~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;

  const handleSecureEntryText = () => {
    setSecureEntryText(!secureEntryText);
  };
  const dispatch = useDispatch();

  const onSignInPress = (data) => {
    const { input, password } = data;
    const newInput = input.toLowerCase();
    var renderData = {
      input: newInput,
      password: password,
    };
    dispatch(signIn(renderData));
    setIsLoading(true);
    console.log("is loading", isLoading);
  };

  useEffect(() => {
    auth.message == "You are not yet verified!"
      ? navigation.navigate("Verify")
      : null;
    auth.message == "Login successful."
      ? [setIsLoading(false), navigation.navigate("Main")]
      : null;
    auth.message
      ? [setIsLoading(false), dispatch(swiftNotifySwitch(auth.message, true))]
      : null;
  }, [auth]);

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen bg-white p-5">
      <StatusBar style="auto" backgroundColor="white" />
      <View className="flex w-full">
        <MyText
          content="Login"
          myStyle="text-[#2917FC] font-bold text-justify text-3xl mb-10"
        />
      </View>

      <View className="flex flex-col justify-center items-center w-full">
        <Controller
          control={control}
          name="input"
          rules={{
            required: "Email ID or username is required",
            // pattern: { value: EMAIL_REGEX, message: "Email is invalid" },
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
                    placeholder="Email ID or username"
                    className="w-full"
                  />
                </View>
              </View>
              {error && (
                <View className="flex flex-row justify-center items-center my-2">
                  <MaterialIcons name="error-outline" size={16} color="red" />
                  <MyText
                    content={error.message}
                    myStyle="text-[#180181] font-bold text-justify text-xs ml-2"
                  />
                </View>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{ required: "Password is required" }}
          render={({
            field: { value, onChange, onBlur },
            fieldState: { error },
          }) => (
            <>
              <View className="flex flex-row justify-center items-center w-full mt-8">
                <View>
                  <Entypo name="lock" size={16} color="#333333" />
                </View>
                <View className="flex-1 flex-row border-b ml-3 border-b-[#C1C1C1] w-full pr-4">
                  <View className="w-full">
                    <MyTextInput
                      secureTextEntry={secureEntryText}
                      placeholder="Password"
                      className="w-full"
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={handleSecureEntryText}
                    className="flex justify-center items-center w-8 h-8"
                  >
                    {secureEntryText ? (
                      <Ionicons name="eye" size={20} color="#333333" />
                    ) : (
                      <Ionicons name="eye-off" size={20} color="#333333" />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              {error && (
                <View className="flex flex-row justify-center items-center my-2">
                  <MaterialIcons name="error-outline" size={16} color="red" />
                  <MyText
                    content={error.message}
                    myStyle="text-[#180181] font-bold text-justify text-xs ml-2"
                  />
                </View>
              )}
            </>
          )}
        />
        <View className="flex flex-row justify-center items-center w-full mt-8">
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <MyText
              content="Forgot Password?"
              myStyle="text-[#2917FC] font-bold text-justify text-sm mb-5"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSignInPress)}
          activeOpacity={0.5}
          className="flex justify-center items-center w-full h-14 bg-[#2917FC] rounded-lg"
        >
          <MyText
            content="Login"
            myStyle="text-white font-bold text-justify text-base"
          />
        </TouchableOpacity>
        <View className="flex w-full justify-center items-center my-5">
          <View className="w-full h-1 bg-white border-b border-b-[#C1C1C1]"></View>
          <View className="absolute flex justify-center items-center h-10 w-2/3 bg-white rounded-full">
            <MyText
              content="or connect with"
              myStyle="text-black font-bold text-justify text-sm"
            />
          </View>
        </View>
        <View className="flex flex-row w-full justify-between p-5 items-center">
          <TouchableOpacity
            onPress={() => alert("It works")}
            activeOpacity={0.5}
            className="flex flex-row justify-center items-center w-14 h-14 bg-blue-500 rounded-full"
          >
            <Image
              resizeMode="contain"
              className="h-6 w-6"
              source={require("../assets/fwhite.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("It works")}
            activeOpacity={0.5}
            className="flex flex-row justify-center items-center w-14 h-14 bg-red-400 rounded-full"
          >
            <Image
              resizeMode="contain"
              className="h-6 w-6"
              source={require("../assets/gwhite.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert("It works")}
            activeOpacity={0.5}
            className="flex flex-row justify-center items-center w-14 h-14 bg-[#87CEEB] rounded-full"
          >
            <Image
              resizeMode="contain"
              className="h-6 w-6"
              source={require("../assets/twhite.png")}
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-center items-center w-full">
          <MyText
            content="New here? "
            myStyle="text-[#C1C1C1] font-bold text-justify text-sm"
          />
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            activeOpacity={0.5}
          >
            <MyText
              content="Register"
              myStyle="text-[#2917FC] font-bold text-justify text-sm"
            />
          </TouchableOpacity>
        </View>
        {isLoading && <Indicator color="#18840D" />}
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
