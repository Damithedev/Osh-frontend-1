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

import PostOneMedia from "../components/PostOneMedia";
import PostTwoMedia from "../components/PostTwoMedia";
import PostThreeMedia from "../components/PostThreeMedia";
import PostFourMedia from "../components/PostFourMedia";
import PostNoMedia from "../components/PostNoMedia";

import { getPost } from "../store/actions/postActions";
import PostContentFooter from "../components/PostContentFooter";
import { getComments } from "../store/actions/commentActions";
import { getParents } from "../store/actions/parentActions";

const PostCommentScreen = ({ route, navigation }) => {
  const { postId } = route.params;
  const post = useSelector((state) => state.post);
  const user = useSelector((state) => state.auth);
  const comment = useSelector((state) => state.comment);
  const parent = useSelector((state) => state.parent);

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
    dispatch(getParents(postId));
  }, []);

  useEffect(() => {
    console.log("post", post);
    console.log("commentsss", comment.data.length);
    console.log("parentsss", parent.data.length);
  }, [dispatch]);

  const renderItem = ({ item }) => {
    if (item?.keyMessage?.files?.length == 4) {
      return <CommentFourMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 3) {
      return <CommentThreeMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 2) {
      return <CommentTwoMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 1) {
      return <CommentOneMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 0) {
      return <CommentNoMedia item={item} />;
    }
  };

  const renderParentItem = ({ item }) => {
    if (item?.keyMessage?.files?.length == 4) {
      return <PostFourMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 3) {
      return <PostThreeMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 2) {
      return <PostTwoMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 1) {
      return <PostOneMedia item={item} />;
    } else if (item?.keyMessage?.files?.length == 0) {
      return <PostNoMedia item={item} />;
    }
  };

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View className="flex justify-center items-center w-full">
        <FontAwesome name="comments-o" size={50} color="black" />
        <MyText myStyle="text-sm font-black" content={"No comments yet"} />
        <MyText myStyle="text-sm" content={"Be the first to comment"} />
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 mt-10 bg-white">
      <StatusBar style="auto" />
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={comment?.data}
          ListHeaderComponent={
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                data={parent?.data}
                ListEmptyComponent={null}
                renderItem={renderParentItem}
                keyExtractor={keyExtractor}
                ListFooterComponent={
                  parent.data.length !== 0 && (
                    <View className="w-full border-y border-[#f1f1f1] px-2">
                      <View className="border-l-2 border-[#380181] h-10"></View>
                    </View>
                  )
                }
              />
              <View>
                <View className="flex flex-row justify-between items-center w-full p-2">
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Profile")}
                  >
                    <View className="flex flex-row items-center">
                      <View className="flex justify-center items-center rounded-full bg-[#380181]">
                        <Image
                          source={require("../assets/Avatar-19.png")}
                          style={{ width: 50, height: 50 }}
                        />
                      </View>
                      <View className="ml-2">
                        <MyText
                          myStyle="text-sm font-black"
                          content={post?.data?.data?.user?.name}
                        />
                        <MyText
                          myStyle="text-sm"
                          content={post?.data?.data?.channel?.name}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => setModalVisible(true)}
                  >
                    <Feather name="more-vertical" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                <View>
                  <View>
                    {post?.data?.data?.keyMessage && (
                      <PostContent item={post?.data?.data?.keyMessage} />
                    )}
                    {post?.data?.data?.keyMessage?.text && (
                      <TouchableOpacity
                        onPress={() => setShowSecondLevel(!showSecondLevel)}
                        style={styles.shadow}
                        className="flex justify-center items-center rounded-full p-1 absolute bottom-0 m-1 bg-[#380181]"
                      >
                        <MaterialIcons
                          name={showSecondLevel ? "expand-more" : "expand-less"}
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>
                    )}
                  </View>

                  {/* First argument */}
                  {showSecondLevel && (
                    <View className="flex flex-row items-start justify-end w-full">
                      {/* <View className="flex flex-col items-center justify-center w-[5%] bg-gray-900 border-l border-b border-red-800 rounded-bl-lg">
                      <View className="flex items-center justify-center w-[5%] border-l border-b border-blue-800 rounded-bl-lg"></View>
                    </View> */}
                      <View className="w-[90%] border border-gray-300 rounded-md mt-1">
                        {post?.data?.data?.firstArgument && (
                          <PostContent item={post?.data?.data?.firstArgument} />
                        )}
                        {post?.data?.data?.firstArgumentEvidentOne?.text && (
                          <TouchableOpacity
                            onPress={() =>
                              setShowThirdLevelEvidentOne(
                                !showThirdLevelEvidentOne
                              )
                            }
                            style={styles.shadow}
                            className="flex justify-center items-center rounded-full p-1 absolute bottom-0 m-1 bg-[#380181]"
                          >
                            <MaterialIcons
                              name={
                                showThirdLevelEvidentOne
                                  ? "expand-more"
                                  : "expand-less"
                              }
                              size={24}
                              color="white"
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )}
                  {showThirdLevelEvidentOne && showSecondLevel && (
                    <View className="flex flex-row items-start justify-end w-full">
                      <View className="flex items-center justify-center w-[5%] h-1/2 border-l border-b border-gray-300 rounded-bl-lg"></View>
                      <View className="w-[80%] border border-gray-300 rounded-md mt-1">
                        {post?.data?.data?.firstArgumentEvidentOne && (
                          <PostContent
                            item={post?.data?.data?.firstArgumentEvidentOne}
                          />
                        )}
                        {post?.data?.data?.firstArgumentEvidentTwo && (
                          <PostContent
                            item={post?.data?.data?.firstArgumentEvidentTwo}
                          />
                        )}
                        {post?.data?.data?.firstArgumentEvidentThree && (
                          <PostContent
                            item={post?.data?.data?.firstArgumentEvidentThree}
                          />
                        )}
                      </View>
                    </View>
                  )}

                  {/* Second argument */}
                  {showSecondLevel && (
                    <View className="flex flex-row items-start justify-end w-full">
                      {/* <View className="flex items-center justify-center w-[5%] h-1/2 border-l border-b border-gray-300 rounded-bl-lg"></View> */}
                      <View className="w-[90%] border border-gray-300 rounded-md mt-1">
                        {post?.data?.data?.secondArgument && (
                          <PostContent
                            item={post?.data?.data?.secondArgument}
                          />
                        )}
                        {post?.data?.data?.firstArgumentEvidentTwo?.text && (
                          <TouchableOpacity
                            onPress={() =>
                              setShowThirdLevelEvidentTwo(
                                !showThirdLevelEvidentTwo
                              )
                            }
                            style={styles.shadow}
                            className="flex justify-center items-center rounded-full p-1 absolute bottom-0 m-1 bg-[#380181]"
                          >
                            <MaterialIcons
                              name={
                                showThirdLevelEvidentTwo
                                  ? "expand-more"
                                  : "expand-less"
                              }
                              size={24}
                              color="white"
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )}
                  {showThirdLevelEvidentTwo && showSecondLevel && (
                    <View className="flex flex-row items-start justify-end w-full">
                      <View className="flex items-center justify-center w-[5%] h-1/2 border-l border-b border-gray-300 rounded-bl-lg"></View>
                      <View className="w-[80%] border border-gray-300 rounded-md mt-1">
                        {post?.data?.data?.secondArgumentEvidentThree && (
                          <PostContent
                            item={post?.data?.data?.secondArgumentEvidentThree}
                          />
                        )}
                        {post?.data?.data?.secondArgumentEvidentThree && (
                          <PostContent
                            item={post?.data?.data?.secondArgumentEvidentThree}
                          />
                        )}
                        {post?.data?.data?.secondArgumentEvidentThree && (
                          <PostContent
                            item={post?.data?.data?.secondArgumentEvidentThree}
                          />
                        )}
                      </View>
                    </View>
                  )}

                  {/* Third argument */}
                  {showSecondLevel && (
                    <View className="flex flex-row items-start justify-end w-full">
                      {/* <View className="flex items-center justify-center w-[5%] h-1/2 border-l border-b border-gray-300 rounded-bl-lg"></View> */}
                      <View className="w-[90%] border border-gray-300 rounded-md mt-1">
                        {post?.data?.data?.thirdArgument && (
                          <PostContent item={post?.data?.data?.thirdArgument} />
                        )}
                        {post?.data?.data?.firstArgumentEvidentThree?.text && (
                          <TouchableOpacity
                            onPress={() =>
                              setShowThirdLevelEvidentThree(
                                !showThirdLevelEvidentThree
                              )
                            }
                            style={styles.shadow}
                            className="flex justify-center items-center rounded-full p-1 absolute bottom-0 m-1 bg-[#380181]"
                          >
                            <MaterialIcons
                              name={
                                showThirdLevelEvidentThree
                                  ? "expand-more"
                                  : "expand-less"
                              }
                              size={24}
                              color="white"
                            />
                          </TouchableOpacity>
                        )}
                      </View>
                    </View>
                  )}

                  {showThirdLevelEvidentThree && showSecondLevel && (
                    <View className="flex flex-row items-start justify-end w-full">
                      <View className="flex items-center justify-center w-[5%] h-1/2 border-l border-b border-gray-300 rounded-bl-lg"></View>
                      <View className="w-[80%] border border-gray-300 rounded-md mt-1">
                        {post?.data?.data?.thirdArgumentEvidentThree && (
                          <PostContent
                            item={post?.data?.data?.thirdArgumentEvidentThree}
                          />
                        )}
                        {post?.data?.data?.thirdArgumentEvidentThree && (
                          <PostContent
                            item={post?.data?.data?.thirdArgumentEvidentThree}
                          />
                        )}
                        {post?.data?.data?.thirdArgumentEvidentThree && (
                          <PostContent
                            item={post?.data?.data?.thirdArgumentEvidentThree}
                          />
                        )}
                      </View>
                    </View>
                  )}
                </View>
              </View>
              {comment.data.length !== 0 && (
                <View className="flex flex-col w-full justify-center items-center mt-4">
                  <MyText myStyle="text-sm font-black" content={"COMMENTS"} />
                  <View className="w-10 h-1 bg-[#380181] rounded-full"></View>
                </View>
              )}
            </View>
          }
          ListEmptyComponent={ListEmptyComponent}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </View>
      {post && (
        <View className="absolute justify-center items-center bottom-0 w-full bg-[#380181]">
          <PostContentFooter
            item={post?.data?.data?._id}
            likes={post?.data?.data?.likes}
            dislikes={post?.data?.data?.dislikes}
            saved={post?.data?.data?.saved}
            comments={post?.data?.data?.comments}
            userId={user.data._id}
          />
        </View>
      )}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="w-full bg-black/60 h-full"
        >
          <PostModalContent
            postId={post?.data?.data?._id}
            channelId={post?.data?.data?.channel?._id}
            channelName={post?.data?.data?.channel?.name}
            userId={user.data._id}
          />
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

export default PostCommentScreen;

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
