import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
// import RtcEngine, { RtcLocalView, RtcRemoteView } from "react-native-agora";

const CallScreen = ({ route }) => {
  const { userId } = route.params;
  // const [appId, setAppId] = useState("890d7d4da4534c76ba402f10b248ecb7");
  // const [channelName, setChannelName] = useState("testChannel");
  // const [userToken, setUserToken] = useState("");

  // const [joinSucceed, setJoinSucceed] = useState(false);
  // const [peerIds, setPeerIds] = useState([]);

  // const rtcEngine = new RtcEngine();

  // useEffect(() => {
  //   const initAgora = async () => {
  //     rtcEngine
  //       .initWithAppId(appId)
  //       .then(() => {
  //         rtcEngine.joinChannel(userToken, channelName, null, userId);
  //         rtcEngine.enableVideo();
  //       })
  //       .catch((error) => {
  //         console.log("Agora initialization failed", error);
  //       });

  //     rtcEngine.addListener("UserJoined", (uid, elapsed) => {
  //       setPeerIds([...peerIds, uid]);
  //     });

  //     rtcEngine.addListener("UserOffline", (uid, reason) => {
  //       setPeerIds(peerIds.filter((id) => id !== uid));
  //     });

  //     rtcEngine.addListener("JoinChannelSuccess", (channel, uid, elapsed) => {
  //       setJoinSucceed(true);
  //     });
  //   };

  //   initAgora();

  //   return () => {
  //     rtcEngine.destroy();
  //   };
  // }, []);

  return (
    <View>
      {/* {joinSucceed ? (
        <View>
          <RtcLocalView.SurfaceView
            style={{ flex: 1 }}
            channelId={channelName}
            renderMode={RtcLocalView.RenderMode.Hidden}
          />
          {peerIds.map((uid) => (
            <RtcRemoteView.SurfaceView
              key={uid}
              style={{ flex: 1 }}
              channelId={channelName}
              renderMode={RtcRemoteView.RenderMode.Hidden}
              uid={uid}
            />
          ))}
        </View>
      ) : ( */}
      <Text>Connecting...</Text>
      {/* )} */}
    </View>
  );
};

export default CallScreen;
