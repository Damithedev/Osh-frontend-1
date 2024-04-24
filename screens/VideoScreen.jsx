import React, { useState, useRef, useEffect } from "react";
import {
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
} from "react-native";
import { reels } from "../data/reels";
import ReelTwo from "../components/ReelTwo";
import { getReelTimeline } from "../store/actions/reelTimelineAction";
import { useDispatch, useSelector } from "react-redux";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import MyText from "../components/MyText";
import Indicator from "../components/Indicator";

const { height: heightScreen } = Dimensions.get("screen");

const VideoScreen = ({ navigation }) => {
  const newTimelineReel = useSelector((state) => state.reelTimeline);
  const profile = useSelector((state) => state.profile);
  const [page, setPage] = useState(1);
  const [showItem, setShowItem] = useState(newTimelineReel?.data[0]);

  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setShowItem(viewableItems[0].item);
      // setShowItem(newTimelineReel.data[viewableItems[0].item]);
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReelTimeline(page));
  }, []);

  return (
    <View className="flex-1 w-screen h-screen bg-black">
      {newTimelineReel?.data.length > 0 ? (
        <View className="w-full h-full">
          <FlatList
            data={newTimelineReel?.data}
            renderItem={({ item }) => (
              <ReelTwo data={item} currentVisibleItem={showItem} />
            )}
            onViewableItemsChanged={onViewRef.current}
            snapToAlignment="center"
            snapToInterval={heightScreen}
            scrollEventThrottle={200}
            decelerationRate={"fast"}
            viewabilityConfig={{
              waitForInteraction: false,
              viewAreaCoveragePercentThreshold: 100,
            }}
            showsVerticalScrollIndicator={false}
          />
          <View className="flex flex-row justify-between items-start w-full absolute top-10 p-3 bg-[#00000050]">
            <View className="flex flex-row justify-center items-center">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons
                  name="arrow-u-left-top"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
              <MyText
                content={"Je kan mo"}
                myStyle={"font-bold text-white text-xl ml-2"}
              />
            </View>
            <View className="flex justify-center flex-row items-center">
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate("AddReel")}
              >
                <Ionicons name="add-circle-outline" size={30} color="white" />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.5}
                className="flex justify-center items-center ml-3 border-white border rounded-full w-[30px] h-[30px]"
                onPress={() => navigation.navigate("Profile")}
              >
                <Image
                  source={
                    profile?.data.data.avatar === ""
                      ? require("../assets/Avatar-19.png")
                      : { uri: profile?.data.data.avatar }
                  }
                  style={{
                    width: 28,
                    height: 28,
                    resizeMode: "cover",
                    borderRadius: 50,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View className="flex flex-col justify-center items-center w-full h-full bg-black">
          <Indicator color="white" />
        </View>
      )}
    </View>
  );
};

export default VideoScreen;
