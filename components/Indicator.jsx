import React from "react";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";
import { View } from "react-native";

const Indicator = ({ color }) => {
  return (
    <View className="flex justify-center absolute items-center h-full w-full bg-white/80">
      <BallIndicator color={color} />
    </View>
  );
};

export default Indicator;
