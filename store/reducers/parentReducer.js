const initialState = {
  message: "",
  data: "",
  success: "",
};

const parentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PARENTS_SUCCESS":
      return {
        message: action.data.message,
        data: action.data.data,
        success: action.data.success,
      };
    case "GET_PARENTS_FAILURE":
      return {
        message: action.data.message,
        data: action.data.data,
        success: action.data.success,
      };
    default:
      return state;
  }
};

export default parentReducer;
