import axios from "axios";
import { url } from "../api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const signUp = (userCreds) => {
  return async (dispatch, getState) => {
    const token = await AsyncStorage.getItem("token");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
        Authorization: token,
      },
    };
    axios
      .post(`${url}users/register-user`, userCreds, config)
      .then((response) => {
        console.log("successfully registered", response.data);
        dispatch({
          type: "SIGN_UP_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("failed registeration", error);
        dispatch({
          type: "SIGN_UP_FAILURE",
          data: error.response,
        });
      });
  };
};

// Verify Account
export const verifyAccount = (code) => {
  return async (dispatch) => {
    const verifyCode = {
      verificationCode: code,
    };
    console.log("verified", verifyCode);
    axios
      .patch(`${url}users/verify`, {
        verificationCode: code,
      })
      .then((response) => {
        console.log("successfully verified", response.data);
        dispatch({
          type: "VERIFY_ACCOUNT_SUCCESS",
          data: response.data,
        });
      })
      .catch((error) => {
        console.log("failed verified", error);
        dispatch({
          type: "VERIFY_ACCOUNT_FAILURE",
          data: error.response,
        });
      });
  };
};

// Resend Account Verificator
export const resendVerifyAccount = (token) => {
  return (dispatch) => {
    axios
      .get(`${url}auth/account/verify/resend?tkn=${token}`, userCreds)
      .then((response) => {
        console.log("re-verify Success", response.data);
        dispatch({
          type: "VERIFY_ACCOUNT_SUCCESS",
          data: response.data,
        });
      })
      .catch((err) => {
        console.log("re-verify failed", err);
        dispatch({
          type: "VERIFY_ACCOUNT_FAILED",
          data: response.data,
        });
      });
  };
};

// Verify Password Recovery
export const verifyPasswordRecovery = (token) => {
  return (dispatch) => {
    axios
      .post(`${url}auth/password/verify?tkn=${token}`, userCreds)
      .then((response) => {
        console.log("verify Success", response.data);
        dispatch({
          type: "VERIFY_PASSWORD_SUCCESS",
          data: response.data,
        });
      })
      .catch((err) => {
        console.log("verify Failed", err);
        dispatch({
          type: "VERIFY_PASSWORD_FAILED",
          data: response.data,
        });
      });
  };
};

// Reset Password
export const passwordReset = (token) => {
  return (dispatch) => {
    axios
      .post(`${url}auth/password/reset?hash=${token}`, userCreds)
      .then((response) => {
        console.log("password reset Success", response.data);
        dispatch({
          type: "PASSWORD_RESET_SUCCESS",
          data: response.data,
        });
      })
      .catch((err) => {
        console.log("password reset Failed", err);
        dispatch({
          type: "PASSWORD_RESET_FAILED",
          data: response.data,
        });
      });
  };
};

// User Signin
export const signIn = (userCreds) => {
  console.log("user", userCreds);
  return (dispatch) => {
    axios
      .post(`${url}users/login-user`, userCreds)
      .then((response) => {
        const token = response.data.token;
        AsyncStorage.setItem("token", token);
        console.log("sign in", response.data);
        dispatch({
          type: "SIGN_IN_SUCCESS",
          data: response.data,
        });
      })
      .catch((err) => {
        console.log("sign inn err", err);
        dispatch({
          type: "SIGN_IN_FAILURE",
          data: err.response.data,
        });
      });
  };
};

// User Logout
export const userLogout = (userId) => {
  return (dispatch) => {
    axios
      .delete(`${url}users/${userId}/logout`, userCreds)
      .then((response) => {
        console.log("user logout success", response.data);
        dispatch({
          type: "USER_LOGOUT_SUCCESS",
          data: response.data,
        });
      })
      .catch((err) => {
        console.log("user logout failed", err);
        dispatch({
          type: "USER_LOGOUT_FAILED",
          data: response.data,
        });
      });
  };
};
