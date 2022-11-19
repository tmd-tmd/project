import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  companyList: {
    data: [],
    loading: false,
    error: "",
  },
};

const companyReducer = createReducer(initialState, {
  GET_COMPANY_LIST_REQUEST: (state, action) => {
    return {
      ...state,
      companyList: {
        ...state.companyList,
        loading: true,
        error: "",
      },
    };
  },
  GET_COMPANY_LIST_SUCCESS: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      companyList: {
        ...state.companyList,
        data: data,
        loading: false,
      },
    };
  },
  GET_COMPANY_LIST_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      companyList: {
        ...state.companyList,
        loading: false,
        error: error,
      },
    };
  },
});

export default companyReducer;
