import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const getStarTimeline = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}posts/starred/all`, config)
      .then((response) => {
        console.log("starred timeline from action", response);
        dispatch({
          type: "GET_STARRED_TIMELINE_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("starred timeline from action", error);
        dispatch({
          type: "GET_STARRED_TIMELINE_FAILURE",
          data: error,
        });
      });
  };
};

export const likeStarredTimelinePost = (post) => {
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .put(`${url}posts/${post}/like`, user.data._id, config)
      .then((response) => {
        console.log("likePost", response.data);
        dispatch({
          type: "LIKE_STARRED_TIMELINE_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("likePost", error);
        dispatch({
          type: "LIKE_STARRED_TIMELINE_POST_FAILURE",
          data: error,
        });
      });
  };
};

export const dislikeStarredTimelinePost = (post) => {
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .put(`${url}posts/${post}/dislike`, user.data._id, config)
      .then((response) => {
        console.log("dislikePost", response.data);
        dispatch({
          type: "DISLIKE_STARRED_TIMELINE_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("dislikePost", error.response);
        dispatch({
          type: "DISLIKE_STARRED_TIMELINE_POST_FAILURE",
          data: error,
        });
      });
  };
};

export const starStarredPost = (post) => {
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .put(`${url}posts/${post}/star`, user.data._id, config)
      .then((response) => {
        console.log("starPost", response.data);
        dispatch({
          type: "STAR_STARRED_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("starPost", error.response);
        dispatch({
          type: "STAR_STARRED_POST_FAILURE",
          data: error,
        });
      });
  };
};
