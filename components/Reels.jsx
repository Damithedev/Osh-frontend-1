import React, { useRef } from "react";
import { View, FlatList, Text } from "react-native";
import { Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";

const Reels = ({ videoUrl }) => {
  const ref = useRef(null);
  const play = async () => {
    if (ref.current == null) {
      return;
    }
    const status = await ref.current.getStatusAsync();
    if (status?.isPlaying) {
      return;
    }
    try {
      await ref.current.playAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const stop = async () => {
    if (ref.current == null) {
      return;
    }
    const status = await ref.current.getStatusAsync();
    if (!status?.isPlaying) {
      return;
    }
    try {
      await ref.current.stopAsync();
    } catch (e) {
      console.log(e);
    }
  };

  const unload = async () => {
    if (ref.current == null) {
      return;
    }
    try {
      await ref.current.unloadAsync();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Video
      ref={ref}
      style={{ flex: 1 }}
      // resizeMode={Video.RESIZE_MODE_COVER}
      shouldPlay={false}
      source={{
        uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
      }}
      useNativeControls
      resizeMode={ResizeMode.COVER}
      isLooping
    />
  );
};

export default Reels;
