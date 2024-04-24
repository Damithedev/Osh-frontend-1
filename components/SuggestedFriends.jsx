import React, { useState, useEffect } from "react";
import { stories } from "../data/stories";
import { suggestedGroups } from "../data/suggestedGroups";
import { suggestedFriends } from "../data/suggestedFriends";
import {
  getSuggestedfriends,
  followFriend,
} from "../store/actions/suggestedFriendsAction";

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
import { useNavigation } from "@react-navigation/native";

const SuggestedFriends = () => {
  const newSuggestedFriend = useSelector((state) => state.suggestedFriend);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSuggestedfriends());
  }, []);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("UserProfile", { username: item?.username })
        }
        className="flex justify-center items-center m-1 w-[200px] rounded-2xl bg-white border-[#f1f1f1] border-2"
      >
        <Image
          source={{ uri: item?.avatar }}
          className="h-[150px] w-full rounded-t-2xl"
        />
        <View className="flex justify-center items-start p-2 w-full h-[80px]">
          <MyText content={item?.username} myStyle={"font-normal py-2"} />
          <View className="w-full flex flex-row justify-between">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => dispatch(followFriend(item?._id))}
              // onPress={() => dispatch(followFriend(item?._id))}
              className="flex justify-center items-center bg-[#2917FC] w-[48%] rounded-lg h-[30px]"
            >
              <MyText content={"Add"} myStyle={"text-white"} />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => alert("Work in progress!!!")}
              className="flex justify-center items-center bg-[#F0F2F5] w-[48%] rounded-lg h-[30px]"
            >
              <MyText content={"Remove"} myStyle={"text-black"} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
      <View className="border-b border-b-gray-200 p-1">
        <MyText content="People you may know" myStyle={"font-bold my-1"} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={newSuggestedFriend?.data}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
    </SafeAreaView>
  );
};

export default SuggestedFriends;
