import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  data: "",
  message: "",
  success: "",
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_GROUP_SUCCESS":
      return {
        message: action.data.data.message,
        data: [action.data.data.data, ...state.data],
        success: action.data.data.success,
      };
    case "EDIT_GROUP_SUCCESS":
      return {
        data: action.data,
      };
    case "EDIT_GROUP_FAILURE":
      return {
        data: action.data,
      };
    case "READ_GROUP_SUCCESS":
      return {
        data: action.data,
      };
    case "GET_USER_GROUP_SUCCESS":
      return {
        data: action.data.data,
        message: action.data.message,
        success: action.data.success,
      };
    case "GET_USER_GROUP_FAILURE":
      return {
        data: action.data,
      };
    case "READ_GROUP_FAILURE":
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

export default groupReducer;
