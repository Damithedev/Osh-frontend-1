import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  Entypo,
  EvilIcons,
} from "@expo/vector-icons";

import MyText from "../components/MyText";
import { notification } from "../data/notification";

const NotificationScreen = ({ navigation }) => {
  const [page, setPage] = useState(1);

  const renderItem = ({ item }) => {
    return (
      <View className="flex flex-row justify-start items-center border-b-gray-200 border-b my-1 w-full">
        <View className="flex justify-center items-center w-[15%]">
          <Image
            source={{ uri: item.user.avatar }}
            style={{
              width: 48,
              height: 48,
              backgroundColor: "#380181",
              borderRadius: 50,
            }}
          />
        </View>
        <View className="flex justify-center items-start w-[80%] py-1">
          <MyText
            content={item.text}
            myStyle="text-black font-normal text-justify text-sm"
          />
          <MyText
            content={item.createdAt}
            myStyle="text-black font-normal text-gray-400 text-sm"
          />
        </View>
        <TouchableOpacity
          className="w-[5%] flex justify-center items-center"
          activeOpacity={0.8}
          onPress={() => alert("okayy")}
        >
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>
    );
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View>
        <MyText content={"No update yet"} myStyle={"text-#05375a"} />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen bg-white p-1">
      <StatusBar style="auto" />
      <View className="flex justify-start items-center h-full w-full mt-14 p-1">
        <View className="flex flex-row w-full justify-between items-start mb-5">
          <View className="flex flex-row justify-center items-center">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons
                name="arrow-u-left-top"
                size={24}
                color="black"
              />
            </TouchableOpacity>
            <MyText
              content={"Notifications"}
              myStyle={"font-bold text-xl ml-1"}
            />
          </View>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={[]}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          // ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListHeaderComponent=""
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;
