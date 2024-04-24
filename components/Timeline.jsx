import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Text, FlatList, SafeAreaView, ScrollView } from "react-native";
import PostOneMedia from "./PostOneMedia";
import PostTwoMedia from "./PostTwoMedia";
import PostThreeMedia from "./PostThreeMedia";
import PostFourMedia from "./PostFourMedia";
import PostNoMedia from "./PostNoMedia";
import { getTimeline } from "../store/actions/timelineActions";
import Stories from "./Stories";
import SuggestedGroups from "./SuggestedGroups";
import SuggestedFriends from "./SuggestedFriends";

const Timeline = () => {
  const newTimeline = useSelector((state) => state.timeline);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTimeline(page));
  }, [page]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderItem = ({ item }) => {
    if (item?.text?.files?.length == 4) {
      return <PostFourMedia key={item._id} item={item} />;
    } else if (item?.text?.files?.length == 3) {
      return <PostThreeMedia key={item._id} item={item} />;
    } else if (item?.text?.files?.length == 2) {
      return <PostTwoMedia key={item._id} item={item} />;
    } else if (item?.text?.files?.length == 1) {
      return <PostOneMedia key={item._id} item={item} />;
    } else if (item?.text?.files?.length == 0) {
      return <PostNoMedia key={item._id} item={item} />;
    }
  };

  const firstThree = newTimeline?.data.slice(0, 3);
  const nextThree = newTimeline?.data.slice(4, 7);
  const lastPosts = newTimeline?.data.slice(7);

  const keyExtractor = (item) => item._id;

  const ListEmptyComponent = () => {
    return (
      <View className="flex justify-center items-center border border-gray-200 rounded-lg w-full">
        <Text style={{ color: "#05375a" }}>{`No Update Yet!`}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 w-full">
      <ScrollView>
        <View className="flex flex-col">
          <Stories />
          {firstThree.length > 0 &&
            firstThree?.map((post) => {
              if (post?.text?.files?.length == 4) {
                return <PostFourMedia key={post._id} item={post} />;
              } else if (post?.text?.files?.length == 3) {
                return <PostThreeMedia key={post._id} item={post} />;
              } else if (post?.text?.files?.length == 2) {
                return <PostTwoMedia key={post._id} item={post} />;
              } else if (post?.text?.files?.length == 1) {
                return <PostOneMedia key={post._id} item={post} />;
              } else if (post?.text?.files?.length == 0) {
                return <PostNoMedia key={post._id} item={post} />;
              }
            })}
        </View>
        <View className="flex flex-col">
          <SuggestedFriends />
          {nextThree.length > 0 &&
            nextThree?.map((post) => {
              if (post?.text?.files?.length == 4) {
                return <PostFourMedia key={post._id} item={post} />;
              } else if (post?.text?.files?.length == 3) {
                return <PostThreeMedia key={post._id} item={post} />;
              } else if (post?.text?.files?.length == 2) {
                return <PostTwoMedia key={post._id} item={post} />;
              } else if (post?.text?.files?.length == 1) {
                return <PostOneMedia key={post._id} item={post} />;
              } else if (post?.text?.files?.length == 0) {
                return <PostNoMedia key={post._id} item={post} />;
              }
            })}
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={lastPosts}
          ListEmptyComponent={ListEmptyComponent}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListHeaderComponent={
            <View>
              <SuggestedGroups />
              {/* <SuggestedFriends /> */}
            </View>
          }
          ListFooterComponent={<View className="h-10 w-10"></View>}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Timeline;
