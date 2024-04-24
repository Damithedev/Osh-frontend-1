// import { StatusBar } from "expo-status-bar";
import React, { useState, useCallback, useEffect } from "react";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  SafeAreaView,
  StatusBar,
  View,
  FlatList,
  TouchableOpacity,
  Text,
} from "react-native";

import ExchangeRate from "../components/ExchangeRate";

import { readProfile } from "../store/actions/profileActions";

import { useDispatch, useSelector } from "react-redux";

import MyText from "../components/MyText";
import Timeline from "../components/Timeline";
import News from "../components/News";

import { subscribedFacet } from "../store/actions/facetActions";
import { getActiveFacet } from "../store/actions/activeFacetActions";
import Stories from "../components/Stories";

const facetStyle = {
  mainStyle:
    "flex flex-col justify-center p-2 h-full items-center border-gray-200 border rounded",
  textStyle: "text-[#380181]",
};
const activeFacetStyle = {
  mainStyle:
    "flex flex-col justify-center p-2 h-full items-center border-gray-200 bg-[#380181] text-white border rounded",
  textStyle: "text-white",
};

const HomeScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readProfile());
  }, []);

  return (
    <SafeAreaView className="flex-1 items-center w-screen bg-white">
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <View className="flex flex-row justify-between items-center w-full h-12 bg-black border-y border-y-gray-200">
        <View className="flex flex-row justify-between items-center w-full h-full px-2 bg-white">
          <TouchableOpacity className="flex flex-col items-center justify-center">
            <Ionicons name="briefcase-outline" size={18} color="black" />
            <MyText content={"Job"} myStyle={"text-xs"} />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-col items-center justify-center">
            <Ionicons name="compass-outline" size={18} color="black" />
            <MyText content={"Directory"} myStyle={"text-xs"} />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-col items-center justify-center">
            <Ionicons name="mail-outline" size={18} color="black" />
            <MyText content={"Mail"} myStyle={"text-xs"} />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-col items-center justify-center">
            <FontAwesome5 name="kiss-wink-heart" size={18} color="black" />
            <MyText content={"Dating"} myStyle={"text-xs"} />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-col items-center justify-center">
            <MaterialIcons name="house-siding" size={22} color="black" />
            <MyText content={"Properties"} myStyle={"text-xs"} />
          </TouchableOpacity>
          <TouchableOpacity className="flex flex-col items-center justify-center">
            <Ionicons name="car-outline" size={22} color="black" />
            <MyText content={"Car"} myStyle={"text-xs"} />
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Facets")}
          className="flex justify-center items-center w-[10%] h-full bg-white"
        >
          <MaterialCommunityIcons
            name="format-list-bulleted-type"
            size={24}
            color="black"
          />
        </TouchableOpacity> */}
      </View>
      <View className="flex flex-row justify-between items-center w-full h-10 bg-black border-y border-y-gray-200">
        <ExchangeRate />
      </View>
      {/* <Stories /> */}
      <Timeline />
      <View className="absolute bottom-0 flex flex-row justify-between items-center w-full h-10 bg-black border-y border-y-gray-200">
        <News />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
