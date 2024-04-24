import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { adNav } from "../data/adNav";

import MyText from "../components/MyText";
import MyTimelineText from "../components/MyTimelineText";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { readProfile } from "../store/actions/profileActions";
import { getUserChannels } from "../store/actions/channelActions";
import StarredTimeline from "../components/SavedTimeline";
import { follow } from "../data/follow";

const commonPortfolioStyle = "font-normal text-sm";
const selectedPortfolioStyle =
  "font-bold text-sm text-center text-[#380181] p-2 w-full border-b border-b-2 border-b-[#380181]";

const AdManagerScreen = ({ navigation }) => {
  const [portfolioStep, setPortfolioStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const profile = useSelector((state) => state.profile);
  const channel = useSelector((state) => state.channel);
  // console.log("channel profile", channel);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readProfile());
    dispatch(getUserChannels());
  }, []);

  {
    profile.data === {} ? setLoading(true) : null;
  }

  const renderFollow = ({ item }) => {
    return (
      <View className="flex p-1">
        <View className="flex flex-col justify-start p-2 items-center w-32 h-56 border-gray-200 border rounded">
          <Image
            source={{ uri: item.image }}
            className="h-[65px] w-[65px] rounded-full my-2"
          />
          <MyText
            content={item.displayName}
            myStyle={"font-bold text-center text-xs"}
          />
          <MyText content={item.userName} myStyle={"text-center text-xs"} />
          <TouchableOpacity
            onPress={() => alert(`id ${item._id}`)}
            className="flex justify-center items-center w-full rounded-lg bg-[#000000] p-2 my-4"
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
    <SafeAreaView className="flex-1 justify-center items-center w-screen bg-white">
      <StatusBar style="auto" />
      {loading === true ? (
        <MyText content="Loading..." />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          className="w-full h-full"
        >
          <View className="flex justify-center items-center w-full my-2">
            <View className="flex flex-row bg-white w-screen self-center rounded-t-xl border-b-[#C1C1C1] border-b mt-4 mb-2">
              {adNav.map((nav) => (
                <TouchableOpacity
                  onPress={() => setPortfolioStep(nav.id)}
                  key={nav.id}
                  className={`w-1/${adNav.length} flex justify-center items-center`}
                >
                  <MyText
                    content={nav.title}
                    myStyle={
                      portfolioStep === nav.id
                        ? selectedPortfolioStyle
                        : commonPortfolioStyle
                    }
                  />
                </TouchableOpacity>
              ))}
            </View>
            <View className="flex flex-col items-center justify-center w-full p-2">
              {portfolioStep === 1 && <StarredTimeline />}
              {portfolioStep === 2 && (
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
                    ListFooterComponent={
                      <View className="flex w-full h-20 "></View>
                    }
                  />
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default AdManagerScreen;
