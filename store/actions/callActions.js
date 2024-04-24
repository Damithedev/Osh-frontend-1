export const createCall = (callData) => {
  console.log(callData);
  return (dispatch) => {
    dispatch({
      type: "CREATE_CALL",
      data: callData,
    });
  };
};

export const getCalls = () => {
  return (dispatch) => {
    dispatch({
      type: "GET_CALLS",
      data: "",
    });
  };
};
