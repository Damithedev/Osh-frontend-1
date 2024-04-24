import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { url } from "../store/api";

const SearchScreen = ({ navigation }) => {
  const [isSearch, setIsSearch] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const [searchOutput, setSearchOutput] = useState([]);
  const isSubmitDisable =
    "flex justify-center items-center p-1 px-2 rounded-full bg-gray-300 w-full";
  const isSubmitNotDisable =
    "flex justify-center items-center p-1 px-2 rounded-full bg-[#380181] w-full";

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    isSearch ? setIsDisabled(false) : setIsDisabled(true);
  }, [isSearch]);

  const fetchData = async (query) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}users/search/?q=${query}`, config)
      .then((response) => {
        console.log("search output", response.data);
        setSearchOutput(response.data.data);
      })
      .catch((error) => {
        console.log("err", error);
      });
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() =>
          navigation.navigate("UserProfile", { username: item?.username })
        }
        className="flex flex-row justify-start items-center border-b-gray-200 border-b my-1 w-full"
      >
        <View className="flex justify-center items-center w-[15%]">
          <Image
            source={{ uri: item.avatar }}
            style={{
              width: 48,
              height: 48,
              backgroundColor: "#380181",
              borderRadius: 50,
            }}
          />
        </View>
        <View className="flex justify-center items-start w-[80%] py-1 my-1 ml-1">
          <MyText
            content={item.name}
            myStyle="text-black font-normal text-justify text-sm"
          />
          <MyText
            content={item.username}
            myStyle="text-black font-normal text-gray-400 text-sm"
          />
        </View>
        {/* <TouchableOpacity
          className="w-[5%] flex justify-center items-center"
          activeOpacity={0.8}
          onPress={() => alert("okayy")}
        >
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity> */}
      </TouchableOpacity>
    );
  };

  const onSearch = (data) => {
    const searchInput = isSearch;
    console.log(searchInput);
    fetchData(searchInput);
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
    <SafeAreaView className="flex-1 justify-start items-center w-screen bg-white px-3">
      <StatusBar style="auto" />
      <View className="flex justify-start items-center h-full w-full mt-14 p-1">
        <View className="flex flex-row justify-center items-center w-full mx-2">
          <View>
            <AntDesign name="search1" size={24} color="black" />
          </View>
          <View className="flex flex-row justify-between items-center w-[full] border-b ml-3 border-b-[#C1C1C1]">
            <View className="w-[78%]">
              <Controller
                control={control}
                name="search"
                rules={{ required: false }}
                render={({
                  field: { value, onChange, onBlur },
                  fieldState: { error },
                }) => (
                  <MyTextInput
                    value={isSearch}
                    onChangeText={(text) => setIsSearch(text)}
                    onBlur={onBlur}
                    placeholder={`Search Oosh`}
                  />
                )}
              />
            </View>
            <View className="flex justify-center items-center w-[20%] my-1">
              <TouchableOpacity
                className={
                  isDisabled === true ? isSubmitDisable : isSubmitNotDisable
                }
                activeOpacity={0.8}
                disabled={isDisabled}
                onPress={handleSubmit(onSearch)}
              >
                <MyText myStyle="text-xs text-white" content={"Search"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {searchOutput.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={searchOutput}
            ListEmptyComponent={ListEmptyComponent}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            // ListFooterComponent={renderFooter}
            // onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            ListHeaderComponent=""
          />
        ) : (
          <View className="w-full">
            <View className="flex flex-col w-full m-2">
              <MyText
                content={"Trends for you"}
                myStyle={"font-bold text-xl"}
              />
            </View>
            <View className="flex w-full justify-start items-start my-2">
              <TouchableOpacity className="flex flex-col my-2">
                <View className="flex flex-row justify-center items-center">
                  <Feather name="trending-up" size={18} color="gray" />
                  <MyText
                    content={"Trending today"}
                    myStyle={"font-bold text-sm text-gray-600 ml-2"}
                  />
                </View>
                <MyText
                  content={"fuel_scarcity"}
                  myStyle={"font-bold text-lg text-black my-px"}
                />
                <MyText
                  content={"2k posts"}
                  myStyle={"font-bold text-xs text-gray-600"}
                />
              </TouchableOpacity>
              <TouchableOpacity className="flex flex-col my-2">
                <View className="flex flex-row justify-center items-center">
                  <Feather name="trending-up" size={18} color="gray" />
                  <MyText
                    content={"Trending this week"}
                    myStyle={"font-bold text-sm text-gray-600 ml-2"}
                  />
                </View>
                <MyText
                  content={"fuel_scarcity"}
                  myStyle={"font-bold text-lg text-black my-px"}
                />
                <MyText
                  content={"2k posts"}
                  myStyle={"font-bold text-xs text-gray-600"}
                />
              </TouchableOpacity>
              <TouchableOpacity className="flex flex-col my-2">
                <View className="flex flex-row justify-center items-center">
                  <Feather name="trending-up" size={18} color="gray" />
                  <MyText
                    content={"Trending this month"}
                    myStyle={"font-bold text-sm text-gray-600 ml-2"}
                  />
                </View>
                <MyText
                  content={"fuel_scarcity"}
                  myStyle={"font-bold text-lg text-black my-px"}
                />
                <MyText
                  content={"2k posts"}
                  myStyle={"font-bold text-xs text-gray-600"}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
