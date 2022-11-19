import { createReducer } from "@reduxjs/toolkit";

import { CART_ACTION, REQUEST } from "../constants";

const initialState = {
  cartList: JSON.parse(localStorage.getItem("cart")) || [],
  checkoutInfo: {},
  checkoutPayment: {},
  codeDiscount: {},
};

const cartReducer = createReducer(initialState, {
  [REQUEST(CART_ACTION.ADD_TO_CART)]: (state, action) => {
    let newCartList = [...state.cartList];
    const { productId, optionId, quantity } = action.payload;
    if (optionId) {
      const exitOptionIndex = state.cartList.findIndex(
        (item) => item.optionId === optionId
      );
      if (exitOptionIndex !== -1) {
        newCartList.splice(exitOptionIndex, 1, {
          ...state.cartList[exitOptionIndex],
          // quantity: state.cartList[exitOptionIndex].quantity + quantity,
          quantity: quantity,
        });
      } else {
        newCartList = [action.payload, ...state.cartList];
      }
    } else {
      const exitProductIndex = state.cartList.findIndex(
        (item) => item.productId === productId
      );
      if (exitProductIndex !== -1) {
        newCartList.splice(exitProductIndex, 1, {
          ...state.cartList[exitProductIndex],
          // quantity: state.cartList[exitProductIndex].quantity + quantity,
          quantity: quantity,
        });
      } else {
        newCartList = [action.payload, ...state.cartList];
      }
    }
    localStorage.setItem("cart", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },

  [REQUEST(CART_ACTION.UPDATE_CART_ITEM)]: (state, action) => {
    const newCartList = [...state.cartList];
    const { productId, optionId, quantity } = action.payload;
    const exitProductIndex = state.cartList.findIndex(
      (item) =>
        item.productId === productId &&
        (optionId ? item.optionId === optionId : true)
    );
    if (exitProductIndex !== -1) {
      newCartList.splice(exitProductIndex, 1, {
        ...state.cartList[exitProductIndex],
        quantity: quantity,
      });
    }
    localStorage.setItem("cart", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },

  [REQUEST(CART_ACTION.DELETE_CART_ITEM)]: (state, action) => {
    const { productId, optionId } = action.payload;
    const newCartList = state.cartList.filter((item) =>
      optionId ? item.optionId !== optionId : item.productId !== productId
    );
    localStorage.setItem("cart", JSON.stringify(newCartList));
    return {
      ...state,
      cartList: newCartList,
    };
  },

  [REQUEST(CART_ACTION.SET_CHECKOUT_INFO)]: (state, action) => {
    return {
      ...state,
      checkoutInfo: action.payload,
    };
  },

  [REQUEST(CART_ACTION.ADD_CODE_DISCOUNT_T0_CART)]: (state, action) => {
    return {
      ...state,
      codeDiscount: action.payload,
    };
  },
});

export default cartReducer;
