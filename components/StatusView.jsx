import { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  Pressable,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { Video } from "expo-av";
import { reels } from "../data/reels";
import MyText from "./MyText";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import CommentNoMedia from "./CommentNoMedia";
import CommentOneMedia from "./CommentOneMedia";
import CommentTwoMedia from "./CommentTwoMedia";
import CommentThreeMedia from "./CommentThreeMedia";
import CommentFourMedia from "./CommentFourMedia";
import {
  MaterialCommunityIcons,
  FontAwesome,
  Ionicons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { likeTimelineReel } from "../store/actions/reelTimelineAction";
import { getReelComments } from "../store/actions/reelCommentActions";
import MyTextInput from "./MyTextInput";
import { url } from "../store/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const { width: widthScreen } = Dimensions.get("screen");

const StatusView = ({ data, currentVisibleItem }) => {
  console.log("data", data);
  const dispatch = useDispatch();

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View className="flex justify-center items-center w-full">
        <FontAwesome name="comments-o" size={50} color="black" />
        <MyText myStyle="text-sm font-black" content={"No comments yet"} />
        <MyText myStyle="text-sm" content={"Be the first to engage"} />
      </View>
    );
  };

  const navigation = useNavigation();

  // useEffect(() => {
  //   if (currentVisibleItem?._id === data?._id) {
  //     video.current?.playAsync();
  //   } else {
  //     video.current?.pauseAsync();
  //   }
  // }, [currentVisibleItem]);

  // function handlePlayer() {
  //   status.isPlaying ? video.current?.pauseAsync() : video.current.playAsync();
  // }

  return (
    <View key={data._id}>
      <Image source={{ uri: data.media.text }} style={styles.image} />
      <Text style={styles.text}>{data.media.caption}</Text>
    </View>
    // <View>
    //   <Pressable onPress={handlePlayer}>
    //     <Video
    //       ref={video}
    //       style={{ width: "100%", height: heightScreen }}
    //       source={{ uri: data?.video }}
    //       resizeMode="cover"
    //       shouldPlay={false}
    //       isMuted={false}
    //       isLooping
    //       onPlaybackStatusUpdate={(status) => setStatus(() => status)}
    //     />
    //   </Pressable>
    // </View>
  );
};

export default StatusView;

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
    width: widthScreen,
    height: "100%",
    resizeMode: "cover",
  },
});
