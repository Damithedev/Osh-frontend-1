import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  EvilIcons,
} from "@expo/vector-icons";

import MyText from "../components/MyText";
import { follow } from "../data/follow";

const ConnectScreen = ({ navigation }) => {
  const renderFollow = ({ item }) => {
    return (
      <View className="flex p-1">
        <View className="flex flex-row justify-between items-center w-full">
          <Image
            source={{ uri: item.image }}
            className="h-[55px] w-[55px] rounded-full"
          />
          <View className="flex justify-start items-start px-3 w-[55%]">
            <MyText
              content={item.displayName}
              myStyle={"font-bold text-center text-xs"}
            />
            <MyText content={item.userName} myStyle={"text-center text-xs"} />
          </View>
          <TouchableOpacity
            onPress={() => alert(`id ${item.id}`)}
            className="flex justify-center items-center rounded-lg bg-[#000000] p-2 my-4"
          >
            <MyText
              content={"Subscribe"}
              myStyle={"font-bold text-white text-center text-sm"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View>
        <Text style={{ color: "#05375a" }}>No Update Yet!</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 w-screen bg-[#ffffff]">
      <StatusBar style="auto" />
      <View className="flex justify-start items-center mt-10 w-full h-full">
        <View className="flex flex-row items-center justify-between w-full p-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-circle" size={30} color="#380181" />
          </TouchableOpacity>
          <MyText content="Connect" myStyle="text-lg font-bold" />
          <View></View>
        </View>
        <MyText content="Connect Screen" className="text-white text-lg" />
        <View className="flex flex-row justify-center items-center">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={follow}
            ListEmptyComponent={ListEmptyComponent}
            renderItem={renderFollow}
            keyExtractor={keyExtractor}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ConnectScreen;
