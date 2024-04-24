import React, { useState } from "react";
import MyText from "./MyText";
import { View, Image, TouchableOpacity, Modal } from "react-native";
import { Feather, Entypo, MaterialIcons } from "@expo/vector-icons";
import MyTimelineText from "./MyTimelineText";
import PostFooter from "./PostFooter";
import { useSelector } from "react-redux";
import moment from "moment";

import { useNavigation } from "@react-navigation/native";
import PostModalContent from "./PostModalContent";

const PostViewNoMedia = (item) => {
  const user = useSelector((state) => state.auth);

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="w-full bg-white border border-gray-200 rounded-md my-1">
      <View className="flex flex-row justify-between items-center w-full p-2">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Profile")}
        >
          <View className="flex flex-row items-start">
            <View className="flex justify-center items-center rounded-full h-[50px] w-[50px] bg-[#380181]">
              <Image
                source={
                  item?.item.user?.avatar === ""
                    ? require("../assets/Avatar-19.png")
                    : { uri: item?.item?.user?.avatar }
                }
                style={{
                  width: 48,
                  height: 48,
                  resizeMode: "cover",
                  borderRadius: 50,
                }}
              />
            </View>
            <View className="flex flex-col items-start ml-2">
              <View className="flex flex-row justify-center items-center">
                <MyText
                  myStyle="text-sm font-bold"
                  content={item?.item?.user?.userName}
                />
                <MyText
                  myStyle="text-xs text-gray-500 mx-2"
                  content={`Joined ${moment(
                    new Date(item.item.user.createdAt)
                  ).year()}`}
                />
                <MaterialIcons name="verified" size={15} color="green" />
                <MaterialIcons name="verified" size={15} color="blue" />
              </View>
              <View className="flex flex-row justify-between items-center my-1">
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => alert("I dey work")}
                  className="p-px"
                >
                  <MyText
                    myStyle="text-xs font-normal text-[#2917FC]"
                    content={"Message"}
                  />
                </TouchableOpacity>
                <Entypo name="dot-single" size={12} color="black" />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Earn")}
                  className="p-px"
                >
                  <MyText
                    myStyle="text-xs font-normal text-[#2917FC]"
                    content={"Earn"}
                  />
                </TouchableOpacity>
                <Entypo name="dot-single" size={12} color="black" />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate("Report")}
                  className="p-px"
                >
                  <MyText
                    myStyle="text-xs font-normal text-[#2917FC]"
                    content={"Report"}
                  />
                </TouchableOpacity>
                <Entypo name="dot-single" size={12} color="black" />
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => alert("I dey work")}
                  className="p-px"
                >
                  <MyText
                    myStyle="text-xs font-normal text-[#2917FC]"
                    content={"Connect"}
                  />
                </TouchableOpacity>
              </View>
              <MyText
                myStyle="text-xs text-gray-500"
                content={moment(new Date(item.item.createdAt)).fromNow()}
              />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <View className="flex flex-col items-start w-full p-3 bg-white">
          <MyTimelineText
            myStyle="text-lg text-justify leading-none"
            content={item?.item?.text?.text}
          />
        </View>
      </View>
      <PostFooter
        item={item?.item?._id}
        likes={item?.item?.likes}
        dislikes={item?.item?.dislikes}
        saved={item?.item?.saved}
        comments={item?.item?.comments}
        shared={item?.item?.shared}
        userId={user.data._id}
      />
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

export default PostViewNoMedia;
