import { fork } from "redux-saga/effects";

import userSaga from "./user.saga";
import productSaga from "./product.saga";
import categorySaga from "./category.saga";
import companySaga from "./company.saga";
import locationSaga from "./location.saga";
import favoriteSaga from "./favorite.saga";
import reviewSaga from "./review.saga";
import orderSaga from "./order.saga";
import demandSaga from "./demand.saga";
import discountSaga from "./discount.saga";

export default function* rootSaga() {
  yield fork(userSaga);
  yield fork(productSaga);
  yield fork(categorySaga);
  yield fork(companySaga);
  yield fork(locationSaga);
  yield fork(favoriteSaga);
  yield fork(reviewSaga);
  yield fork(orderSaga);
  yield fork(demandSaga);
  yield fork(discountSaga);
}
