import { url } from "../store/api";
import { Platform } from "react-native";
import { io } from "socket.io-client";

export const BaseUrl =
  Platform.os === "android"
    ? "http://192.168.79.149:3000/"
    : "http://localhost:3000";

export const socket = io.connect(url);
