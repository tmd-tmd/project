import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* getDiscountListSaga() {
  try {
    const result = yield axios.get("http://localhost:4000/discounts");
    yield put({
      type: "GET_DISCOUNT_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_DISCOUNT_LIST_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}
export default function* companySaga() {
  yield takeEvery("GET_DISCOUNT_LIST_REQUEST", getDiscountListSaga);
}
