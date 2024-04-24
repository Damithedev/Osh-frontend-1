import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const getFacets = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}facets/all`, config)
      .then((response) => {
        dispatch({
          type: "GET_FACETS_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_FACETS_FAILURE",
          data: error.response.data,
        });
      });
  };
};

export const readFacets = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}users/profile`, config)
      .then((response) => {
        // console.log(response.data);
        dispatch({
          type: "READ_FACET_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "READ_FACET_FAILURE",
          data: error.response.data,
        });
      });
  };
};

export const subscribedFacet = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .get(`${url}facets/subscribe`, config)
      .then((response) => {
        // console.log("sub facet", response.data);
        dispatch({
          type: "GET_SUBSCRIBED_FACET_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: "GET_SUBSCRIBED_FACET_FAILURE",
          data: error.response.data,
        });
      });
  };
};
