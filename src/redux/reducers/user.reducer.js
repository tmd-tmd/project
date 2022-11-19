import { createReducer } from "@reduxjs/toolkit";

import { USER_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

const initialState = {
  userInfo: {
    data: {},
    loading: true,
    error: "",
  },
  loginData: {
    loading: false,
    error: "",
  },
  registerData: {
    loading: false,
    error: "",
  },
};

const userReducer = createReducer(initialState, {
  [REQUEST(USER_ACTION.LOGIN)]: (state, action) => {
    return {
      ...state,
      loginData: {
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(USER_ACTION.LOGIN)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: data,
        loading: false,
      },
      loginData: {
        loading: false,
        error: "",
      },
    };
  },
  [FAIL(USER_ACTION.LOGIN)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      loginData: {
        ...state.loginData,
        loading: false,
        error: error,
      },
    };
  },

  [REQUEST(USER_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      registerData: {
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(USER_ACTION.REGISTER)]: (state, action) => {
    return {
      ...state,
      registerData: {
        loading: false,
        error: "",
      },
    };
  },
  [FAIL(USER_ACTION.REGISTER)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      registerData: {
        ...state.registerData,
        loading: false,
        error: error,
      },
    };
  },

  [REQUEST(USER_ACTION.LOGOUT)]: (state) => {
    localStorage.removeItem("accessToken");
    return {
      ...state,
      userInfo: {
        data: {},
        loading: true,
        error: "",
      },
    };
  },

  [REQUEST(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(USER_ACTION.GET_USER_INFO)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      userInfo: {
        ...state.userInfo,
        loading: false,
        error: error,
      },
    };
  },
});

export default userReducer;
