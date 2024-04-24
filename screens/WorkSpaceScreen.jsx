import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";
import WalletScreen from "./WalletScreen";

const Drawer = createDrawerNavigator();

const WorkSpaceScreen = ({ navigation }) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: {
            backgroundColor: "#fff",
            width: 250,
          },
          headerStyle: {
            backgroundColor: "#380181",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerActiveTintColor: "blue",
          drawerLabelStyle: {
            color: "#111",
          },
        }}
      >
        <Drawer.Screen
          name="Home"
          options={{
            drawerLabel: "Home",
            title: "Home",
            // drawerIcon: () => (

            // )
          }}
          component={WalletScreen}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default WorkSpaceScreen;
