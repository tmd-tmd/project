import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";

function* getDemandListSaga() {
  try {
    const result = yield axios.get("http://localhost:4000/demands");
    yield put({
      type: "GET_DEMAND_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_DEMAND_LIST_FAIL",
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}
export default function* companySaga() {
  yield takeEvery("GET_DEMAND_LIST_REQUEST", getDemandListSaga);
}
