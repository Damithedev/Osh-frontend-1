import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  data: "",
  message: "",
  success: "",
};

const suggestedFriendReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_SUGGESTED_FRIEND_SUCCESS":
      return {
        data: action.data.data,
        message: action.data.message,
        success: action.data.success,
      };
    case "GET_SUGGESTED_FRIEND_FAILURE":
      return {
        data: action.data,
      };
    case "FOLLOW_FRIEND_SUCCESS":
      const arrayOfObjects = state.data.filter(
        (obj) => obj._id !== action.data.data._id
      );
      return {
        message: action.data.message,
        data: arrayOfObjects,
        success: action.data.success,
      };
    default:
      return state;
  }
};

export default suggestedFriendReducer;
