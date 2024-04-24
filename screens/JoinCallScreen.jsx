import React, { useState } from "react";
import MyText from "../components/MyText";
import { SafeAreaView, Button, Alert } from "react-native";
import MyTextInput from "../components/MyTextInput";
import { useStreamVideoClient } from "@stream-io/video-react-native-sdk";

const JoinCallScreen = ({ navigation }) => {
  const [callId, setCallId] = useState("");
  const client = useStreamVideoClient();
  const onJoin = async () => {
    if (!client) return;
    const call = client?.call("default", callId);
    try {
      await call.join();
      navigation.navigate("VoiceCall");
    } catch (err) {
      console.log("Failed to join", err);
    }
  };
  return (
    <SafeAreaView className="flex-1 justify-center items-center">
      <MyText content={"JoinCall SCreen"} />
      <MyTextInput
        value={callId}
        onChangeText={setCallId}
        className="w-full bg-gray-200"
        placeholder="call id"
      />
      <Button title="Join" onPress={onJoin} />
    </SafeAreaView>
  );
};

export default JoinCallScreen;
