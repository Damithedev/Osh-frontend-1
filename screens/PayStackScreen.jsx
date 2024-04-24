import React from "react";
import { Paystack } from "react-native-paystack-webview";
import { useSelector } from "react-redux";
import { View } from "react-native";

const PayStackScreen = ({ route }) => {
  const { email, amount } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Paystack
        paystackKey="pk_test_18a78ff05033d89af0f20177f7997fe55f988b15"
        amount={amount}
        billingEmail={email}
        // activityIndicatorColor="green"
        onCancel={() => {
          console.log("cancelled");
        }}
        onSuccess={() => {
          console.log("success");
        }}
        autoStart={true}
      />
    </View>
  );
};

export default PayStackScreen;
