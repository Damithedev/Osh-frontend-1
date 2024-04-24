import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  data: "",
  message: "",
  success: "",
};

const channelReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_CHANNEL_SUCCESS":
      return {
        message: action.data.data.message,
        data: [action.data.data.data, ...state.data],
        success: action.data.data.success,
      };
    case "EDIT_CHANNEL_SUCCESS":
      return {
        data: action.data,
      };
    case "EDIT_CHANNEL_FAILURE":
      return {
        data: action.data,
      };
    case "READ_CHANNEL_SUCCESS":
      return {
        data: action.data,
      };
    case "GET_USER_CHANNELS_SUCCESS":
      return {
        data: action.data.data,
        message: action.data.message,
        success: action.data.success,
      };
    case "GET_USER_CHANNELS_FAILURE":
      return {
        data: action.data,
      };
    case "READ_CHANNEL_FAILURE":
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

export default channelReducer;
