import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Button,
} from "react-native";
import { useSelector } from "react-redux";
import { Ionicons, FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import {
  Bubble,
  GiftedChat,
  Send,
  InputToolbar,
} from "react-native-gifted-chat";

import { url } from "../store/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useDispatch } from "react-redux";

// import { socket } from "../utils";
import io from "socket.io-client";
const socket = io("http://localhost:5000");

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";
import { createCall } from "../store/actions/callActions";

const DiscourseContentScreen = ({ navigation, route }) => {
  const { topicChatUserId, topicChatUser } = route.params;
  const profile = useSelector((state) => state.profile);
  const [messages, setMessages] = useState([]);
  const [onCall, setOnCall] = useState(false);
  const [modalOnCall, setModalOnCall] = useState(false);
  // const [chatId, setChatId] = useState("");
  const chatId = useRef();

  const dispatch = useDispatch();

  const client = useStreamVideoClient();

  function generateRandomString(length) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }

  const onCreateCall = () => {
    if (!client) {
      return;
    }
    const callId = generateRandomString(5);
    console.log("Creating a call ID with ", callId);
    const call = client.call("default", callId);
    call.getOrCreate();
    navigation.navigate("VoiceCall");
  };

  const onUserPressed = () => {
    if (!client) {
      return;
    }
    const callId = generateRandomString(5);
    const profileUser = profile?.data?.data?.username;
    client.call("default", callId).getOrCreate({
      ring: true,
      data: {
        members: [
          { user_id: profile?.data?.data?.username },
          { user_id: topicChatUser },
        ],
      },
    });
    dispatch(createCall({ caller: profileUser, callClient: topicChatUser }));
    navigation.navigate("VoiceCall");
  };

  // console.log("user id", topicChatUserId, "topic chat user", topicChatUser);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      const config = { headers: { Authorization: token } };
      axios
        .post(`${url}discourse/${topicChatUserId}/discourse`, "", config)
        .then((response) => {
          const reversedMessages = response?.data.data.messages.reverse();
          setMessages(reversedMessages);
          chatId.current = response?.data.data._id;
        })
        .catch((error) => {
          console.log("err", error);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    console.log("chat id", chatId);
  }, [chatId]);

  const onSend = useCallback((messages = []) => {
    console.log("send mesg", messages[0]);
    var formData = new FormData();
    const text = messages[0].text;
    formData.append("text", text);

    const sendData = async () => {
      console.log("sending...", chatId.current);
      const token = await AsyncStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
          Authorization: token,
        },
      };
      console.log("chat id", chatId.current);
      axios
        .post(`${url}discourse/${chatId?.current}/message`, formData, config)
        .then((response) => {
          console.log("send msgs", response.data);
        })
        .catch((error) => {
          console.log("err", error);
        });
    };
    sendData();
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <View className="bg-[#f1f1f1] w-full h-[100px]">
        <View className="flex flex-row items-center justify-between absolute bottom-2 left-2 w-[96%]">
          <View className="flex flex-row items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={20} color="#000" />
            </TouchableOpacity>
            <View
              className="flex justify-between items-center bg-white rounded-full"
              style={{ width: 40, height: 40, marginLeft: 10 }}
            >
              <Image
                source={require("../assets/Avatar-19.png")}
                style={{ width: 40, height: 40 }}
              />
            </View>
            <MyText content={topicChatUser} myStyle="ml-3 text-black text-lg" />
          </View>
          <View className="flex flex-row w-[100px] justify-evenly">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onUserPressed}
              className="flex justify-center items-center p-2"
            >
              <FontAwesome name="phone" size={20} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={onUserPressed}
              className="flex justify-center items-center p-2"
            >
              <FontAwesome name="video-camera" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: profile?.data?.data?._id,
          }}
          alwaysShowSend
          // renderMessageVideo={(props) => {

          // }}
          scrollToBottom
          isTyping={true}
          renderUsername={true}
          renderSend={(props) => {
            return (
              <View className="flex flex-row items-center ">
                <TouchableOpacity className="my-2 mx-1">
                  <Entypo name="attachment" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className="my-2 mx-1">
                  <FontAwesome name="microphone" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity className="my-2 mx-1">
                  <FontAwesome name="picture-o" size={24} color="black" />
                </TouchableOpacity>
                <Send {...props}>
                  <View className="m-2">
                    <Ionicons name="send-sharp" size={24} color="black" />
                  </View>
                </Send>
              </View>
            );
          }}
        />
      </View>
      {modalOnCall && (
        <View className="flex justify-center items-center w-full h-full bg-black/70 absolute"></View>
      )}
    </>
  );
};

export default DiscourseContentScreen;
