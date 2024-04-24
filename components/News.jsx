import React from "react";
import { View, Text, FlatList } from "react-native";
import MarqueeText from "react-native-marquee";
import MyText from "./MyText";
import { news } from "../data/news";
import { Ionicons } from "@expo/vector-icons";

const News = () => {
  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View>
        <Text style={{ color: "#05375a" }}>{`No Update Yet!`}</Text>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    return <MyText myStyle="font-bold" content={item.heading} />;
  };

  return (
    <View className="flex flex-row justify-between items-center w-full h-full bg-[#ffffff]">
      <View className="flex flex-row justify-center items-center w-[60px] bg-black h-full">
        <Ionicons name="newspaper" size={18} color="white" />
        <MyText content="News" myStyle={"text-xs font-bold text-white"} />
      </View>
      <MarqueeText
        className="flex flex-row w-full"
        speed={1}
        marqueeOnStart={true}
        loop={true}
        delay={1000}
      >
        {news.map((n) => (
          <MyText myStyle="font-bold" content={n.heading} />
        ))}
      </MarqueeText>
    </View>
  );
};

export default News;
