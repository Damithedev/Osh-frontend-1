import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";
import WalletModalContent from "../components/WalletModalContent";

const WalletScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen bg-[#380181]">
      <StatusBar style="light" />
      <View className="flex justify-start items-center h-full w-full">
        <View className="flex flex-col justify-between items-center mt-10 p-4 h-1/3 w-full bg-[#380181]">
          <View className="flex flex-row justify-between items-center w-full">
            <View className="flex justify-between items-center">
              <MyText
                content="Hello, Fagis"
                myStyle="text-2xl font-bold text-white"
              />
            </View>
            <View className="flex justify-between items-center bg-white rounded-full">
              <Image
                source={require("../assets/Avatar-19.png")}
                style={{ width: 40, height: 40 }}
              />
            </View>
          </View>
          <View className="flex justify-between w-full rounded-md h-[80px] bg-white p-2">
            <MyText content="Total balance" myStyle="font-semibold" />
            <MyText
              content="$100,000,000.00"
              myStyle="text-3xl font-bold text-black"
            />
          </View>
          <View className="flex flex-row w-full justify-evenly items-center">
            <TouchableOpacity
              onPress={() => setModalVisible(true)}
              activeOpacity={0.8}
              className="flex flex-col justify-center items-center"
            >
              <AntDesign name="login" size={20} color="white" />
              <MyText
                content="Deposit"
                myStyle="font-semibold text-white text-xs"
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex flex-col justify-center items-center"
            >
              <AntDesign name="logout" size={20} color="white" />
              <MyText
                content="Withdraw"
                myStyle="font-semibold text-white text-xs"
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              className="flex flex-col justify-center items-center"
            >
              <AntDesign name="swap" size={20} color="white" />
              <MyText
                content="Transfer"
                myStyle="font-semibold text-white text-xs"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View className="flex justify-center items-center h-2/3 w-full bg-white"></View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="flex justify-center items-center w-full bg-black/60 h-full"
        >
          <WalletModalContent
            postId={""}
            channelId={""}
            channelName={""}
            userId={""}
          />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default WalletScreen;
