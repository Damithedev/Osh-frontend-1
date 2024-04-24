import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  data: {},
};

const facetReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_FACET_SUCCESS":
      return {
        data: action.data,
      };
    case "EDIT_FACET_FAILURE":
      return {
        data: action.data,
      };
    case "READ_FACET_SUCCESS":
      return {
        data: action.data,
      };
    case "READ_FACET_FAILURE":
      return {
        data: action.data,
      };
    case "GET_SUBSCRIBED_FACET_SUCCESS":
      return {
        data: action.data,
      };
    case "GET_SUBSCRIBED_FACET_FAILURE":
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

export default facetReducer;
