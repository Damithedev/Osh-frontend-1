import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const createStatus = (post) => {
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
          type: "CREATE_STATUS_SUCCESS",
          data: response,
        });
      })
      .catch((error) => {
        console.log("fail", error);
        dispatch({
          type: "CREATE_STATUS_FAILURE",
          data: error.response,
        });
      });
  };
};
