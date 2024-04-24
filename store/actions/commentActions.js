import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const createComment = (post, parentPost) => {
  console.log("pp", parentPost);
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
      .patch(`${url}posts/${parentPost}/comment`, post, config)
      .then((response) => {
        console.log("comment success", response.data);
        dispatch({
          type: "CREATE_COMMENT_SUCCESS",
          data: response,
        });
      })
      .catch((error) => {
        console.log("fail", error.response);
        dispatch({
          type: "CREATE_COMMENT_FAILURE",
          data: error.response,
        });
      });
  };
};

export const getComments = (postId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}posts/${postId}/comments`, config)
      .then((response) => {
        // console.log("comment success", response.data);
        dispatch({
          type: "GET_COMMENTS_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("comment from action", error);
        dispatch({
          type: "GET_COMMENTS_FAILURE",
          data: error,
        });
      });
  };
};
