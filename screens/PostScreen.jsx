import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  FlatList,
} from "react-native";
import { Feather, MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import PostContent from "../components/PostContent";
import { useDispatch, useSelector } from "react-redux";

import MyText from "../components/MyText";
import PostFooter from "../components/PostFooter";
import PostModalContent from "../components/PostModalContent";

import CommentOneMedia from "../components/CommentOneMedia";
import CommentTwoMedia from "../components/CommentTwoMedia";
import CommentThreeMedia from "../components/CommentThreeMedia";
import CommentFourMedia from "../components/CommentFourMedia";
import CommentNoMedia from "../components/CommentNoMedia";

import PostViewOneMedia from "../components/PostViewOneMedia";
import PostViewTwoMedia from "../components/PostViewTwoMedia";
import PostViewThreeMedia from "../components/PostViewThreeMedia";
import PostViewFourMedia from "../components/PostViewFourMedia";
import PostViewNoMedia from "../components/PostViewNoMedia";

import { getPost } from "../store/actions/postActions";
import PostContentFooter from "../components/PostContentFooter";
import { getComments } from "../store/actions/commentActions";
import { getParents } from "../store/actions/parentActions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { url } from "../store/api";

const PostScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  console.log("post id", postId);
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.auth);
  const comment = useSelector((state) => state.comment);
  // const parent = useSelector((state) => state.parent);

  const [modalVisible, setModalVisible] = useState(false);

  const [showSecondLevel, setShowSecondLevel] = useState(false);
  const [showThirdLevelEvidentOne, setShowThirdLevelEvidentOne] =
    useState(false);
  const [showThirdLevelEvidentTwo, setShowThirdLevelEvidentTwo] =
    useState(false);
  const [showThirdLevelEvidentThree, setShowThirdLevelEvidentThree] =
    useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(postId));
    dispatch(getComments(postId));
  }, [postId]);

  console.log("Postt", post);

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

  const renderItem = () => {
    if (post?.data.text?.files?.length == 4) {
      return <PostViewFourMedia item={post.data} />;
    } else if (post.data?.text?.files?.length == 3) {
      return <PostViewThreeMedia item={post.data} />;
    } else if (post.data?.text?.files?.length == 2) {
      return <PostViewTwoMedia item={post.data} />;
    } else if (post.data?.text?.files?.length == 1) {
      return <PostViewOneMedia item={post.data} />;
    } else if (post.data?.text?.files?.length == 0) {
      return <PostViewNoMedia item={post.data} />;
    }
  };

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View className="flex justify-center items-center w-full">
        <FontAwesome name="comments-o" size={50} color="black" />
        <MyText myStyle="text-sm font-black" content={"No discussions yet"} />
        <MyText myStyle="text-sm" content={"Be the first to engage"} />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 mt-10 bg-white">
      <StatusBar style="auto" />
      <View className="mb-5">{renderItem(post?.data)}</View>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comment?.data}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={renderCommentItem}
          keyExtractor={keyExtractor}
          // onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListHeaderComponent=""
        />
      </View>
    </SafeAreaView>
  );
};

export default PostScreen;

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
