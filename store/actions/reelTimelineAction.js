import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createReelPost = (post) => {
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
      .post(`${url}reels`, post, config)
      .then((response) => {
        console.log("success", response.data);
        dispatch({
          type: "CREATE_TIMELINE_REEL_SUCCESS",
          data: response,
        });
      })
      .catch((error) => {
        console.log("fail", error);
        dispatch({
          type: "CREATE_TIMELINE_REEL_FAILURE",
          data: error.response,
        });
      });
  };
};

export const getReelTimeline = (page) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}reels/timeline/all?page=${page}&limit=10`, config)
      .then((response) => {
        console.log("res timelin reel", response.data);
        dispatch({
          type: "GET_REEL_TIMELINE_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("timeline from actionn", error);
        dispatch({
          type: "GET_REEL_TIMELINE_FAILURE",
          data: error,
        });
      });
  };
};

export const likeTimelineReel = (post) => {
  console.log("likeTimelineReel", post);
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .put(`${url}reels/${post}/like`, user.data._id, config)
      .then((response) => {
        console.log("likePost res", response.data);
        dispatch({
          type: "LIKE_TIMELINE_REEL_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("likePost res", error);
        dispatch({
          type: "LIKE_TIMELINE_REEL_FAILURE",
          data: error,
        });
      });
  };
};

export const deleteTimelinePost = (postId) => {
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    const post = { postId: postId };
    console.log("dconsole", post);
    axios
      .delete(`${url}posts/timeline/delete/${postId}`, config, user.data._id)
      .then((response) => {
        console.log("deleteTimelinePost", response.data);
        dispatch({
          type: "DELETE_TIMELINE_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("deleteTimelinePost", error.response);
        dispatch({
          type: "DELETE_TIMELINE_POST_FAILURE",
          data: error,
        });
      });
  };
};
