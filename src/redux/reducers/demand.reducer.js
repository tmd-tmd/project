import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  demandList: {
    data: [],
    loading: false,
    error: "",
  },
};

const demandReducer = createReducer(initialState, {
  GET_DEMAND_LIST_REQUEST: (state, action) => {
    return {
      ...state,
      demandList: {
        ...state.demandList,
        loading: true,
        error: "",
      },
    };
  },
  GET_DEMAND_LIST_SUCCESS: (state, action) => {
    const { data } = action.payload;
    return {
      ...state,
      demandList: {
        ...state.demandList,
        data: data,
        loading: false,
      },
    };
  },
  GET_DEMAND_LIST_FAIL: (state, action) => {
    const { error } = action.payload;
    return {
      ...state,
      demandList: {
        ...state.demandList,
        loading: false,
        error: error,
      },
    };
  },
});

export default demandReducer;
