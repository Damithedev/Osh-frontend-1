import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const getParents = (postId) => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}posts/${postId}/parents`, config)
      .then((response) => {
        console.log("parent success", response.data);
        dispatch({
          type: "GET_PARENTS_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("parent from action", error);
        dispatch({
          type: "GET_PARENTS_FAILURE",
          data: error,
        });
      });
  };
};
