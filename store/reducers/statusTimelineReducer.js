const initialState = {
  message: "",
  data: "",
  success: "",
};

const statusTimelineReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_STATUS_TIMELINE_SUCCESS":
      return {
        message: action.data.message,
        data: action.data.data,
        success: action.data.success,
      };
    case "CREATE_TIMELINE_STATUS_SUCCESS":
      return {
        message: action.data.data.message,
        data: state.data,
        success: action.data.data.success,
      };
      return {
        message: action.data.message,
        data: action.data.data,
        success: action.data.success,
      };
    case "DELETE_TIMELINE_STATUS_SUCCESS":
      console.log("action data", action.data);
      const currentState = state.data;
      console.log("current state length", currentState.length);
      const index = currentState.map((i) => i._id).indexOf(action.data);
      console.log("laundry state id", index);
      state.data.splice(index, 1);
      const newState = currentState;
      console.log("newState length", newState.length);
      console.log("current state new length", currentState.length);
      return {
        message: action.data.message,
        data: newState,
        success: action.data.success,
      };
    default:
      return state;
  }
};

export default statusTimelineReducer;
