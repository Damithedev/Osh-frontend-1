import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const swiftNotifyReducer = (state = "", action) => {
  switch (action.type) {
    case "SHOW_NOTIFY":
      return {
        message: action.message,
        show: action.show,
      };
    default:
      return {
        message: "",
        show: false,
      };
  }
};

export default swiftNotifyReducer;
