const initialState = {
  data: "",
};

const singleStatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_STATUS_SUCCESS":
      return {
        data: action.data,
      };
      return {
        data: action.data,
      };
    default:
      return state;
  }
};

export default singleStatusReducer;
