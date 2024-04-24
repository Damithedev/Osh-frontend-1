import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import MyText from "./MyText";
import { View, TouchableOpacity } from "react-native";
import {
  Foundation,
  FontAwesome,
  AntDesign,
  FontAwesome5,
} from "@expo/vector-icons";

import {
  likeTimelinePost,
  dislikeTimelinePost,
  starPost,
} from "../store/actions/timelineActions";

const SavedPostFooter = ({
  item,
  likes,
  dislikes,
  comments,
  userId,
  saved,
}) => {
  // console.log("footer userId", userId);
  const dispatch = useDispatch();
  return (
    <View className="flex flex-row justify-between items-center w-full p-2 my-1 bg-white border-y border-y-gray-200">
      <View className="flex flex-row justify-between items-center w-2/5">
        <TouchableOpacity
          onPress={() => dispatch(likeTimelinePost(item))}
          className="flex flex-row justify-center items-center p-1 rounded-md"
        >
          {likes.includes(userId) ? (
            <AntDesign name="like1" size={17} color={"#380181"} />
          ) : (
            <AntDesign name="like2" size={17} color={"#000000"} />
          )}

          <MyText content={likes.length} myStyle="ml-1 text-xs" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => dispatch(dislikeTimelinePost(item))}
          className="flex flex-row justify-center items-center p-1 rounded-md"
        >
          {dislikes.includes(userId) ? (
            <AntDesign name="dislike1" size={17} color={"#380181"} />
          ) : (
            <AntDesign name="dislike2" size={17} color={"#000000"} />
          )}
          <MyText content={dislikes.length} myStyle="ml-1 text-xs" />
        </TouchableOpacity>
        <TouchableOpacity className="flex flex-row justify-center items-center p-1 rounded-md">
          <FontAwesome name="comments-o" size={18} color="black" />
          <MyText content={comments.length} myStyle="ml-1 text-xs" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-row justify-end items-center w-2/5">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => dispatch(starPost(item))}
          className="flex flex-row items-center w-2/5 p-1 justify-end"
        >
          {saved.includes(userId) ? (
            <AntDesign name="star" size={17} color={"#380181"} />
          ) : (
            <AntDesign name="staro" size={17} color={"#000000"} />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => console.log(item)}
          className="flex flex-row items-center w-2/5 p-1 justify-end"
        >
          <FontAwesome5 name="paper-plane" size={16} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SavedPostFooter;
