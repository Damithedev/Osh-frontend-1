const initialState = {
  data: "",
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_POST_SUCCESS":
      return {
        data: action.data,
      };
    case "GET_POST_SUCCESS":
      return {
        message: action.data.message,
        data: action.data.data,
        success: action.data.success,
      };
    case "GET_POST_FAILURE":
      return {
        message: action.data.message,
        data: action.data.data,
        success: action.data.success,
      };
    case "GET_USER_POST_SUCCESS":
      return {
        message: action.data.message,
        data: action.data.data.results,
        success: action.data.success,
      };
    case "GET_USER_POST_FAILURE":
      return {
        message: action.data.message,
        data: action.data.data,
        success: action.data.success,
      };
    case "LIKE_POST_SUCCESS":
      return {
        data: action.data,
      };
    case "LIKE_POST_FAILURE":
      return {
        data: action.data,
      };
    case "DISLIKE_POST_SUCCESS":
      return {
        data: action.data,
      };
    case "DISLIKE_POST_FAILURE":
      return {
        data: action.data,
      };
    case "STAR_POST_SUCCESS":
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

export default postReducer;
