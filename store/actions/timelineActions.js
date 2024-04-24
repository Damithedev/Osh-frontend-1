import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createPost = (post) => {
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
      .post(`${url}posts`, post, config)
      .then((response) => {
        console.log("success", response.data);
        dispatch({
          type: "CREATE_TIMELINE_POST_SUCCESS",
          data: response,
        });
      })
      .catch((error) => {
        console.log("fail", error);
        dispatch({
          type: "CREATE_TIMELINE_POST_FAILURE",
          data: error.response,
        });
      });
  };
};

export const getTimeline = (page) => {
  console.log("get timelinee", page);
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}posts/timeline/all?page=${page}&limit=10`, config)
      .then((response) => {
        dispatch({
          type: "GET_TIMELINE_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("timeline from actionn", error);
        dispatch({
          type: "GET_TIMELINE_FAILURE",
          data: error,
        });
      });
  };
};

export const likeTimelinePost = (post) => {
  console.log("likeTimelinePost", post);
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .put(`${url}posts/${post}/like`, user.data._id, config)
      .then((response) => {
        console.log("likePost res", response.data);
        dispatch({
          type: "LIKE_TIMELINE_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("likePost res", error);
        dispatch({
          type: "LIKE_TIMELINE_POST_FAILURE",
          data: error,
        });
      });
  };
};

export const dislikeTimelinePost = (post) => {
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .put(`${url}posts/${post}/dislike`, user.data._id, config)
      .then((response) => {
        console.log("dislikePost", response.data);
        dispatch({
          type: "DISLIKE_TIMELINE_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("dislikePost", error.response);
        dispatch({
          type: "DISLIKE_TIMELINE_POST_FAILURE",
          data: error,
        });
      });
  };
};

export const starPost = (post) => {
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .put(`${url}posts/${post}/star`, user.data._id, config)
      .then((response) => {
        console.log("starPost", response.data);
        dispatch({
          type: "STAR_TIMELINE_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("starPost", error.response);
        dispatch({
          type: "STAR_TIMELINE_POST_FAILURE",
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
