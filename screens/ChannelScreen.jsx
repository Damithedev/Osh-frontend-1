import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { AntDesign, Entypo, Feather } from "@expo/vector-icons";
import { channelNav } from "../data/channelNav";
import { useDispatch, useSelector } from "react-redux";

import { getChannel } from "../store/actions/channelActions";

import MyText from "../components/MyText";
import MyTimelineText from "../components/MyTimelineText";

const commonPortfolioStyle = "font-normal text-sm";
const selectedPortfolioStyle =
  "font-bold text-sm text-center text-[#380181] p-2 w-full border-b border-b-2 border-b-[#380181]";

const ChannelScreen = ({ route, navigation }) => {
  const { channelName } = route.params;
  const [portfolioStep, setPortfolioStep] = useState(1);
  const channel = useSelector((state) => state.channel);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getChannel(channelName));
  // }, []);

  return (
    <SafeAreaView className="flex-1 justify-center items-center w-screen pt-10 bg-white">
      <StatusBar style="auto" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full h-full"
      >
        <View className="flex justify-center items-center w-full my-2">
          <Image
            source={require("../assets/Avatar-19.png")}
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#380181",
              borderRadius: 50,
              marginLeft: 10,
            }}
          />
          <View className="flex flex-col justify-center items-center my-2 w-full">
            <MyText
              content={"Obajuwon's lifestyle"}
              myStyle="text-black font-bold text-lg"
            />
            <MyText
              content={`@Juwon_Java.lifestyle`}
              myStyle="text-black font-semibold text-sm"
            />
            <View className="flex m-2">
              <MyTimelineText
                content={
                  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
                }
                myStyle="text-black text-justify font-semibold text-xs"
              />
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("EditProfile")}
            className="flex flex-row justify-between items-center w-1/3 rounded-full p-2 bg-[#380181] my-1"
          >
            <AntDesign name="edit" size={18} color="white" />
            <MyText
              content={"Change Info"}
              myStyle="text-white font-semibold text-sm"
            />
          </TouchableOpacity>
          <View className="flex flex-row justify-center items-center w-full my-2">
            <View className="flex justify-center items-center w-1/3">
              <MyText
                content={"15.3K"}
                myStyle="text-black font-bold text-lg"
              />
              <MyText
                content={"posts"}
                myStyle="text-black font-semibold text-sm"
              />
            </View>
            <View className="flex justify-center items-center w-1/3">
              <MyText
                content={"15.3K"}
                myStyle="text-black font-bold text-lg"
              />
              <MyText
                content={"followings"}
                myStyle="text-black font-semibold text-sm"
              />
            </View>
          </View>
          <View className="flex flex-row bg-white w-screen self-center rounded-t-xl border-b-[#C1C1C1] border-b mt-4 mb-2">
            {channelNav.map((nav) => (
              <TouchableOpacity
                onPress={() => setPortfolioStep(nav.id)}
                key={nav.id}
                className={`w-full flex justify-center items-center`}
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
            {portfolioStep === 3 && (
              <View className="flex justify-center items-center w-full">
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate("AddChannel")}
                  className="flex flex-row justify-between p-3 items-center w-full h-14 bg-white border-[#380181] border rounded-lg"
                >
                  <MyText
                    content="Create a channel"
                    myStyle="text-[#380181] font-bold text-justify text-base"
                  />
                  <Entypo name="plus" size={24} color="#380181" />
                </TouchableOpacity>

                <View className="flex flex-row justify-between items-center border-b-gray-200 border-b my-1 w-full p-2">
                  <View className="flex flex-row justify-start items-center w-[80%]">
                    <View className="flex flex-col pl-2">
                      <MyText
                        content={"Lifestyle"}
                        myStyle="text-black font-bold text-sm"
                      />
                      <View className="flex flex-row justify-start items-center mt-1">
                        <MyText
                          content={"999K Followers"}
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
                    <MyText
                      content={"Follow"}
                      myStyle="text-white font-bold text-xs"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChannelScreen;
