import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { getFacets, subscribeFacet } from "../store/actions/facetsActions";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";

const FacetsScreen = ({ navigation }) => {
  const facets = useSelector((state) => state.facets);
  const profile = useSelector((state) => state.profile);
  const facetItems = facets?.data?.data;
  const [step, setStep] = useState();

  const [isSearch, setIsSearch] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
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

  const onSearch = (data) => {
    const searchInput = isSearch;
    console.log(searchInput);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFacets());
  }, [facets]);

  const renderFollow = ({ item }) => {
    return (
      <View className="flex p-1">
        <View className="flex flex-row justify-between items-center w-full border-b border-b-[#c1c1c1]">
          <View className="flex justify-start items-start w-[55%]">
            <MyText
              content={item.name}
              myStyle={"font-bold text-center text-sm"}
            />
            <MyText
              content={item.description}
              myStyle={"text-center text-xs"}
            />
          </View>

          <TouchableOpacity
            onPress={() => dispatch(subscribeFacet(item.name))}
            disabled={item.name === "lifestyle" ? true : false}
            className="flex justify-center items-center rounded-lg bg-[#000000] p-2 my-4"
          >
            <MyText
              content={
                item?.subscribers.includes(profile?.data.data._id)
                  ? "unsubscribe"
                  : "subscribe"
              }
              myStyle={"font-bold text-white text-center text-sm"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View>
        <MyText myStyle={{ color: "#05375a" }} content={"No Update Yet!"} />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 justify-start items-center w-screen bg-white px-3">
      <StatusBar style="auto" />
      <View className="flex flex-col justify-start items-center h-full w-full mt-14 p-1">
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
                    placeholder={`Search Facet`}
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
                <MyText myStyle="text-sm text-white" content={"Search"} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex flex-row justify-center items-center">
          <FlatList
            showsVerticalScrollIndicator={false}
            data={facets?.data.data}
            ListEmptyComponent={ListEmptyComponent}
            renderItem={renderFollow}
            keyExtractor={keyExtractor}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FacetsScreen;
