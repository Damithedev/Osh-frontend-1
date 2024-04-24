import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MyText from "./MyText";
import { useSelector, useDispatch } from "react-redux";
import { swiftNotifySwitch } from "../store/actions/swiftNotifyActions";

const SwiftNotify = () => {
  const swiftNotify = useSelector((state) => state.swiftNotify);
  const isShow = swiftNotify.show;
  const dispatch = useDispatch();

  useEffect(() => {
    if (swiftNotify.show === true) {
      setTimeout(() => {
        dispatch(swiftNotifySwitch("", false));
      }, 2000);
    }
  }, [swiftNotify]);

  return (
    <View>
      {isShow && (
        <View className="flex justify-center items-center w-5/6 bg-black/70 rounded-lg absolute bottom-16 h-14 self-center p-1">
          <MyText
            content={swiftNotify.message}
            myStyle={"text-center text-sm text-white"}
          />
        </View>
      )}
    </View>
  );
};

export default SwiftNotify;
