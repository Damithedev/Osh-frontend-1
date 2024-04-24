import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Feather,
  Ionicons,
  AntDesign,
  FontAwesome5,
  FontAwesome,
  Entypo,
  Octicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";

import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import NotificationScreen from "../screens/NotificationScreen";
import DiscourseScreen from "../screens/DiscourseScreen";
import AddPostScreen from "../screens/AddPostScreen";
import FacetScreen from "../screens/FacetScreen";
import MyText from "../components/MyText";

import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import { url } from "../store/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import VideoScreen from "../screens/VideoScreen";

let userDetails;

const getUserDetails = async () => {
  const token = await AsyncStorage.getItem("token");
  const config = { headers: { Authorization: token } };

  axios
    .get(`${url}users/profile`, config)
    .then((response) => {
      console.log("bottom", response.data);
      userDetails = response.data;
      console.log("user detail", userDetails);
    })
    .catch((error) => {
      console.log("bottom", error);
    });
};

getUserDetails();

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={{
      // top: -2,
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 18,
    }}
  >
    {children}
    <MyText content={"Je kan"} myStyle={"text-white text-[12px]"} />
  </TouchableOpacity>
);

const Tab = createBottomTabNavigator();

function BottomNav({ navigation }) {
  const profile = useSelector((state) => state.profile);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: "#008AD8",
          height: 55,
          ...styles.shadow,
        },
        // tabBarStyle: {
        //   bottom: 0,
        //   left: 0,
        //   right: 0,
        //   elevation: 0,
        //   backgroundColor: "#ffffff",
        //   height: 55,
        //   ...styles.shadow,
        // },
        tabBarLabelStyle: {
          display: "flex",
          fontSize: 13,
          color: "white",
        },
        tabBarShowLabel: true,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitleAlign: "center",
          tabBarShowLabel: true,
          headerTitle: () => (
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={require("../assets/essential.png")}
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Profile")}
            >
              <Image
                source={
                  profile?.data.data == ""
                    ? require("../assets/Avatar-19.png")
                    : { uri: profile?.data.data.avatar }
                }
                style={{
                  width: 35,
                  height: 35,
                  backgroundColor: "#380181",
                  borderRadius: 50,
                  marginLeft: 10,
                }}
              />
            </TouchableOpacity>
          ),
          tabBarLabel: "Home",
          tabBarShowLabel: true,
          tabBarActiveTintColor: "blue",
          tabBarIcon: ({ color, focused }) => (
            <Octicons
              name="home"
              size={18}
              color={focused ? color : "#000000"}
              style={
                focused
                  ? {
                      color: "white",
                      fontSize: 22,
                      // backgroundColor: "white",
                      // borderBottomWidth: 3,
                      // borderBottomColor: "#380181",
                      // padding: 4,
                      // borderRadius: 50,
                    }
                  : null
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Search",
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#380181",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="search"
              size={18}
              color={focused ? color : "#000000"}
              style={
                focused
                  ? {
                      color: "white",
                      fontSize: 22,
                      // borderBottomWidth: 3,
                      // borderBottomColor: "#380181",
                      // borderStyle: "solid",
                      // paddingBottom: 5,
                      // borderRadius: 3,
                    }
                  : null
              }
            />
          ),
        }}
      />

      <Tab.Screen
        name="AddPost"
        component={AddPostScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Reels",
          tabBarLabelStyle: {
            display: "none",
          },
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#380181",
          tabBarIcon: ({ focused, color }) => (
            <Feather
              name="video"
              size={24}
              color={focused ? color : "#000000"}
            />
          ),
          tabBarButton: (props) => {
            return (
              <CustomTabBarButton
                {...props}
                onPress={() => navigation.navigate("Video")}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Alerts",
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#380181",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="notifications-none"
              size={24}
              color={focused ? color : "#000000"}
              style={
                focused
                  ? {
                      color: "white",
                      fontSize: 26,
                      // borderBottomWidth: 3,
                      // borderBottomColor: "#380181",
                      // borderStyle: "solid",
                      // paddingBottom: 5,
                      // borderRadius: 3,
                    }
                  : null
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Discourse"
        component={DiscourseScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Sho wa",
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#380181",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="discourse"
              size={18}
              color={focused ? color : "#000000"}
              style={
                focused
                  ? {
                      color: "white",
                      fontSize: 20,
                    }
                  : null
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={AddPostScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Post",
          tabBarShowLabel: true,
          tabBarActiveTintColor: "#380181",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="post-add"
              size={26}
              color={focused ? color : "#000000"}
              style={
                focused
                  ? {
                      color: "white",
                      fontSize: 28,
                    }
                  : null
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomNav;
