import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import MyText from "../components/MyText";
import { Video } from "expo-av";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const MediaScreen = ({ route, navigation }) => {
  const { mediaUri } = route.params;
  const videoRef = useRef(null);
  const [play, setPlay] = useState(true);
  const [showIcon, setShowIcon] = useState(true);

  {
    showIcon ? setTimeout(() => setShowIcon(false), 3000) : null;
  }

  return (
    <SafeAreaView className="flex-1 mt-10 bg-black">
      <StatusBar style="auto" />
      <View className="flex flex-row h-12 bg-white justify-between items-center p-2 w-full">
        <View className="flex flex-row justify-center items-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="arrow-u-left-top"
              size={24}
              color="black"
            />
          </TouchableOpacity>
          {mediaUri.endsWith(".mp4") && (
            <MyText content={"Video"} myStyle={"font-bold text-xl ml-1"} />
          )}
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => alert("it's working")}
          className="flex flex-row"
        >
          <Ionicons name="cloud-download-outline" size={18} color="black" />
          <MyText
            content="Save"
            myStyle="text-[#380181] font-bold text-justify text-xs ml-1"
          />
        </TouchableOpacity>
      </View>
      <View className="flex w-full justify-center items-center h-4/5 bg-black">
        {mediaUri.endsWith(".jpg") ||
        mediaUri.endsWith(".jpeg") ||
        mediaUri.endsWith(".png") ? (
          <Image style={styles.stretch} source={{ uri: mediaUri }} />
        ) : (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              setPlay(!play), setShowIcon(true);
            }}
            className="flex h-full w-full justify-center items-center"
          >
            <Video
              ref={videoRef}
              source={{ uri: mediaUri }}
              className={"w-full h-full"}
              // controls={true}
              resizeMode="cover"
              shouldPlay={play}
              isLooping={true}
            />
            {showIcon && (
              <View className="flex justify-center items-center h-full w-full absolute self-center">
                {play ? (
                  <View className="p-[2px] rounded-full bg-white">
                    <AntDesign name="play" size={40} color="black" />
                  </View>
                ) : (
                  <View className="p-[2px] rounded-full bg-white">
                    <AntDesign name="pausecircle" size={40} color="black" />
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MediaScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: windowWidth,
    height: windowHeight / 2,
    resizeMode: "stretch",
  },
});
