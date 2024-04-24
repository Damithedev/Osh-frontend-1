import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getChats = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}discourse/all`, config)
      .then((response) => {
        console.log("all chat", response.data);
        dispatch({
          type: "GET_USER_CHATS_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_USER_CHATS_FAILURE",
          data: error.response.data,
        });
      });
  };
};
