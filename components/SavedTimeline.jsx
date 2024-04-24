import React, { useState, useCallback, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import MyText from "./MyText";
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import PostOneMedia from "./PostOneMedia";
import PostTwoMedia from "./PostTwoMedia";
import PostThreeMedia from "./PostThreeMedia";
import PostFourMedia from "./PostFourMedia";
import PostNoMedia from "./PostNoMedia";
import timeline from "../data/timeline";
import { follow } from "../data/follow";
import { getStarTimeline } from "../store/actions/starPostActions";

import { useNavigation } from "@react-navigation/native";

const StarredTimeline = () => {
  const starredPost = useSelector((state) => state.starredPost);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStarTimeline());
  }, []);

  const renderItem = ({ item }) => {
    if (item?.keyMessage?.files?.length == 4) {
      return <PostFourMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 3) {
      return <PostThreeMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 2) {
      return <PostTwoMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 1) {
      return <PostOneMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 0) {
      return <PostNoMedia item={item} />;
    }
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
    <SafeAreaView className="flex-1 w-full">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={starredPost?.data}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        // ListFooterComponent={}
      />
    </SafeAreaView>
  );
};

export default StarredTimeline;
