import "expo-dev-client";
import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import RootStackScreen from "./navigators/RootStackScreen";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import rootReducer from "./store/reducers/rootReducer";
import MyText from "./components/MyText";
import SwiftNotify from "./components/SwiftNotify";

const store = createStore(rootReducer, applyMiddleware(thunk));

export default function App() {
  // const auth = useSelector((state) => state.auth);
  const [isShow, setIsShow] = useState(false);
  const [info, setInfo] = useState("okay");
  const infoServer = "okayy";

  useEffect(() => {
    const run = async () => {
      if (Platform.OS === "android") {
        await PermissionsAndroid.requestMultiple([
          "android.permission.POST_NOTIFICATIONS",
          "android.permission.BLUETOOTH_CONNECT",
        ]);
      }
    };
    run();
  }, []);

  useEffect(() => {
    if (info == infoServer) {
      setIsShow(false);
    } else {
      setIsShow(true);
      setTimeout(() => {
        setIsShow(false);
      }, 5000);
    }
  }, [info, setInfo]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <RootStackScreen />
        </NavigationContainer>
        <SwiftNotify />
      </Provider>
    </GestureHandlerRootView>
  );
}
