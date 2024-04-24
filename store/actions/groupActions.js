import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const createGroup = (groupCreds) => {
  return async (dispatch, getState) => {
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
        Authorization: token,
      },
    };
    axios
      .post(`${url}group`, groupCreds, config)
      .then((response) => {
        console.log("success", response.data);
        dispatch({
          type: "CREATE_GROUP_SUCCESS",
          data: response,
        });
      })
      .catch((error) => {
        console.log("fail", error.response);
        dispatch({
          type: "CREATE_GROUP_FAILURE",
          data: error.response,
        });
      });
  };
};

export const editChannelPicture = (formData) => {
  return async (dispatch, getState) => {
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token,
      },
    };
    axios
      .put(`${url}/users/profilepic`, formData, config)
      .then((response) => {
        try {
          dispatch({
            type: "EDIT_PROFILE_SUCCESS",
            data: response.data,
          });
          console.log("profile", response.data);
        } catch (err) {
          console.log(err);
        }
      })
      .catch((error) => {
        console.log("faileeeeddddd", error);
      });
  };
};

export const getUserGroups = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    // console.log("token", token);
    axios
      .get(`${url}group`, config)
      .then((response) => {
        // console.log("group from action", response.data);
        dispatch({
          type: "GET_USER_GROUP_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_USER_GROUP_FAILURE",
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
      .get(`${url}group/${groupId}`, config)
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
