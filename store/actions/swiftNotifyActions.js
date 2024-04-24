export const swiftNotifySwitch = (message, isShow) => {
  return (dispatch) => {
    dispatch({
      type: "SHOW_NOTIFY",
      message: message,
      show: isShow,
    });
  };
};
