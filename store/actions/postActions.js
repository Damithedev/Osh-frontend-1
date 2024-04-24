import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const createPost = (post, channel) => {
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
      .post(`${url}posts/${channel}`, post, config)
      .then((response) => {
        console.log("success", response.data);
        dispatch({
          type: "CREATE_POST_SUCCESS",
          data: response,
        });
      })
      .catch((error) => {
        console.log("fail", error);
        dispatch({
          type: "CREATE_POST_FAILURE",
          data: error.response,
        });
      });
  };
};

export const getPost = (postId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}posts/${postId}`, config)
      .then((response) => {
        console.log("post from action", response.data);
        dispatch({
          type: "GET_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("post from action", error);
        dispatch({
          type: "GET_POST_FAILURE",
          data: error,
        });
      });
  };
};

export const getUserPost = (page) => {
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}posts/${user?.data._id}/posts?page=${page}&limit=5`, config)
      .then((response) => {
        console.log("get user post", response.data);
        dispatch({
          type: "GET_USER_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("post from action", error);
        dispatch({
          type: "GET_USER_POST_FAILURE",
          data: error,
        });
      });
  };
};

export const likePost = (post) => {
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .put(`${url}posts/${post}/like`, user.data._id, config)
      .then((response) => {
        console.log("likePost", response.data);
        dispatch({
          type: "LIKE_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("likePost", error);
        dispatch({
          type: "LIKE_POST_FAILURE",
          data: error,
        });
      });
  };
};

export const dislikePost = (post) => {
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .put(`${url}posts/${post}/dislike`, user.data._id, config)
      .then((response) => {
        console.log("dislikePost", response.data);
        dispatch({
          type: "DISLIKE_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("dislikePost", error.response);
        dispatch({
          type: "DISLIKE_POST_FAILURE",
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
          type: "STAR_POST_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("starPost", error.response);
        dispatch({
          type: "STAR_POST_FAILURE",
          data: error,
        });
      });
  };
};
