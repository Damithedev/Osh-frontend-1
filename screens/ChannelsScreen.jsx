import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  EvilIcons,
} from "@expo/vector-icons";
import { getUserChannels } from "../store/actions/channelActions";
import { useSelector, useDispatch } from "react-redux";

import MyText from "../components/MyText";

const ChannelsScreen = ({ navigation }) => {
  const channel = useSelector((state) => state.channel);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserChannels());
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("Channel", { channelName: item.name })
        }
        className="flex flex-row justify-between items-center border-b-gray-200 border-b my-1 w-full p-2"
      >
        <View className="flex flex-row justify-start items-center w-[80%]">
          <View className="flex flex-col pl-2">
            <MyText
              content={item?.name}
              myStyle="text-black font-bold text-sm"
            />
            <View className="flex flex-row justify-start items-center mt-1">
              <MyText
                content={`${item?.followers.length} Followers`}
                myStyle="text-black font-normal text-gray-400 text-sm ml-1"
              />
              <Entypo name="dot-single" size={20} color="gray" />
              <MyText
                content={"999K Posts"}
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
          <MyText content={"Follow"} myStyle="text-white font-bold text-xs" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View>
        <MyText content={"No Update Yet!"} myStyle="text-[#000000]" />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 w-screen bg-[#fff] p-2">
      <StatusBar style="light" />
      <View className="flex justify-center items-center w-full">
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate("AddChannel")}
          className="flex flex-row justify-between p-3 items-center w-full h-14 bg-gray-100 border-[#380181] border rounded-lg"
        >
          <MyText
            content="Create a channel"
            myStyle="text-[#380181] font-bold text-justify text-base"
          />
          <Entypo name="plus" size={24} color="#380181" />
        </TouchableOpacity>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={channel?.data}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          ListFooterComponent={<View className="flex w-full h-20 "></View>}
        />
      </View>
    </SafeAreaView>
  );
};

export default ChannelsScreen;
