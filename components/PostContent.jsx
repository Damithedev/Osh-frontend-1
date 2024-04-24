import React from "react";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import MyText from "./MyText";

const PostContent = ({ item }) => {
  console.log("iitteemm", item?.files);
  const navigation = useNavigation();

  return (
    <View className="flex flex-col pb-4 relative">
      {item?.files.length == 4 && (
        <View className="flex flex-row justify-between items-center w-full">
          <View className="flex flex-col w-1/2 h-48 justify-between items-center mr-px">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Media", { mediaUri: item?.files[0] })
              }
              className="h-1/2 w-full object-cover mb-px"
            >
              <Image
                className="h-full w-full object-cover mb-px"
                source={{
                  uri: item.files[0],
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Media", { mediaUri: item?.files[1] })
              }
              className="h-1/2 w-full object-cover mt-px"
            >
              <Image
                className="h-full w-full object-cover mt-px"
                source={{
                  uri: item.files[1],
                }}
              />
            </TouchableOpacity>
          </View>
          <View className="flex flex-col w-1/2 h-48 justify-between items-center ml-px">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Media", { mediaUri: item?.files[2] })
              }
              className="h-1/2 w-full object-cover mb-px"
            >
              <Image
                className="h-full w-full object-cover mb-px"
                source={{
                  uri: item.files[2],
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Media", { mediaUri: item?.files[3] })
              }
              className="h-1/2 w-full object-cover mb-px"
            >
              <Image
                className="h-full w-full object-cover mb-px"
                source={{
                  uri: item.files[3],
                }}
              />
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={["transparent", "#000000"]}
            style={styles.background}
          />
        </View>
      )}
      {item?.files.length == 3 && (
        <View className="flex flex-row justify-between items-center w-full">
          <View className="flex flex-row justify-between items-center w-full">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Media", { mediaUri: item?.files[0] })
              }
              className="h-48 w-1/2 object-cover ml-px rounded-l-md"
            >
              <Image
                className="h-48 w-full object-cover mr-px rounded-l-md"
                source={{ uri: item?.files[0] }}
              />
            </TouchableOpacity>
            <View className="flex flex-col w-1/2 h-48 justify-between items-center ml-px">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("Media", { mediaUri: item?.files[1] })
                }
                className="h-1/2 w-full object-cover mb-px rounded-tr-md"
              >
                <Image
                  className="h-full w-full object-cover mb-px rounded-tr-md"
                  source={{ uri: item?.files[1] }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("Media", { mediaUri: item?.files[2] })
                }
                className="h-1/2 w-full object-cover mt-px rounded-br-md"
              >
                <Image
                  className="h-full w-full object-cover mt-px rounded-br-md"
                  source={{ uri: item?.files[2] }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <LinearGradient
            colors={["transparent", "#000000"]}
            style={styles.background}
          />
        </View>
      )}
      {item?.files.length == 2 && (
        <View className="flex flex-row justify-between items-center w-full">
          <View className="flex flex-row justify-between items-center w-full">
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Media", { mediaUri: item?.files[0] })
              }
              className="h-48 w-1/2 object-cover mr-px rounded-l-md"
            >
              <Image
                className="h-48 w-full object-cover mr-px rounded-l-md"
                source={{ uri: item?.files[0] }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate("Media", { mediaUri: item?.files[1] })
              }
              className="h-48 w-1/2 object-cover ml-px rounded-r-md"
            >
              <Image
                className="h-48 w-full object-cover ml-px rounded-r-md"
                source={{ uri: item?.files[1] }}
              />
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={["transparent", "#000000"]}
            style={styles.background}
          />
        </View>
      )}
      {item?.files.length == 1 && (
        <View className="flex flex-row justify-between items-center w-full">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("Media", { mediaUri: item?.files[0] })
            }
            className="h-48 w-full object-cover rounded-md"
          >
            <Image
              className="h-48 w-full object-cover rounded-md"
              source={{ uri: item?.files[0] }}
            />
            <LinearGradient
              colors={["transparent", "#000000"]}
              style={styles.background}
            />
          </TouchableOpacity>
        </View>
      )}
      <View className="flex justify-center items-center bg-[#F0F2F5] rounded-t-lg mx-1 mb-2 mt-[-2px] p-1 pb-4">
        <MyText
          myStyle="text-sm text-justify leading-none"
          content={item?.text}
        />
      </View>
    </View>
  );
};

export default PostContent;

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 30,
  },
  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 10,
  },
});
