// import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import {
  FontAwesome,
  Entypo,
  MaterialIcons,
  MaterialCommunityIcons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";

import { NavigationContainer } from "@react-navigation/native";
import {
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";

import MyText from "../components/MyText";
import MyTextInput from "../components/MyTextInput";
import WalletScreen from "../screens/WalletScreen";
import ProfileScreen from "../screens/ProfileScreen";

import axios from "axios";
import { url } from "../store/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFonts } from "expo-font";
import StarredPostScreen from "../screens/StarredPostScreen";
import AdManagerScreen from "../screens/AdManagerScreen";
import ChannelsScreen from "../screens/ChannelsScreen";

const Drawer = createDrawerNavigator();

const DrawerNav = ({ navigation }) => {
  const [user, setUser] = useState({});

  const getUserDetails = async () => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };

    axios
      .get(`${url}users/profile`, config)
      .then((response) => {
        setUser(response.data.data);
      })
      .catch((error) => {
        console.log("bottom", error);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const [fontsLoaded] = useFonts({
    Urbanist: require("../assets/fonts/Urbanist/static/Urbanist-Regular.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView style={styles.container}>
            <View
              style={{
                height: 200,
                width: "100%",
                borderBottomColor: "#f4f4f4",
                backgroundColor: "#380181",
                padding: 15,
                paddingTop: 60,
              }}
            >
              <View className="flex justify-center items-center rounded-full bg-[#380181]">
                <Image
                  source={{ uri: user?.avatar }}
                  style={{ width: 40, height: 40, borderRadius: 100 }}
                />
              </View>
              <MyText
                content={"KINGWARE TECHNOLOGIES"}
                // content={user?.name}
                myStyle="text-white font-bold text-lg"
              />
              <MyText
                content={`@${user?.username}`}
                myStyle="text-white font-normal text-lg"
              />
              <View>
                <MyText
                  content={`${user?.followings?.length} followings`}
                  myStyle="text-white font-normal text-sm"
                />
              </View>
            </View>
            <DrawerItemList
              {...props}
              activeTintColor="#2196f3"
              activeBackgroundColor="rgba(0, 0, 0, .04)"
              inactiveTintColor="rgba(0, 0, 0, .87)"
              inactiveBackgroundColor="transparent"
              style={{ backgroundColor: "#000000" }}
              labelStyle={{ color: "#ffffff" }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: 200,
                width: "100%",
                borderTopColor: "#f1f1f1",
                borderTopStyle: "solid",
                borderTopWidth: 1,
                backgroundColor: "#fff",
                padding: 15,
              }}
            >
              <View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    paddingVertical: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#fff",
                  }}
                  onPress={() => navigation.navigate("Settings")}
                >
                  <Feather name="settings" size={16} color="black" />
                  <Text
                    style={{
                      fontFamily: "Urbanist",
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    Settings
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#fff",
                  }}
                  onPress={() => navigation.navigate("HelpCenter")}
                >
                  <Feather name="help-circle" size={16} color="black" />
                  <Text
                    style={{
                      paddingVertical: 15,
                      fontFamily: "Urbanist",
                      fontSize: 16,
                      marginLeft: 10,
                    }}
                  >
                    Help Center
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    paddingVertical: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: "#fff",
                  }}
                  onPress={() => alert("I dey work")}
                >
                  {/* <MaterialCommunityIcons
                  name="theme-light-dark"
                  size={16}
                  color="black"
                /> */}
                  <Text
                    style={{
                      fontFamily: "Urbanist",
                      fontSize: 14,
                      marginLeft: 10,
                      color: "gray",
                    }}
                  >
                    Kingware
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "Urbanist",
                    fontSize: 14,
                    marginLeft: 10,
                    color: "gray",
                  }}
                >
                  v 0.1
                </Text>
              </View>
            </View>
          </SafeAreaView>
        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fff",
          width: 300,
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
        name="Profile"
        options={{
          drawerLabel: "Profile",
          title: "Profile",
          drawerLabelStyle: {
            fontFamily: "Urbanist",
            fontSize: 20,
            fontWeight: "700",
            color: "#000",
          },
          drawerIcon: () => (
            <FontAwesome name="user-circle-o" size={24} color="black" />
          ),
        }}
        component={ProfileScreen}
      />
      <Drawer.Screen
        name="Channels"
        options={{
          drawerLabel: "Channels",
          title: "Channels",
          drawerLabelStyle: {
            fontFamily: "Urbanist",
            fontSize: 20,
            fontWeight: "700",
            color: "#000",
          },
          drawerIcon: () => <AntDesign name="API" size={24} color="black" />,
        }}
        component={ChannelsScreen}
      />
      <Drawer.Screen
        name="Wallet"
        options={{
          drawerLabel: "Wallet",
          title: "Wallet",
          drawerLabelStyle: {
            fontFamily: "Urbanist",
            fontSize: 20,
            fontWeight: "700",
            color: "#000",
          },
          drawerIcon: () => <Entypo name="wallet" size={24} color="black" />,
        }}
        component={WalletScreen}
      />
      <Drawer.Screen
        name="Starred Posts"
        options={{
          drawerLabel: "Starred Posts",
          title: "Starred Posts",
          drawerLabelStyle: {
            fontFamily: "Urbanist",
            fontSize: 20,
            fontWeight: "700",
            color: "#000",
          },
          drawerIcon: () => <AntDesign name="star" size={24} color={"black"} />,
        }}
        component={StarredPostScreen}
      />
      <Drawer.Screen
        name="Ad Manager"
        options={{
          drawerLabel: "Ad Manager",
          title: "Ad Manager",
          drawerLabelStyle: {
            fontFamily: "Urbanist",
            fontSize: 20,
            fontWeight: "700",
            color: "#000",
          },
          drawerIcon: () => (
            <MaterialIcons name="campaign" size={24} color="black" />
          ),
        }}
        component={AdManagerScreen}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});
