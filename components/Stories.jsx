import React, { useState, useEffect } from "react";
import { stories } from "../data/stories";

import { useSelector, useDispatch } from "react-redux";

import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import MyText from "./MyText";
import { getStatusTimeline } from "../store/actions/statusTimelineAction";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

const Stories = () => {
  const statusTimeline = useSelector((state) => state.statusTimeline);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(getStatusTimeline());
  }, []);

  const renderStatusItem = ({ item }) => {
    console.log("sta itm", item?.user);
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Status", { userId: item?.user })}
        className="flex flex-col justify-center items-center"
      >
        <View
          className={`flex justify-center items-center w-16 h-16 border-2 border-blue-700 ${
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
              className="h-16 w-16 rounded-full"
            />
          )}
        </View>
        <View className="flex flex-col w-5/6">
          <MyText
            // content={item._id}
            content={item.files[0].user?.userName}
            myStyle="text-black text-xs"
          />
        </View>
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <View className="flex justify-center items-center m-px">
        <View className="border-2 border-dashed border-[#2917FC] rounded-full p-[2px]">
          <Image
            source={{ uri: item?.storiesItem[0] }}
            className="h-16 w-16 rounded-full"
          />
        </View>
        <MyText content={item.user.username} myStyle={"text-xs"} />
      </View>
    );
  };

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View>
        {/* <Text style={{ color: "#05375a" }}>{`No Update Yet!`}</Text> */}
      </View>
    );
  };

  return (
    <SafeAreaView className="w-full">
      <View className="flex flex-row border-b border-b-gray-200 p-1">
        <View className="flex justify-start items-center flex-col">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("AddStatusMedia")}
            className="flex flex-col justify-center items-center h-16 w-16 rounded-full bg-[#380181] mr-1"
          >
            <MaterialIcons name="add-circle-outline" size={30} color="white" />
          </TouchableOpacity>
          {/* <MyText
            content={"Add to status"}
            myStyle="text-black text-xs w-[50px]"
          /> */}
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={statusTimeline?.data}
          horizontal={true}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={renderStatusItem}
          keyExtractor={keyExtractor}
          // onEndReached={handleLoadMore}
          // onEndReachedThreshold={0.1}
        />
      </View>
    </SafeAreaView>
  );
};

export default Stories;
