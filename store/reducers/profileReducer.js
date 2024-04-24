import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  data: {},
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_PROFILE_SUCCESS":
      return {
        data: action.data,
      };
    case "EDIT_PROFILE_FAILURE":
      return {
        data: action.data,
      };
    case "READ_PROFILE_SUCCESS":
      return {
        data: action.data,
      };
    case "READ_PROFILE_FAILURE":
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

export default profileReducer;
