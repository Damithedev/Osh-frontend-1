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

export const subscribeFacet = (facetname) => {
  return async (dispatch, getState) => {
    const user = getState().auth;
    const token = await AsyncStorage.getItem("token");
    const config = { headers: { Authorization: token } };
    axios
      .put(`${url}facets/${facetname}/subscribe`, user.data._id, config)
      .then((response) => {
        // console.log("subscribe facet", response.data);
        dispatch({
          type: "SUBSCRIBE_FACET_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("subscribe facet err", error);
        dispatch({
          type: "SUBSCRIBE_FACET_FAILURE",
          data: error,
        });
      });
  };
};
