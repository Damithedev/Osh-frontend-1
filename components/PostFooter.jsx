import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Sharing from "expo-sharing";

import { useNavigation } from "@react-navigation/native";

import MyText from "./MyText";
import {
  View,
  TouchableOpacity,
  Modal,
  Clipboard,
  Linking,
} from "react-native";
import {
  Feather,
  Entypo,
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

import {
  likeTimelinePost,
  dislikeTimelinePost,
  starPost,
} from "../store/actions/timelineActions";

const PostFooter = ({
  item,
  likes,
  dislikes,
  comments,
  userId,
  saved,
  shared,
}) => {
  const [recentLikedPost, setRecentLikedPost] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [link, setLink] = useState("exp://192.168.116.149/post111");

  const copyToClipboard = async () => {
    await Clipboard.setString(link);
    alert("Link copied to clipboard!");
  };

  const handleWhatsappShare = () => {
    const phoneNumber = "09038614081"; // Replace with the recipient's phone number
    const message = "Check out this link: https://example.com";

    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.error("WhatsApp is not installed on the device");
        }
      })
      .catch((error) => console.error("An error occurred", error));
  };

  const handleShareToFacebook = async () => {
    const facebookAppURL = "m.facebook.com/composer/"; // Facebook app deep link for creating a post
    // const facebookAppURL = "fb://publish/profile/me?text=Your%20Post%20Text"; // Facebook app deep link for creating a post
    const fallbackURL =
      "https://www.facebook.com/sharer/sharer.php?u=https://your-post-url"; // Fallback URL for browsers

    try {
      // Try to open Facebook app
      await Linking.openURL(facebookAppURL);
    } catch (error) {
      // If the Facebook app is not installed, open the post in the browser
      await Linking.openURL(fallbackURL);
    }
  };

  const handleShareToTwitter = async () => {
    const twitterComposerURL =
      "https://twitter.com/intent/tweet?text=Your%20Tweet%20Text"; // Replace with your tweet text

    try {
      await Linking.openURL(twitterComposerURL);
    } catch (error) {
      console.error("Error opening Twitter composer:", error);
    }
  };

  const handleShareToInstagram = async () => {
    const instagramComposerURL = "https://instagram.com/create/details/"; // Replace with your tweet text

    try {
      await Linking.openURL(instagramComposerURL);
    } catch (error) {
      console.error("Error opening instagram composer:", error);
    }
  };

  const shareContent = async () => {
    try {
      const shareOptions = {
        title: "Share via",
        message: "Check out this awesome post!",
        url: "https://example.com", // Optional: Include a URL
      };
      const result = await Sharing.shareAsync(shareOptions);

      if (result.action === Sharing.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log("Shared successfully");
        }
      } else if (result.action === Sharing.dismissedAction) {
        console.log("Share sheet dismissed");
      }
    } catch (error) {
      console.error("Error sharing:", error.message);
    }
  };

  const navigation = useNavigation();

  const dispatch = useDispatch();
  return (
    <View>
      <View className="flex flex-row justify-between items-center w-full p-2 my-1 bg-white border-y border-y-gray-200">
        <TouchableOpacity
          onPress={() => {
            dispatch(likeTimelinePost(item));
          }}
          className="flex flex-row justify-center items-center p-1 rounded-md"
        >
          {likes.includes(userId) ? (
            <MaterialCommunityIcons
              name="cards-heart"
              size={20}
              color={"#FF0000"}
            />
          ) : (
            <MaterialCommunityIcons
              name="cards-heart-outline"
              size={20}
              color={"#000000"}
            />
          )}
          <MyText content={`${likes.length} likes`} myStyle="ml-1 text-xs" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddComment", { postId: item })}
          className="flex flex-row justify-center items-center p-1 rounded-md"
        >
          <View className="flex flex-row justify-center items-center p-1 rounded-md">
            <FontAwesome5 name="comment-dots" size={18} color="black" />
            <MyText
              content={`${comments.length} comments`}
              myStyle="ml-1 text-xs"
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          // onPress={() => navigation.navigate("DiscourseContent")}
          onPress={() => setModalVisible(true)}
          className="flex flex-row items-center p-1 justify-end"
        >
          <AntDesign name="sharealt" size={18} color="black" />
          <MyText content={`${shared.length} share`} myStyle="ml-1 text-xs" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          className="flex flex-row items-center p-1 justify-end"
        >
          <Feather name="bar-chart-2" size={24} color="black" />
          <MyText content={`${shared.length} views`} myStyle="ml-1 text-xs" />
        </TouchableOpacity>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          className="w-full bg-black/60 h-full"
        >
          <View className="flex flex-col justify-start item-center h-2/5 bg-white w-full rounded-t-2xl bottom-0 absolute p-3 pt-5">
            <View>
              <MyText
                content={"Share post"}
                myStyle={"font-bold text-xl mb-4"}
              />
            </View>
            <View className="flex flex-wrap flex-row gap-6 w-full">
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={copyToClipboard}
                className="flex justify-center items-center flex-col"
              >
                <View className="flex justify-center items-center h-12 w-12 border border-grey-200 rounded-full">
                  <Entypo name="link" size={24} color="black" />
                </View>
                <MyText content={"Copy Link"} myStyle={"text-xs"} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleShareToFacebook}
                className="flex justify-center items-center flex-col"
              >
                <View className="flex justify-center items-center h-12 w-12 border border-grey-200 rounded-full">
                  <Entypo name="facebook-with-circle" size={24} color="black" />
                </View>
                <MyText content={"Facebook"} myStyle={"text-xs"} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleShareToInstagram}
                className="flex justify-center items-center flex-col"
              >
                <View className="flex justify-center items-center h-12 w-12 border border-grey-200 rounded-full">
                  <Entypo
                    name="instagram-with-circle"
                    size={24}
                    color="black"
                  />
                </View>
                <MyText content={"Instagram"} myStyle={"text-xs"} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleShareToTwitter}
                className="flex justify-center items-center flex-col"
              >
                <View className="flex justify-center items-center h-12 w-12 border border-grey-200 rounded-full">
                  <Entypo name="twitter" size={24} color="black" />
                </View>
                <MyText content={"Twitter"} myStyle={"text-xs"} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => alert("Sharing to snapchat...")}
                className="flex justify-center items-center flex-col"
              >
                <View className="flex justify-center items-center h-12 w-12 border border-grey-200 rounded-full">
                  <FontAwesome5 name="snapchat" size={24} color="black" />
                </View>
                <MyText content={"Snapchat"} myStyle={"text-xs"} />
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handleWhatsappShare}
                className="flex justify-center items-center flex-col"
              >
                <View className="flex justify-center items-center h-12 w-12 border border-grey-200 rounded-full">
                  <FontAwesome5 name="whatsapp" size={24} color="black" />
                </View>
                <MyText content={"WhatsApp"} myStyle={"text-xs"} />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default PostFooter;
