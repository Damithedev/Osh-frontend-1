import { useCalls } from "@stream-io/video-react-native-sdk";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const CallsProvider = ({ children }) => {
  const navigation = useNavigation();
  const calls = useCalls();

  useEffect(() => {
    if (calls.length > 0) {
      return navigation.navigate("VoiceCall");
    }
  }, [calls]);
  return children;
};

export default CallsProvider;
