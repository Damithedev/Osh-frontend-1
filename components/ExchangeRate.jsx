import React from "react";
import { View, Text } from "react-native";
import MarqueeText from "react-native-marquee";
import MyText from "./MyText";
import { MaterialIcons } from "@expo/vector-icons";

const ExchangeRate = () => {
  return (
    <View className="flex flex-row justify-between items-center w-full h-full bg-[#05022C]">
      <View className="flex flex-row justify-center items-center w-[60px] bg-white h-full">
        {/* <MaterialIcons name="attach-money" size={18} color="blue" /> */}
        <MyText content="X Rate" myStyle={"text-xs font-bold"} />
      </View>
      <MarqueeText
        style={{ color: "white" }}
        className="w-full"
        speed={1}
        marqueeOnStart={true}
        loop={true}
        delay={1000}
      >
        <Text className="mx-4 text-green-500"> NGN +34 </Text>
        <Text className="mx-4 text-green-500"> GER +34 </Text>
        <Text className="mx-4 text-red-500"> DOL -34 </Text>
        <Text className="mx-4 text-red-500"> USA -34 </Text>
        <Text className="mx-4 text-green-500"> NGN +34 </Text>
        <Text className="mx-4 text-green-500"> GER +34 </Text>
        <Text className="mx-4 text-red-500"> DOL -34 </Text>
        <Text className="mx-4 text-red-500"> USA -34 </Text>
        <Text className="mx-4 text-green-500"> NGN +34 </Text>
        <Text className="mx-4 text-green-500"> GER +34 </Text>
      </MarqueeText>
    </View>
  );
};

export default ExchangeRate;
