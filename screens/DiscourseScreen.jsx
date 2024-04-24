import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  AntDesign,
  Feather,
  FontAwesome5,
  MaterialIcons,
} from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import moment from "moment";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";
import ChatSnippet from "../components/ChatSnippet";
import { getChats } from "../store/actions/chatActions";
import { getStatusTimeline } from "../store/actions/statusTimelineAction";
import { chatNav } from "../data/chatNav";
import { getCalls } from "../store/actions/callActions";

const commonPortfolioStyle = "font-normal text-sm text-white";
const selectedPortfolioStyle =
  "font-bold text-sm text-center text-[#ffffff] p-2 w-full border-b border-b-2 border-b-[#ffffff]";

const DiscourseScreen = ({ navigation }) => {
  const chats = useSelector((state) => state.chats);
  const calls = useSelector((state) => state.calls);
  const statusTimeline = useSelector((state) => state.statusTimeline);
  const [portfolioStep, setPortfolioStep] = useState(1);
  const [mySearch, setMySearch] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getChats());
    dispatch(getCalls());
    console.log("getting...");
    dispatch(getStatusTimeline());
  }, []);

  useEffect(() => {
    console.log("status", statusTimeline.data);
  }, [statusTimeline]);

  const [isSearch, setIsSearch] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const isSubmitDisable =
    "flex justify-center items-center p-1 px-2 rounded-full bg-gray-300 w-full";
  const isSubmitNotDisable =
    "flex justify-center items-center p-1 px-2 rounded-full bg-blue-600 w-full";

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    isSearch ? setIsDisabled(false) : setIsDisabled(true);
  }, [isSearch]);

  useEffect(() => {
    console.log("chat", chats);
  }, [chats]);

  useEffect(() => {
    console.log("getting calls", calls.data);
  }, [calls]);

  const onSearch = (data) => {
    const searchInput = isSearch;
    console.log(searchInput);
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("DiscourseContent", {
            topicChatUser: item.topicChatUser?.userName,
            topicChatUserId: item.topicChatUser?._id,
          })
        }
        className="flex flex-row justify-between items-center w-[99%] py-2 border-b border-gray-200"
      >
        <View>
          <Image
            source={{ uri: item.topicChatUser?.avatar }}
            className="w-12 h-12 bg-[#380181] rounded-full"
          />
          <View className="absolute w-3 h-3 bg-green-600 border-2 border-white rounded-full"></View>
        </View>
        <View className="flex flex-col w-5/6">
          <View className="flex flex-row justify-between items-center w-full">
            <MyText
              content={item.topicChatUser?.userName}
              myStyle="text-black font-semibold text-lg"
            />
            <MyText
              content={"9:00am"}
              myStyle="text-gray-400 font-normal text-sm"
            />
          </View>
          <View className="flex flex-row justify-between items-center w-full">
            <View className="flex flex-col w-4/5">
              <ChatSnippet
                content={item.lastMessage.text}
                myStyle="text-gray-400 font-normal text-sm w-full"
              />
            </View>
            <View className="flex justify-center items-center bg-[#380181] rounded-full p-px w-8 h-5">
              <MyText content={"2"} myStyle="text-white font-normal text-xs" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderStatusItem = ({ item }) => {
    console.log("sta itm", item?.user);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Status", { userId: item?.user })}
        className="flex flex-row justify-between items-center w-[99%]"
      >
        <View
          className={`flex justify-center items-center w-12 h-12 border-2 border-blue-700 ${
            item.files[0]?.media.backgroundColor == ""
              ? "bg-black"
              : `bg-[${item.files[0]?.media.backgroundColor}]`
          } rounded-full p-px`}
        >
          {item?.files[0]?.media.text == "" ? (
            <MyText
              content={item.files[0]?.media.caption}
              myStyle={"text-white text-center text-[5px]"}
            />
          ) : (
            <Image
              source={{ uri: item?.files[0]?.media?.text }}
              className="w-12 h-12 bg-[#380181] rounded-full"
            />
          )}
        </View>
        <View className="flex flex-col w-5/6 ml-2">
          <MyText
            // content={item._id}
            content={item.files[0].user?.userName}
            myStyle="text-black text-lg"
          />
          <MyText
            // content={item._id}
            content={moment(new Date(item.files[0].createdAt)).fromNow()}
            myStyle="text-gray-600 font-semibold text-sm"
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderCallItem = ({ item }) => {
    return (
      <View className="flex flex-col justify-start items-center w-screen my-1 p-4">
        <View className="flex flex-row w-full justify-start items-center">
          <View className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-white">
            <Image
              source={require("../assets/Avatar-19.png")}
              className="w-full h-full rounded-full"
            />
          </View>
          <View className="flex flex-col ml-3">
            <MyText content={item.callClient} myStyle={"text-[16px]"} />
            <MyText
              content={moment(new Date()).fromNow()}
              myStyle={"text-xs mt-[2px]"}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => alert("I dey work")}
            className="flex justify-center items-center p-2 absolute right-0 bg-blue-800 rounded-full"
          >
            <Feather name="phone" size={18} color="white" />
          </TouchableOpacity>
        </View>
      </View>
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
    <SafeAreaView className="flex-1 justify-start items-center w-screen bg-white">
      <StatusBar style="auto" />
      <View className="flex justify-start items-center h-full w-full">
        <View className="flex flex-col justify-between items-center bg-blue-800 w-full h-[150px] pt-12">
          <View className="flex flex-row w-full px-2 justify-between items-center">
            <View>
              <MyText
                content={"Sho wa"}
                myStyle={"font-bold text-2xl text-white"}
              />
            </View>
            <View className="flex flex-row justify-between w-[60px]">
              <TouchableOpacity
                onPress={() => setMySearch(!mySearch)}
                activeOpacity={0.8}
                className="p-1"
              >
                <AntDesign name="search1" size={23} color="white" />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} className="p-1">
                <Feather name="more-vertical" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
          {mySearch && (
            <View className="flex flex-row justify-center items-center w-[90%] bg-[#f1f1f1] rounded-lg m-2">
              <View className="w-[85%] p-[2px]">
                <Controller
                  control={control}
                  name="search"
                  rules={{ required: false }}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <MyTextInput
                      value={isSearch}
                      onChangeText={(text) => setIsSearch(text)}
                      onBlur={onBlur}
                      placeholder={`Search...`}
                    />
                  )}
                />
              </View>
              <View className="flex justify-center items-center my-1">
                <TouchableOpacity
                  className={
                    isDisabled === true ? isSubmitDisable : isSubmitNotDisable
                  }
                  activeOpacity={0.8}
                  disabled={isDisabled}
                  onPress={handleSubmit(onSearch)}
                >
                  <AntDesign name="search1" size={20} color="black" />
                </TouchableOpacity>
              </View>
            </View>
          )}
          <View className="flex flex-row w-full h-[50px] px-2">
            {chatNav.map((nav) => (
              <TouchableOpacity
                onPress={() => setPortfolioStep(nav.id)}
                key={nav.id}
                className={`w-1/${chatNav.length} flex justify-center items-center`}
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
        </View>
        {portfolioStep == 1 && (
          <View className="flex flex-col justify-start items-center w-full my-4 p-4">
            <FlatList
              showsVerticalScrollIndicator={false}
              data={chats?.data}
              ListEmptyComponent={ListEmptyComponent}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              ListFooterComponent={<View className="flex w-full h-20 "></View>}
            />
          </View>
        )}
        {portfolioStep == 2 && (
          <View className="flex flex-col justify-start items-center w-full my-4 p-4">
            <FlatList
              showsVerticalScrollIndicator={false}
              data={statusTimeline?.data}
              ListEmptyComponent={ListEmptyComponent}
              renderItem={renderStatusItem}
              keyExtractor={keyExtractor}
              ListFooterComponent={<View className="flex w-full h-20 "></View>}
            />
          </View>
        )}
        {portfolioStep == 3 && (
          <View className="flex flex-col justify-start items-center w-full">
            <FlatList
              showsVerticalScrollIndicator={false}
              data={calls?.data}
              ListEmptyComponent={ListEmptyComponent}
              renderItem={renderCallItem}
              keyExtractor={keyExtractor}
            />
          </View>
        )}
      </View>
      {portfolioStep == 1 && (
        <View className="flex flex-col justify-end items-center w-[60px] h-[150px] absolute bottom-4 right-4">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("ContactList")}
            className="flex justify-center items-center rounded-lg bg-blue-600 p-3"
          >
            <MaterialIcons name="perm-contact-cal" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
      {portfolioStep == 2 && (
        <View className="flex flex-col justify-evenly items-center w-[60px] h-[150px] absolute bottom-4 right-4">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("AddStatusText")}
            className="flex justify-center items-center rounded-sm bg-blue-600 p-2"
          >
            <FontAwesome5 name="pencil-alt" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("AddStatusMedia")}
            className="flex justify-center items-center rounded-lg bg-blue-600 p-3"
          >
            <Feather name="camera" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default DiscourseScreen;
