import {
  CallContent,
  CallTopView,
  StreamCall,
  useCalls,
  useStreamVideoClient,
  RingingCallContent,
} from "@stream-io/video-react-native-sdk";
import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import MyText from "../components/MyText";

const callId = "default_5032d108-5faf-432b-af36-f0d5bb6caeb7";

export default function VoiceCallScreen({ navigation }) {
  const [loaded, setLoaded] = useState(false);
  const client = useStreamVideoClient();

  const calls = useCalls();
  const call = calls[0];

  useEffect(() => {
    if (!call && loaded) {
      return navigation.goBack();
    }
    if (call && !loaded) {
      setLoaded(true);
    }
  }, [call]);

  if (!call) {
    return <MyText content={"call not found"} />;
  }

  return (
    <StreamCall call={call}>
      <RingingCallContent
        // onHangupCallHandler={() => navigation.goBack()}
        CallTopView={() => <CallTopView title={call.id} />}
      />
    </StreamCall>
  );
}
