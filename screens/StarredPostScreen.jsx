import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  EvilIcons,
} from "@expo/vector-icons";

import MyText from "../components/MyText";
import StarredTimeline from "../components/SavedTimeline";

const StarredPostScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen bg-[#fff]">
      <StatusBar style="light" />
      <StarredTimeline />
    </SafeAreaView>
  );
};

export default StarredPostScreen;
