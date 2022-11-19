import { createAction } from "@reduxjs/toolkit";

import { CART_ACTION, REQUEST } from "../constants";

export const addToCartAction = createAction(REQUEST(CART_ACTION.ADD_TO_CART));
export const updateCartItemAction = createAction(
  REQUEST(CART_ACTION.UPDATE_CART_ITEM)
);
export const deleteCartItemAction = createAction(
  REQUEST(CART_ACTION.DELETE_CART_ITEM)
);
export const setCheckoutInfoAction = createAction(
  REQUEST(CART_ACTION.SET_CHECKOUT_INFO)
);
export const setCheckoutPaymentAction = createAction(
  REQUEST(CART_ACTION.SET_CHECKOUT_PAYMENT)
);
export const addCodeDiscountToCartAction = createAction(
  REQUEST(CART_ACTION.ADD_CODE_DISCOUNT_T0_CART)
);
