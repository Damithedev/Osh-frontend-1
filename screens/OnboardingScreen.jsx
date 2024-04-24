import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  EvilIcons,
} from "@expo/vector-icons";
import { primaryColor, secondaryColor } from "../components/CommonStyle";
import MyText from "../components/MyText";

const OnboardingScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen bg-white p-5">
      <StatusBar style="auto" />
      <Image
        resizeMode="contain"
        className="h-2/4"
        source={require("../assets/onboard.jpg")}
      />
      <MyText
        content="Welcome"
        myStyle="text-black font-bold text-center text-2xl mb-5"
      />
      <MyText
        content="Find and connect with friends already on Oosh"
        myStyle="text-black font-bold text-center text-xl mb-10"
      />
      <View className="flex flex-row justify-evenly items-center w-full h-14">
        <TouchableOpacity
          onPress={() => navigation.navigate("SignIn")}
          activeOpacity={0.5}
          className="flex justify-center items-center w-2/5 h-full border-[#2917FC] border-2 rounded-lg"
        >
          <MyText
            content="Log in"
            myStyle="text-[#2917FC] font-bold text-justify text-base"
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          activeOpacity={0.5}
          className="flex justify-center items-center w-2/5 h-full bg-[#2917FC] rounded-lg"
        >
          <MyText
            content="Register"
            myStyle="text-white font-bold text-justify text-base"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;
