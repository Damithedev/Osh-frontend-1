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

import {
  AntDesign,
  Entypo,
  MaterialIcons,
  FontAwesome,
  FontAwesome5,
} from "@expo/vector-icons";
import { profileNav } from "../data/profileNav";

import MyText from "../components/MyText";
import MyTimelineText from "../components/MyTimelineText";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { readProfile } from "../store/actions/profileActions";
import { getUserGroups } from "../store/actions/groupActions";
import { getUserPost } from "../store/actions/postActions";
import PostNoMedia from "../components/PostNoMedia";

import { follow } from "../data/follow";

const commonPortfolioStyle = "font-normal text-sm";
const selectedPortfolioStyle =
  "font-bold text-sm text-center text-[#380181] p-2 w-full border-b border-b-2 border-b-[#380181]";

const ProfileScreen = ({ navigation }) => {
  const [portfolioStep, setPortfolioStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const profile = useSelector((state) => state.profile);
  const post = useSelector((state) => state.post);
  const group = useSelector((state) => state.group);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readProfile());
    dispatch(getUserGroups());
    dispatch(getUserPost(page));
  }, []);

  console.log("profileee", profile?.data?.data);

  {
    profile.data === null ? setLoading(true) : null;
  }

  const renderFollow = ({ item }) => {
    return (
      <View className="flex p-1">
        <View className="flex flex-col justify-start items-center w-32 h-56 border-gray-200 border rounded">
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
    if (item?.text?.files?.length == 4) {
      return <PostFourMedia item={item} />;
    } else if (item?.text?.files?.length == 3) {
      return <PostThreeMedia item={item} />;
    } else if (item?.text?.files?.length == 2) {
      return <PostTwoMedia item={item} />;
    } else if (item?.text?.files?.length == 1) {
      return <PostOneMedia item={item} />;
    } else if (item?.text?.files?.length == 0) {
      return <PostNoMedia item={item} />;
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderGroupItem = ({ item }) => {
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
                content={`${item?.members.length} Members`}
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
          <MyText content={"Join"} myStyle="text-white font-bold text-xs" />
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
      <StatusBar backgroundColor="#ffffff80" style="auto" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="w-full h-full"
      >
        <View className="flex w-full h-[150px] rounded-b-lg bg-blue-700"></View>
        <View className="flex justify-center items-center w-full">
          <Image
            source={require("../assets/Avatar-19.png")}
            style={{
              width: 100,
              height: 100,
              backgroundColor: "#380181",
              borderRadius: 50,
              marginTop: -60,
              borderColor: "white",
              borderWidth: 3,
            }}
          />
          <View className="flex flex-col justify-center items-center my-2 w-full">
            <View className="flex justify-center items-center">
              <MyText
                content={`${profile?.data.data.username}`}
                myStyle="text-black font-bold text-sm"
              />
              <MaterialIcons name="verified" size={15} color="green" />
            </View>
            <View className="flex m-2">
              <MyTimelineText
                content={profile?.data.data.biography}
                myStyle="text-black text-justify font-semibold text-xs text-center"
              />
            </View>
          </View>
          <View className="flex flex-row justify-center items-center w-full my-2">
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Followers")}
              className="flex justify-center items-center w-1/3"
            >
              <MyText
                content={profile?.data.data.followers.length}
                myStyle="text-black font-bold text-lg"
              />
              <MyText
                content={"Followers"}
                myStyle="text-black font-semibold text-sm"
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Followings")}
              className="flex justify-center items-center w-1/3"
            >
              <MyText
                content={profile?.data.data.followings.length}
                myStyle="text-black font-bold text-lg"
              />
              <MyText
                content={"Followings"}
                myStyle="text-black font-semibold text-sm"
              />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row w-full p-4">
            <View className="flex flex-col justify-center items-center w-full bg-[#F0F2F5] p-2">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate("EditProfile")}
                className="flex flex-row justify-center items-center w-1/2 rounded-lg p-3 bg-[#380181] my-1"
              >
                <AntDesign name="edit" size={18} color="white" />
                <MyText
                  content={"Edit profile"}
                  myStyle="text-white font-semibold text-xs ml-2"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View className="flex flex-row w-full bg-[#F0F2F5] h-[50px]">
            {profileNav.map((nav) => (
              <TouchableOpacity
                onPress={() => setPortfolioStep(nav.id)}
                key={nav.id}
                className={`w-1/${profileNav.length} flex justify-center items-center`}
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
          <View className="w-full">
            {portfolioStep == 1 && (
              <FlatList
                showsVerticalScrollIndicator={false}
                // data={post?.data}
                data={""}
                ListEmptyComponent={ListEmptyComponent}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                // onEndReached={handleLoadMore}
                // onEndReachedThreshold={0.1}
                ListHeaderComponent=""
              />
            )}
            {portfolioStep == 2 && (
              <View className="flex justify-center items-center w-full p-2">
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate("AddGroup")}
                  className="flex flex-row justify-between p-3 items-center w-full h-14 bg-gray-100 border-[#380181] border rounded-lg"
                >
                  <MyText
                    content="Create a group"
                    myStyle="text-[#380181] font-bold text-justify text-base"
                  />
                  <Entypo name="plus" size={24} color="#380181" />
                </TouchableOpacity>

                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={group?.data}
                  ListEmptyComponent={ListEmptyComponent}
                  renderItem={renderGroupItem}
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
    </SafeAreaView>
  );
};

export default ProfileScreen;
