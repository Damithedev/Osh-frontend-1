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
} from "react-native";
import { Video } from "expo-av";
import { reels } from "../data/reels";
import MyText from "./MyText";
import { useSelector, useDispatch } from "react-redux";
import { useForm, Controller, set } from "react-hook-form";
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

const { height: heightScreen } = Dimensions.get("screen");

const ReelTwo = ({ data, currentVisibleItem }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isKeyMessage, setIsKeyMessage] = useState("");
  const user = useSelector((state) => state.auth);
  const comments = useSelector((state) => state.reelComment);
  const profile = useSelector((state) => state.profile);
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const [noOfLikes, setNoOfLikes] = useState("");
  const [isLiked, setIsLiked] = useState("");
  const [curComments, setCurComments] = useState([]);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({});

  const onSubmitPost = async () => {
    var formData = new FormData();
    formData.append("keyMessageText", isKeyMessage);
    setCurComments((prev) => [isKeyMessage, ...prev]);
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
        Authorization: token,
      },
    };
    axios
      .patch(`${url}posts/${currentVisibleItem?._id}/comment`, formData, config)
      .then((response) => {
        console.log("comment success", response.data);
        setCurComments((prev) => [response?.data.data, ...prev]);
      })
      .catch((error) => {
        console.log("fail", error.response);
      });
    setIsKeyMessage("");
  };

  const getReelComments = async () => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    // console.log("reel id", data?._id);
    axios
      .get(`${url}reels/${data?._id}/comments`, config)
      .then((response) => {
        console.log("comment reel success", response.data);
      })
      .catch((error) => {
        console.log("comment from action", error);
      });
  };

  const onClick = () => {
    setClick(!click);
    if (isLiked === "white") {
      setIsLiked("red");
      setNoOfLikes(noOfLikes + 1);
    }
    if (isLiked === "red") {
      setIsLiked("white");
      setNoOfLikes(noOfLikes - 1);
    }
    dispatch(likeTimelineReel(data._id));
    console.log("clicked");
  };

  const renderCommentItem = ({ item }) => {
    if (item?.text?.files?.length == 4) {
      return <CommentFourMedia item={item} />;
    } else if (item?.text?.files?.length == 3) {
      return <CommentThreeMedia item={item} />;
    } else if (item?.text?.files?.length == 2) {
      return <CommentTwoMedia item={item} />;
    } else if (item?.text?.files?.length == 1) {
      return <CommentOneMedia item={item} />;
    } else if (item?.text?.files?.length == 0) {
      return <CommentNoMedia item={item} />;
    }
  };

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

  useEffect(() => {
    console.log("curr", currentVisibleItem);
    if (currentVisibleItem?._id === data?._id) {
      video.current?.playAsync();
    } else {
      video.current?.pauseAsync();
    }
    setNoOfLikes(currentVisibleItem?.likes.length);
    setCurComments(currentVisibleItem?.comments);
    currentVisibleItem?.likes.includes(profile?.data?.data._id)
      ? setIsLiked("red")
      : setIsLiked("white");
  }, [currentVisibleItem]);

  function handlePlayer() {
    status.isPlaying ? video.current?.pauseAsync() : video.current.playAsync();
  }

  return (
    <View>
      <Pressable onPress={handlePlayer}>
        <View
          style={[
            {
              position: "absolute",
              zIndex: 99,
              left: 8,
              padding: 8,
              bottom: 100,
            },
          ]}
        >
          <MyText
            content={currentVisibleItem?.name}
            myStyle={"text-white font-bold"}
          />
          <MyText
            content={currentVisibleItem?.description}
            myStyle={"text-white"}
          />
        </View>
        <Video
          ref={video}
          style={{ width: "100%", height: heightScreen }}
          source={{ uri: currentVisibleItem?.video }}
          resizeMode="cover"
          shouldPlay={false}
          isMuted={false}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </Pressable>
      <View className="flex items-center justify-between h-[250px] rounded-full absolute bottom-28 right-4">
        <View className="flex justify-center items-center rounded-full bg-[#380181]">
          <Image
            source={
              data?.user.avatar
                ? { uri: data?.user.avatar }
                : require("../assets/Avatar-19.png")
            }
            style={{
              width: 48,
              height: 48,
              resizeMode: "cover",
              borderRadius: 50,
            }}
          />
        </View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onClick()}
          className="flex justify-center items-center"
        >
          <MaterialCommunityIcons
            name="cards-heart"
            size={40}
            color={isLiked}
          />
          <MyText content={noOfLikes} myStyle={"text-white text-normal"} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setModalVisible(true)}
          className="flex justify-center items-center"
        >
          <FontAwesome name="commenting" size={30} color="white" />
          <MyText
            // content={"22"}
            content={curComments?.length}
            myStyle={"text-white text-normal"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => alert("On it!!!")}
          className="flex justify-center items-center"
        >
          <MaterialCommunityIcons name="share" size={30} color="white" />
          <MyText content={22} myStyle={"text-white text-normal"} />
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View className="w-full bg-black/60 h-full">
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            className="w-full h-1/4"
          ></TouchableOpacity>
          <View className="flex items-center w-full z-20 rounded-t-lg bg-white h-3/4 absolute bottom-0">
            <View className="flex flex-row justify-center items-center w-full absolute bottom-0 border-t h-[60px] pb-2 bg-white border-t-[#c1c1c1] p-1">
              <View className="flex justify-center items-center rounded-full bg-[#380181] m-1">
                <Image
                  source={
                    data?.user.avatar
                      ? { uri: data?.user.avatar }
                      : require("../assets/Avatar-19.png")
                  }
                  style={{
                    width: 35,
                    height: 35,
                    resizeMode: "cover",
                    borderRadius: 50,
                  }}
                />
              </View>
              <View className="w-[80%] bg-[#f1f1f1] rounded-lg p-1">
                <Controller
                  control={control}
                  name="keyMessage"
                  rules={{ required: false }}
                  render={({
                    field: { value, onChange, onBlur },
                    fieldState: { error },
                  }) => (
                    <View className="flex-1 w-full h-full">
                      <MyTextInput
                        value={isKeyMessage}
                        onChangeText={(text) => setIsKeyMessage(text)}
                        onBlur={onBlur}
                        className="w-full"
                        placeholder={`Add comment...`}
                        placeholderTextColor={"#c1c1c1"}
                        multiline={true}
                        textAlignVertical="top"
                        numberOfLines={10}
                      />
                    </View>
                  )}
                />
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={onSubmitPost}
                className="flex justify-center items-center w-[10%] p-2"
              >
                <Ionicons name="send" size={20} color="black" />
              </TouchableOpacity>
            </View>
            <View className="w-full p-2">
              <FlatList
                showsVerticalScrollIndicator={false}
                data={curComments}
                ListEmptyComponent={ListEmptyComponent}
                renderItem={renderCommentItem}
                keyExtractor={keyExtractor}
                // onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
                ListHeaderComponent=""
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReelTwo;
