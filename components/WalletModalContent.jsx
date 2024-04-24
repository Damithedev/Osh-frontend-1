import React, { useState } from "react";
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
import MyTextInput from "./MyTextInput";
import { useNavigation } from "@react-navigation/native";

const WalletModalContent = () => {
  const navigation = useNavigation();
  const profile = useSelector((state) => state.profile);
  const [fundAmount, setFundAmount] = useState("");

  const dispatch = useDispatch();

  return (
    <View className="flex items-center justify-start bg-white w-[90%] rounded-xl p-2">
      <MyText content="Add funds" myStyle="font-bold text-lg" />
      <View className="flex flex-col items-start my-1 w-full p-2">
        <MyText
          content="Amount to add"
          myStyle="text-black font-normal text-lg"
        />
        <View className="flex flex-row justify-between w-full border-b py-1">
          <View className="w-[80%]">
            <MyTextInput
              value={fundAmount}
              onChangeText={(text) => setFundAmount(text)}
              className="w-full"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("PayStack", {
                email: profile?.data?.data?.email,
                amount: fundAmount,
              })
            }
            className="flex justify-center items-center bg-[#380181] px-2 text-white rounded-sm"
          >
            <MyText content="Next" myStyle="text-white" />
          </TouchableOpacity>
        </View>
      </View>
      <View className="flex flex-col items-start my-1 w-full p-2">
        <MyText
          content="Add payment method"
          myStyle="text-black font-normal text-lg"
        />
        <View className="flex flex-row justify-between w-full py-1">
          <View className="w-[80%]">
            <MyText
              content="Naira payment with PayStack"
              myStyle="text-black font-normal text-lg"
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            className="flex justify-center items-center bg-[#380181] h-5 w-5 text-white rounded-full"
          ></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WalletModalContent;
