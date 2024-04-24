import React, { useEffect, useState } from "react";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-native-sdk";
import { useSelector, useDispatch } from "react-redux";
import { readProfile } from "../store/actions/profileActions";

export const StreamClientProvider = ({ children }) => {
  const [credentials, setCredentials] = useState({ userId: "", token: "" });
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readProfile());
  }, []);

  useEffect(() => {
    profile?.data &&
      setCredentials({
        userId: profile?.data?.data?.username,
        token: profile?.data?.data?.getStreamToken,
      });
  }, [profile]);

  const apiKey = process.env.EXPO_PUBLIC_STREAM_API_KEY || "";
  const userId = credentials.userId || "";
  const token = credentials.token || "";
  // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoia2luZ3dhcmUifQ.0O3T7AYbDbByjYeVjq4ThYgKaNXpFA0RakDt1qwCBuE";
  const user = { id: userId };

  const client = new StreamVideoClient({ apiKey, user, token });

  return <StreamVideo client={client}>{children}</StreamVideo>;
};
