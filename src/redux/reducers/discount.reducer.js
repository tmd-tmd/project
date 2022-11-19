import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  discountList: {
    data: [],
    loading: false,
    error: "",
  },
};

const discountReducer = createReducer(initialState, {
  GET_DISCOUNT_LIST_REQUEST: (state, action) => {
    return {
      ...state,
      discountList: {
        ...state.discountList,
        loading: true,
        error: "",
      },
    };
  },
  GET_DISCOUNT_LIST_SUCCESS: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      discountList: {
        ...state.discountList,
        data: data,
        loading: false,
      },
    };
  },
  GET_DISCOUNT_LIST_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      discountList: {
        ...state.discountList,
        loading: false,
        error: error,
      },
    };
  },
});

export default discountReducer;
