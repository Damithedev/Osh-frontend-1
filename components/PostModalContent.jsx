import React from "react";
import { View, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
  FontAwesome,
  SimpleLineIcons,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import MyText from "./MyText";
import { deleteTimelinePost } from "../store/actions/timelineActions";

const PostModalContent = ({ postId, channelId, channelName, userId }) => {
  const user = useSelector((state) => state.auth);
  // console.log("usser", user);
  // console.log("ussser", userId);
  const dispatch = useDispatch();

  const notIntrestedFunc = (item) => {
    dispatch(deleteTimelinePost(item));
  };

  return (
    <View className="h-2/5 bg-white w-full rounded-t-2xl bottom-0 absolute p-3 pt-5">
      <View className="flex flex-col justify-between h-full items-start my-1 w-full p-2">
        <TouchableOpacity
          onPress={() => alert(`share post with id ${postId}`)}
          className="flex flex-row justify-start items-center w-full p-2"
        >
          <AntDesign name="sharealt" size={20} color="#380181" />
          <View className="flex flex-col pl-4">
            <MyText
              content={"Share this post"}
              myStyle="text-black font-normal text-lg"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert(`follow post with id ${channelId}`)}
          className={"flex flex-row justify-start items-center w-full p-2"}
          disabled={user.data._id == userId && true}
        >
          <SimpleLineIcons
            name="user-follow"
            size={22}
            color={user.data._id == userId ? "#c1c1c1" : "#380181"}
          />
          <View className="flex flex-col pl-4">
            <MyText
              content={`Follow @${channelName}`}
              myStyle={
                user.data._id == userId
                  ? "text-[#c1c1c1] font-normal text-lg"
                  : "text-black font-normal text-lg"
              }
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => notIntrestedFunc(postId)}
          className="flex flex-row justify-start items-center w-full p-2"
        >
          <MaterialCommunityIcons
            name="emoticon-sad-outline"
            size={24}
            color="#380181"
          />
          <View className="flex flex-col pl-4">
            <MyText
              content={"Not interested in this post"}
              myStyle="text-black font-normal text-lg"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert(`block channel with id ${channelId}`)}
          className="flex flex-row justify-start items-center w-full p-2"
        >
          <MaterialIcons
            name="block"
            size={24}
            color={user.data._id == userId ? "#c1c1c1" : "#380181"}
          />
          <View className="flex flex-col pl-4">
            <MyText
              content={`Block @${channelName}`}
              myStyle={
                user.data._id == userId
                  ? "text-[#c1c1c1] font-normal text-lg"
                  : "text-black font-normal text-lg"
              }
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => alert(`report post with id ${postId}`)}
          className="flex flex-row justify-start items-center w-full p-2"
        >
          <FontAwesome name="flag-o" size={20} color="#380181" />
          <View className="flex flex-col pl-5">
            <MyText
              content={"Report this post"}
              myStyle="text-black font-normal text-lg"
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostModalContent;
