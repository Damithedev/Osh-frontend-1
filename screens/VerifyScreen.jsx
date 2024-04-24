import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Entypo, Octicons, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { primaryColor, secondaryColor } from "../components/CommonStyle";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { swiftNotifySwitch } from "../store/actions/swiftNotifyActions";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";

import { verifyAccount } from "../store/actions/authActions";

const MAX_STEPS = 4;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}`~-]+@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9-]+)*$/;

const isSubmitDisable =
  "flex justify-center items-center p-1 px-2 rounded-full bg-gray-300 w-full h-14 mt-10";
const isSubmitNotDisable =
  "flex justify-center items-center p-1 px-2 rounded-full bg-[#2917FC] w-full h-14 mt-10";

const VerifyScreen = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.message == "User successfully verified"
      ? navigation.navigate("SignIn")
      : null;
    auth.message ? dispatch(swiftNotifySwitch(auth.message, true)) : null;
  }, [auth]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    otp: "",
  });

  const onVerifyPress = () => {
    console.log("ren verify", otp);
    dispatch(verifyAccount(otp));
  };

  useEffect(() => {
    otp.length == 6 ? setIsDisabled(false) : setIsDisabled(true);
  }, [otp]);

  const renderButton = () => {
    return (
      <TouchableOpacity
        onPress={onVerifyPress}
        activeOpacity={0.5}
        disabled={isDisabled}
        className={isDisabled ? isSubmitDisable : isSubmitNotDisable}
        // className="flex justify-center items-center w-full h-14 bg-[#380181] rounded-lg mt-10"
      >
        <MyText
          content="Submit"
          myStyle="text-white font-bold text-justify text-base"
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen bg-white p-5">
      <StatusBar style="auto" />
      <View className="absolute top-10 w-full justify-center items-start">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-circle" size={30} color="#380181" />
        </TouchableOpacity>
      </View>
      <Image
        resizeMode="contain"
        className="h-1/4 my-5"
        source={require("../assets/register.png")}
      />
      <View className="flex w-full mb-10">
        <MyText
          content="Enter OTP"
          myStyle="text-[#380181] font-bold text-justify text-3xl mb-5"
        />
        <View className="flex flex-row flex-wrap justify-start items-center w-full">
          <MyText
            content="A 6 digits code has been sent to your e-mail address."
            myStyle="text-[#C1C1C1] font-bold text-justify text-xs"
          />
        </View>
      </View>

      <View className="flex flex-col justify-center items-center w-full">
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
                    <Octicons name="number" size={16} color="#333333" />
                  </View>
                  <View className="flex-1 border-b ml-3 border-b-[#C1C1C1]">
                    <MyTextInput
                      value={otp}
                      onChangeText={(text) => setOtp(text)}
                      onBlur={onBlur}
                      placeholder="Verification code"
                      className="w-full"
                      keyboardType="numeric"
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
          <TouchableOpacity activeOpacity={0.5}>
            <MyText content={"Resend OTP"} myStyle="text-blue-700 mt-2" />
          </TouchableOpacity>
        </View>
        {renderButton()}
      </View>
    </SafeAreaView>
  );
};

export default VerifyScreen;
