import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  EvilIcons,
} from "@expo/vector-icons";

import MyText from "../components/MyText";

const EarnScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen bg-white p-1">
      <StatusBar style="auto" />
      <View className="flex justify-start items-center h-full w-full mt-14 p-1">
        <View className="flex flex-row w-full justify-between items-start mb-5">
          <View className="flex flex-row justify-center items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="arrow-u-left-top"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <MyText
              content={"Share-n-Earn"}
              myStyle={"font-bold text-xl ml-1"}
            />
          </View>
        </View>
        <ScrollView className="w-full p-1">
          <MyText
            content={
              "Please select what you want to do with Share-n-Earn today."
            }
            myStyle={"text-sm text-black"}
          />

          <View className="flex w-full mt-4">
            <MyText
              content={"For advertisers"}
              myStyle={"text-sm text-black font-bold"}
            />
            <MyText
              content={
                "Get people to post your Advers on their Social Media handles."
              }
              myStyle={"text-lg text-black font-bold my-2"}
            />

            <MyText
              content={
                "Get people with atleast 1,000 followers to post your adverts and perform social engagement tasks for you on their social media accounts."
              }
              myStyle={"text-sm text-black"}
            />
            <TouchableOpacity
              // onPress={goToNextStep}
              activeOpacity={0.5}
              className="flex justify-center items-center w-full h-14 bg-[#2917FC] rounded-lg my-4"
            >
              <MyText
                content="Get started"
                myStyle="text-white font-bold text-justify text-base"
              />
            </TouchableOpacity>
          </View>

          <View className="flex w-full my-8">
            <MyText
              content={"For Earners"}
              myStyle={"text-sm text-black font-bold"}
            />
            <MyText
              content={
                "Get people to post your Advers on their Social Media handles."
              }
              myStyle={"text-lg text-black font-bold my-2"}
            />

            <MyText
              content={
                "Get people with atleast 1,000 followers to post your adverts and perform social engagement tasks for you on their social media accounts."
              }
              myStyle={"text-sm text-black"}
            />
            <TouchableOpacity
              // onPress={goToNextStep}
              activeOpacity={0.5}
              className="flex justify-center items-center w-full h-14 bg-[#2917FC] rounded-lg my-4"
            >
              <MyText
                content="Become a member"
                myStyle="text-white font-bold text-justify text-base"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EarnScreen;
