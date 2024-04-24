import React, { useState } from "react";
import MyText from "./MyText";
import { View, Image, TouchableOpacity, Modal } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import MyTimelineText from "./MyTimelineText";
import PostFooter from "./PostFooter";
import { useSelector } from "react-redux";
import moment from "moment";

import { useNavigation } from "@react-navigation/native";
import PostModalContent from "./PostModalContent";

const CommentNoMedia = (item) => {
  const user = useSelector((state) => state.auth);
  // console.log("ittem comment", item?.item?._id);

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="w-full bg-white border border-gray-200 rounded-md my-1">
      <View className="flex flex-row justify-between items-center w-full p-2">
        <View className="flex flex-row items-start">
          <View className="flex justify-center items-center rounded-full bg-[#380181]">
            <Image
              source={
                item?.item.user?.avatar === ""
                  ? require("../assets/Avatar-19.png")
                  : item?.item?.user?.avatar
              }
              style={{ width: 50, height: 50 }}
            />
          </View>
          <View className="flex flex-col">
            <View className="ml-2 bg-[#F0F2F5] p-3">
              <View>
                <MyText
                  myStyle="text-sm font-black"
                  content={item?.item?.user?.userName}
                />
                <MyText
                  myStyle="text-xs text-gray-500"
                  content={item?.item.text.text}
                />
              </View>
            </View>
            <View className="px-3 py-1 flex flex-row">
              <MyText
                myStyle="text-xs text-gray-500"
                content={moment(new Date(item.item.createdAt)).fromNow()}
              />
              <TouchableOpacity
                activeOpacity={0.8}
                className="ml-4"
                onPress={() => console.log("I dey work")}
              >
                <MyText
                  myStyle="text-xs text-gray-500"
                  content={`${item.item.likes.length} likes`}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="w-full bg-black/60 h-full"
        >
          <PostModalContent
            postId={item?.item?._id}
            channelId={item?.item?.channel?._id}
            channelName={item?.item?.channel?.name}
            userId={item?.item?.user?._id}
          />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

{
  /* <PostFooter
item={item?.item?._id}
likes={item?.item?.likes}
dislikes={item?.item?.dislikes}
saved={item?.item?.saved}
comments={item?.item?.comments}
shared={item?.item?.shared}
userId={user.data._id}
/> */
}

export default CommentNoMedia;
