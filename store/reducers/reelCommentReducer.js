const initialState = {
  message: "",
  data: "",
  success: "",
};

const reelCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_REEL_COMMENT_SUCCESS":
      return {
        message: action.data.data.message,
        data: [action.data.data.data, ...state.data],
        success: action.data.data.success,
      };
    case "GET_REEL_COMMENTS_SUCCESS":
      return {
        message: action.data.message,
        data: action.data.data,
        success: action.data.success,
      };
    default:
      return state;
  }
};

export default reelCommentReducer;
