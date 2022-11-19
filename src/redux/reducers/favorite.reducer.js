import { createReducer } from "@reduxjs/toolkit";

import { REQUEST, SUCCESS, FAIL, FAVORITE_ACTION } from "../constants";

const initialState = {
  favoriteList: {
    data: [],
    loading: false,
    error: "",
  },
};

const favoriteReducer = createReducer(initialState, {
  [REQUEST(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        loading: true,
        error: "",
      },
    };
  },
  [SUCCESS(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        data: data,
        loading: false,
      },
    };
  },
  [FAIL(FAVORITE_ACTION.GET_FAVORITE_LIST)]: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      favoriteList: {
        ...state.favoriteList,
        loading: false,
        error: error,
      },
    };
  },
});

export default favoriteReducer;
