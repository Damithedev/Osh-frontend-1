import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const getSuggestedGroups = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    // console.log("token", token);
    axios
      .get(`${url}group`, config)
      .then((response) => {
        dispatch({
          type: "GET_SUGGESTED_GROUP_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_SUGGESTED_GROUP_FAILURE",
          data: error.response.data,
        });
      });
  };
};

export const getGroup = (groupId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}channels/${channelName}`, config)
      .then((response) => {
        console.log("READ CHANNEL SUCCESS", response.data);
        dispatch({
          type: "READ_CHANNEL_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "READ_CHANNEL_FAILURE",
          data: error.response.data,
        });
      });
  };
};
