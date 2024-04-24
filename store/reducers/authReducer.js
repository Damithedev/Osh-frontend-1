import jwtDecode from "jwt-decode";
import "core-js/stable/atob";
import AsyncStorage from "@react-native-async-storage/async-storage";

// const getToken = async () => {
//   const token = await AsyncStorage.getItem("token");
//   return token;
// };

const initialState = {
  data: "",
  success: "",
  message: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_UP_SUCCESS":
      return {
        ...state,
        message: action.data.message,
        success: action.data.success,
      };
    case "SIGN_UP_FAILURE":
      return {
        ...state,
        message: action.data.message,
        success: action.data.success,
      };
    case "SIGN_IN_SUCCESS":
      // const user = jwtDecode(action.data.token, { header: true });
      const user = jwtDecode(action.data.token);
      return {
        data: user,
        message: action.data.message,
        success: action.data.success,
      };
    case "SIGN_IN_FAILURE":
      return {
        ...state,
        message: action.data.message,
        success: action.data.success,
      };
    case "VERIFY_ACCOUNT_SUCCESS":
      return {
        ...state,
        message: action.data.message,
        success: action.data.success,
      };
    case "VERIFY_ACCOUNT_FAILURE":
      return {
        ...state,
        message: action.data.message,
        success: action.data.success,
      };
    case "SIGN_OUT":
      return {
        token: "",
        username: "",
        email: "",
        _id: "",
        message: "",
        success: "",
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
