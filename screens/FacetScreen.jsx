import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";

const FacetScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen bg-white">
      <StatusBar style="auto" />
      <View className="flex justify-start items-center h-full w-full mt-14">
        <View className="flex flex-row justify-between items-center border-b-gray-200 border-b my-1 w-full p-2">
          <View className="flex flex-row justify-start items-center w-[80%]">
            <Feather name="arrow-up-circle" size={24} color="green" />
            <View className="flex flex-col pl-2">
              <MyText
                content={"Lifestyle"}
                myStyle="text-black font-bold text-sm"
              />
              <View className="flex flex-row justify-center items-end mt-1">
                <Feather name="bar-chart-2" size={20} color="gray" />
                <MyText
                  content={"999K"}
                  myStyle="text-black font-normal text-gray-400 text-sm ml-1"
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => alert("I dey work")}
            className="flex justify-center items-center w-[20%] rounded-full bg-[#380181] p-1"
          >
            <MyText
              content={"Subscribe"}
              myStyle="text-white font-bold text-xs"
            />
          </TouchableOpacity>
        </View>
        <View className="flex flex-row justify-between items-center border-b-gray-200 border-b my-1 w-full p-2">
          <View className="flex flex-row justify-start items-center w-[80%]">
            <Feather name="arrow-down-circle" size={24} color="red" />
            <View className="flex flex-col pl-2">
              <MyText
                content={"Technology"}
                myStyle="text-black font-bold text-sm"
              />
              <View className="flex flex-row justify-center items-end mt-1">
                <Feather name="bar-chart-2" size={20} color="gray" />
                <MyText
                  content={"999K"}
                  myStyle="text-black font-normal text-gray-400 text-sm ml-1"
                />
              </View>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => alert("I dey work")}
            className="flex justify-center items-center w-[20%] rounded-full bg-[#380181] p-1"
          >
            <MyText
              content={"Subscribe"}
              myStyle="text-white font-bold text-xs"
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FacetScreen;
