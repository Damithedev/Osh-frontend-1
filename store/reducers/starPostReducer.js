const initialState = {
  message: "",
  data: "",
  success: "",
};

const starPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STARRED_TIMELINE_SUCCESS":
      return {
        message: action.data.message,
        data: action.data.data,
        success: action.data.success,
      };
    case "LIKE_STARRED_TIMELINE_POST_SUCCESS":
      const myState = state.data;
      // console.log("timeline reducer", myState);
      // console.log("timeline action id", action.data);
      return {
        message: action.data.message,
        data: state.data.map((timelinePost) =>
          timelinePost._id === action.data.data._id
            ? action.data.data
            : timelinePost
        ),
        success: action.data.success,
      };
    case "DISLIKE_STARRED_TIMELINE_POST_SUCCESS":
      return {
        message: action.data.message,
        data: state.data.map((timelinePost) =>
          timelinePost._id === action.data.data._id
            ? action.data.data
            : timelinePost
        ),
        success: action.data.success,
      };
    case "STAR_STARRED_POST_SUCCESS":
      return {
        message: action.data.message,
        data: state.data.map((timelinePost) =>
          timelinePost._id === action.data.data._id
            ? action.data.data
            : timelinePost
        ),
        success: action.data.success,
      };
    default:
      return state;
  }
};

export default starPostReducer;
