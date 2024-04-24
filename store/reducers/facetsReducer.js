import jwtDecode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  message: "",
  data: "",
  success: "",
};

const facetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_FACETS_SUCCESS":
      return {
        data: action.data,
      };
    case "GET_FACETS_FAILURE":
      return {
        data: action.data,
      };
    case "SUBSCRIBE_FACET_SUCCESS":
      console.log("state from reducer", state.data.data);
      return {
        message: action.data.message,
        // data: state.data.data.map((activeFacet) =>
        //   activeFacet._id === action.data.data._id
        //     ? action.data.data
        //     : activeFacet
        // ),
        data: state.data.data,
        success: action.data.success,
      };
    default:
      return state;
  }
};

export default facetsReducer;
