import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  data: "",
  message: "",
  success: "",
};

const suggestedGroupReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SUGGESTED_GROUP_SUCCESS":
      return {
        data: action.data.data,
        message: action.data.message,
        success: action.data.success,
      };
    case "GET_SUGGESTED_GROUP_FAILURE":
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

export default suggestedGroupReducer;
