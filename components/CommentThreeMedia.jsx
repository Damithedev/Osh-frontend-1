import React, { useState } from "react";
import MyText from "./MyText";
import { View, Image, TouchableOpacity, Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import MyTimelineText from "./MyTimelineText";
import PostFooter from "./PostFooter";
import PostModalContent from "./PostModalContent";

import { useNavigation } from "@react-navigation/native";

const CommentThreeMedia = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View className="w-full bg-white border border-gray-200 rounded-md my-1">
      <View className="flex flex-row justify-between items-center w-full p-2">
        <View className="flex flex-row items-center">
          <View className="flex justify-center items-center rounded-full bg-[#380181]">
            <Image
              source={require("../assets/Avatar-19.png")}
              style={{ width: 50, height: 50 }}
            />
          </View>
          <View className="ml-2">
            <MyText
              myStyle="text-sm font-black"
              content={item?.item?.user?.name}
            />
            <MyText myStyle="text-sm" content={item?.item?.user?.userName} />
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
        >
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("Post")}
      >
        <View className="flex flex-col items-center w-full p-1 bg-[#F0F2F5]">
          <MyTimelineText
            myStyle="text-sm text-justify leading-none my-1"
            content="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
          />
          <View className="flex flex-row justify-between items-center w-full">
            <Image
              className="h-48 w-1/2 object-cover mr-px"
              source={{
                uri: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
              }}
            />
            <View className="flex flex-col w-1/2 h-48 justify-between items-center ml-px">
              <Image
                className="h-1/2 w-full object-cover mb-px"
                source={{
                  uri: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                }}
              />
              <Image
                className="h-1/2 w-full object-cover mt-px"
                source={{
                  uri: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJhbHxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
                }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <PostFooter />
      <View className="flex flex-row items-center justify-between w-full p-1 my-1 border-y border-y-gray-200 h-24 bg-[#F0F2F5]">
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
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="w-full bg-black/60 h-full"
        >
          <PostModalContent />
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CommentThreeMedia;
