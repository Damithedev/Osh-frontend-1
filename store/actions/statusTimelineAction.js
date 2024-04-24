import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const createStatusPost = (post) => {
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
      .post(`${url}status`, post, config)
      .then((response) => {
        console.log("success", response.data);
        dispatch({
          type: "CREATE_TIMELINE_STATUS_SUCCESS",
          data: response,
        });
      })
      .catch((error) => {
        console.log("fail", error);
        dispatch({
          type: "CREATE_TIMELINE_STATUS_FAILURE",
          data: error.response,
        });
      });
  };
};

export const getStatusTimeline = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}status/timeline/all`, config)
      .then((response) => {
        console.log("res timelin status", response.data);
        dispatch({
          type: "GET_STATUS_TIMELINE_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("timeline from actionn", error);
        dispatch({
          type: "GET_STATUS_TIMELINE_FAILURE",
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
