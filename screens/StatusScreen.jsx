import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  StyleSheet,
  Image,
  Text,
} from "react-native";
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Entypo,
  EvilIcons,
} from "@expo/vector-icons";

import MyText from "../components/MyText";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { url } from "../store/api";
import StatusView from "../components/StatusView";
import { Video } from "expo-av";
import { ProgressBar } from "react-native-progress";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const StatusScreen = ({ route, navigation }) => {
  const { userId } = route.params;
  console.log("user id", userId);
  const [currentStatus, setCurrentStatus] = useState([]);

  const [showItem, setShowItem] = useState(currentStatus[0]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 30; // Duration in seconds
    const interval = 100; // Update interval in milliseconds
    const steps = (duration * 1000) / interval;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = currentStep / steps;
      setProgress(newProgress);

      if (currentStep === steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const token = await AsyncStorage.getItem("token");
      const config = { headers: { Authorization: token } };
      axios
        .get(`${url}status/${userId}`, config)
        .then((response) => {
          // console.log("status res", response.data.data.files);
          setCurrentStatus(response?.data.data.files);
          setShowItem(currentStatus[0]);
        })
        .catch((error) => {
          console.log("err", error);
        });
    };
    fetchData();
  }, [userId]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, currentStatus.length - 1)
    );
    console.log("changed");
  };

  // setTimeout(handleNext, 30000);

  const renderItem = ({ item }) => {
    return (
      <View key={item._id}>
        <Image source={{ uri: item.media.text }} style={styles.image} />
        <Text style={styles.text}>{item.media.caption}</Text>
      </View>
    );
  };

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View>
        <Text style={{ color: "#05375a" }}>{`No Update Yet!`}</Text>
      </View>
    );
  };

  {
    currentStatus[currentIndex]?.media.text == ""
      ? console.log("curr", currentStatus[currentIndex]?.media)
      : null;
  }

  const renderView = () => {
    if (
      currentStatus[currentIndex]?.media.text.endsWith(".jpg") ||
      currentStatus[currentIndex]?.media.text.endsWith(".jpeg") ||
      currentStatus[currentIndex]?.media.text.endsWith(".png")
    ) {
      return (
        <View className="flex justify-center items-center h-[100%] w-[100%] bg-black">
          <Image
            source={{ uri: currentStatus[currentIndex]?.media.text }}
            style={styles.image}
          />
          <View className="flex justify-center items-center h-[100px] w-full absolute bg-black/50 bottom-0">
            <MyText
              myStyle={"text-white"}
              content={currentStatus[currentIndex]?.media.caption}
            />
          </View>
        </View>
      );
    } else if (currentStatus[currentIndex]?.media.text.endsWith(".mp4")) {
      return (
        <View className="flex justify-center items-center h-[100%] w-[100%] bg-black">
          <Video
            ref={videoRef}
            source={{ uri: currentStatus[currentIndex]?.media.text }}
            className={"w-full h-full"}
            // controls={true}
            resizeMode="cover"
            shouldPlay={true}
            isLooping={true}
          />
          <View className="flex justify-center items-center h-[100px] w-full absolute bg-black/50 bottom-0">
            <MyText
              myStyle={"text-white"}
              content={currentStatus[currentIndex]?.media.caption}
            />
          </View>
        </View>
      );
    } else if (currentStatus[currentIndex]?.media.text == "") {
      return (
        <View
          className={`flex justify-center items-center h-[100%] w-[100%] bg-[#a020f0]`}
        >
          <View
            className={`flex justify-center items-center h-full w-full bg-[${currentStatus[currentIndex]?.media.backgroundColor}] bottom-0`}
          >
            <MyText
              myStyle={"text-white text-2xl font-bold"}
              content={currentStatus[currentIndex]?.media.caption}
            />
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 justify-center items-center h-screen w-screen bg-[#3B7CDD]">
      <StatusBar style="light" />
      {/* <FlatList
        data={currentStatus}
        horizontal
        // renderItem={renderItem}
        renderItem={({ item }) => (
          <StatusView data={item} currentVisibleItem={showItem} />
        )}
        ListEmptyComponent={ListEmptyComponent}
        keyExtractor={keyExtractor}
        onViewableItemsChanged={onViewRef.current}
        snapToAlignment="center"
        snapToInterval={widthScreen}
        scrollEventThrottle={200}
        decelerationRate={"fast"}
        viewabilityConfig={{
          waitForInteraction: false,
          viewAreaCoveragePercentThreshold: 100,
        }}
        showsHorizontalScrollIndicator={false}
      /> */}
      {renderView()}

      <View className="absolute flex flex-row justify-center items-end top-0 h-16 p-1 w-full">
        {currentStatus.map((item) => {
          return item?._id === showItem?._id ? (
            <View className="bg-white rounded-full h-[3px] flex-grow flex-shrink mx-[2px]"></View>
          ) : (
            <View className="bg-gray-200 rounded-full h-[3px] flex-grow flex-shrink mx-[2px]"></View>
          );
        })}
        {/* <ProgressBar progress={progress} width={200} /> */}
      </View>
      <View className="absolute h-full w-full flex flex-row justify-center items-center">
        <TouchableOpacity
          className="h-full w-1/2"
          onPress={() => handlePrev()}
          disabled={currentIndex === 0}
        ></TouchableOpacity>
        <TouchableOpacity
          className="h-full w-1/2"
          onPress={() => handleNext()}
          disabled={currentIndex === currentStatus.length - 1}
        ></TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 200,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
  },
  image: {
    width: windowWidth,
    height: windowHeight / 2,
    resizeMode: "stretch",
  },
});

export default StatusScreen;
