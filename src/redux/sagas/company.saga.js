import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* getCompanyListSaga() {
  try {
    const result = yield axios.get("http://localhost:4000/companies");
    yield put({
      type: "GET_COMPANY_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_COMPANY_LIST_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}
export default function* companySaga() {
  yield takeEvery("GET_COMPANY_LIST_REQUEST", getCompanyListSaga);
}
