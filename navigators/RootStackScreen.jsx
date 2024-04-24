import React from "react";
import MyText from "../components/MyText";
// import { useFonts } from "expo-font";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import SignUpScreen from "../screens/SignUpScreen";
import SignInScreen from "../screens/SignInScreen";
import FacetScreen from "../screens/FacetScreen";
import HomeTimelineScreen from "../screens/HomeTimelineScreen";
import UserTimelineScreen from "../screens/UserTimelineScreen";
import NotificationScreen from "../screens/NotificationScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import PostScreen from "../screens/PostScreen";
import EditPostScreen from "../screens/EditPostScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import SponsorScreen from "../screens/SponsorScreen";
import MessageScreen from "../screens/MessageScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import VerifyScreen from "../screens/VerifyScreen";
import BottomNav from "./BottomNav";
import AddPostScreen from "../screens/AddPostScreen";
import AddGroupScreen from "../screens/AddGroupScreen";
import ChannelScreen from "../screens/ChannelScreen";
import DiscourseContentScreen from "../screens/DiscourseContentScreen";
import MediaScreen from "../screens/MediaScreen";
import ConnectScreen from "../screens/ConnectScreen";
import AddCommentScreen from "../screens/AddCommentScreen";
import WorkSpaceScreen from "../screens/WorkSpaceScreen";
import WalletScreen from "../screens/WalletScreen";
import PayStackScreen from "../screens/PayStackScreen";
import DrawerNav from "./DrawerNav";
import FacetsScreen from "../screens/FacetsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import HelpCenterScreen from "../screens/HelpCenterScreen";
import ReportScreen from "../screens/ReportScreen";
import EarnScreen from "../screens/EarnScreen";
import GroupScreen from "../screens/GroupScreen";
import AddReelScreen from "../screens/AddReelScreen";
import ContactListScreen from "../screens/ContactListScreen";
import AddStatusTextScreen from "../screens/AddStatusTextScreen";
import AddStatusMediaScreen from "../screens/AddStatusMediaScreen";
import StatusScreen from "../screens/StatusScreen";
import CallScreen from "../screens/CallScreen";
import VoiceCallScreen from "../screens/VoiceCallScreen";
import JoinCallScreen from "../screens/JoinCallScreen";
import VideoScreen from "../screens/VideoScreen";

import { StreamVideo } from "@stream-io/video-react-native-sdk";
import { StreamClientProvider, client } from "../lib/stream";
import CallsProvider from "../lib/CallsProvider";
import UserProfileScreen from "../screens/UserProfileScreen";
import FollowersScreen from "../screens/FollowersScreen";
import FollowingsScreen from "../screens/FollowingsScreen";

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (
  <StreamClientProvider>
    <CallsProvider>
      <RootStack.Navigator>
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Onboarding"
          component={OnboardingScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUpScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="SignIn"
          component={SignInScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Facet"
          component={FacetScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="HomeTimeline"
          component={HomeTimelineScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="UserTimeline"
          component={UserTimelineScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Status"
          component={StatusScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Call"
          component={CallScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="JoinCall"
          component={JoinCallScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="VoiceCall"
          component={VoiceCallScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Notification"
          component={NotificationScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Search"
          component={SearchScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Profile"
          component={ProfileScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Post"
          component={PostScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Report"
          component={ReportScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Earn"
          component={EarnScreen}
        />
        {/* <RootStack.Screen
      options={{ headerShown: false }}
      name="PostComment"
      component={PostCommentScreen}
    /> */}
        <RootStack.Screen name="EditPost" component={EditPostScreen} />
        <RootStack.Screen
          options={{
            title: "Edit profile",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleAlign: "center",
            headerTintColor: "#05375a",
          }}
          name="EditProfile"
          component={EditProfileScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Sponsor"
          component={SponsorScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Message"
          component={MessageScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Verify"
          component={VerifyScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Video"
          component={VideoScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Main"
          component={BottomNav}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="AddPost"
          component={AddPostScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="AddComment"
          component={AddCommentScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="AddGroup"
          component={AddGroupScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="ContactList"
          component={ContactListScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="AddStatusText"
          component={AddStatusTextScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="AddStatusMedia"
          component={AddStatusMediaScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="AddReel"
          component={AddReelScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Group"
          component={GroupScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Channel"
          component={ChannelScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="DiscourseContent"
          component={DiscourseContentScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Settings"
          component={SettingsScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="HelpCenter"
          component={HelpCenterScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Connect"
          component={ConnectScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Media"
          component={MediaScreen}
        />
        {/* <RootStack.Screen
          options={{ headerShown: false }}
          name="WorkSpace"
          component={WorkSpaceScreen}
        /> */}
        <RootStack.Screen
          options={{ headerShown: false }}
          name="UserProfile"
          component={UserProfileScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Followers"
          component={FollowersScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="Followings"
          component={FollowingsScreen}
        />
        {/* <RootStack.Screen
          options={{ headerShown: false }}
          name="Facets"
          component={FacetsScreen}
        /> */}
        {/* <RootStack.Screen
          options={{ headerShown: false }}
          name="Wallet"
          component={WalletScreen}
        /> */}
        {/* <RootStack.Screen
          options={{ headerShown: false }}
          name="PayStack"
          component={PayStackScreen}
        />
        <RootStack.Screen
          options={{ headerShown: false }}
          name="DrawerNav"
          component={DrawerNav}
        /> */}
      </RootStack.Navigator>
    </CallsProvider>
  </StreamClientProvider>
);

export default RootStackScreen;
