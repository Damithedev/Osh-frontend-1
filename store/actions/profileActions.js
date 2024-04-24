import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const editProfile = (userData) => {
  return async (dispatch, getState) => {
    const token = await AsyncStorage.getItem("token");
    const user = jwtDecode(token);
    const userId = user._id;
    console.log("user id", userId);
    const config = { headers: { Authorization: token } };
    axios
      .put(`${url}/users/${userId}`, userData, config)
      .then((response) => {
        try {
          dispatch({
            type: "EDIT_PROFILE_SUCCESS",
            data: response,
          });
        } catch (err) {
          console.log(err);
        }
      })
      .catch((error) => {
        console.log("faileeeeddddd", error);
      });
  };
};

export const editavatar = (formData) => {
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

export const readProfile = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    // console.log("token", token);
    axios
      .get(`${url}users/profile`, config)
      .then((response) => {
        // console.log(response.data);
        dispatch({
          type: "READ_PROFILE_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "READ_PROFILE_FAILURE",
          data: error.response.data,
        });
      });
  };
};
