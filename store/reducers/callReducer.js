const callReducer = (state = [], action) => {
  switch (action.type) {
    case "CREATE_CALL":
      return {
        data: [action.data, ...state],
      };
    case "GET_CALLS":
      return state;
    default:
      return state;
  }
};

export default callReducer;
