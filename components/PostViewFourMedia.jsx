import React, { useState } from "react";
import MyText from "./MyText";
import { View, Image, TouchableOpacity, Modal } from "react-native";
import {
  Feather,
  Foundation,
  FontAwesome,
  AntDesign,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { useSelector } from "react-redux";

import MyTimelineText from "./MyTimelineText";
import PostFooter from "./PostFooter";
import PostModalContent from "./PostModalContent";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";

const PostViewFourMedia = (item) => {
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
            <View className="flex flex-row items-start">
              <View className="flex justify-center items-center rounded-full bg-[#380181]">
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
                {user.data.username == item?.item?.user?.userName ? null : (
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
                )}
                <MyText
                  myStyle="text-xs text-gray-500"
                  content={moment(new Date(item.item.createdAt)).fromNow()}
                />
              </View>
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
          <View className="flex flex-row justify-between items-center w-full">
            <View className="flex flex-col w-1/2 h-48 justify-between items-center mr-px">
              <Image
                className="h-1/2 w-full object-cover mb-px"
                source={{ uri: item?.item?.text?.files[0] }}
              />
              <Image
                className="h-1/2 w-full object-cover mt-px"
                source={{ uri: item?.item?.text?.files[1] }}
              />
            </View>
            <View className="flex flex-col w-1/2 h-48 justify-between items-center ml-px">
              <Image
                className="h-1/2 w-full object-cover mb-px"
                source={{ uri: item?.item?.text?.files[2] }}
              />
              <Image
                className="h-1/2 w-full object-cover mt-px"
                source={{ uri: item?.item?.text?.files[3] }}
              />
            </View>
          </View>
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
      {/* <View className="flex flex-row items-center justify-between w-full p-1 my-1 border-y border-y-gray-200 h-24 bg-[#F0F2F5]">
        <View className="flex w-1/3 h-full">
          <Image
            className="h-full w-full object-cover rounded-sm"
            source={{
              uri: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            }}
          />
        </View>
        <View className="flex flex-col justify-between w-2/3 h-full px-1">
          <MyTimelineText
            myStyle="text-xs text-justify leading-none"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          />
          <View className="flex justify-center self-center items-center bg-[#380181] h-1/3 w-full rounded-sm ">
            <MyTimelineText
              myStyle="text-xs text-justify leading-none text-white"
              content="Learn more"
            />
          </View>
        </View>
      </View> */}
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

export default PostViewFourMedia;
