import { takeEvery, put, debounce } from "redux-saga/effects";
import axios from "axios";

import { PRODUCT_ACTION, REQUEST, SUCCESS, FAIL } from "../constants";

function* getProductListSaga(action) {
  try {
    const { params, more, e, callback } = action.payload;
    const result = yield axios.get("http://localhost:4000/products?", {
      params: {
        _expand: ["category", "company", "demand"],
        _embed: ["options", "images", "reviews"],
        _page: params.page,
        _limit: params.limit,
        ...(params.categoryId && {
          categoryId: params.categoryId,
        }),
        ...(params.companyId && {
          companyId: params.companyId,
        }),
        ...(params.demandId && {
          demandId: params.demandId,
        }),
        ...(params.keyword && {
          q: params.keyword,
        }),
        ...(params.price && {
          price_gte: params.price[0],
          price_lte: params.price[1],
        }),
        ...(params.order && {
          _sort: "price",
          _order: params.order,
        }),
      },
    });
    if (e === 13) {
      yield callback.goToProductList();
    }
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST),
      payload: {
        data: result.data,
        meta: {
          total: parseInt(result.headers["x-total-count"]),
          page: params.page,
          limit: params.limit,
        },
        more: more,
        params: params,
      },
    });
  } catch (e) {
    yield put({
      type: [FAIL(PRODUCT_ACTION.GET_PRODUCT_LIST)],
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`http://localhost:4000/products/${id}`, {
      params: {
        _expand: ["category", "company"],
        _embed: ["options", "images", "favorites"],
      },
    });
    yield put({
      type: SUCCESS(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: FAIL(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* createProductSaga(action) {
  try {
    const { values, options, images, callback } = action.payload;
    const result = yield axios.post("http://localhost:4000/products", values);
    if (options?.length > 0) {
      for (let i = 0; i < options.length; i++) {
        yield axios.post("http://localhost:4000/options", {
          productId: result.data.id,
          name: options[i].name,
          bonusPrice: options[i].bonusPrice,
        });
      }
    }
    for (let j = 0; j < images.length; j++) {
      yield axios.post("http://localhost:4000/images", {
        ...images[j],
        productId: result.data.id,
      });
    }

    yield put({
      type: [SUCCESS(PRODUCT_ACTION.CREATE_PRODUCT)],
      payload: {
        data: result.data,
      },
    });
    yield callback.goToAdminProductList();
    // yield put({ type: [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)] });
  } catch (e) {
    yield put({
      type: [FAIL(PRODUCT_ACTION.CREATE_PRODUCT)],
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* updateProductSaga(action) {
  try {
    const {
      id,
      values,
      options,
      initialOptionIds,
      images,
      initialImageIds,
      callback,
    } = action.payload;
    const result = yield axios.patch(
      `http://localhost:4000/products/${id}`,
      values
    );
    // Options
    for (let i = 0; i < options.length; i++) {
      if (options[i].id) {
        yield axios.patch(`http://localhost:4000/options/${options[i].id}`, {
          productId: result.data.id,
          name: options[i].name,
          bonusPrice: options[i].bonusPrice,
        });
      } else {
        yield axios.post("http://localhost:4000/options", {
          productId: result.data.id,
          name: options[i].name,
          bonusPrice: options[i].bonusPrice,
        });
      }
    }
    for (let j = 0; j < initialOptionIds.length; j++) {
      const keepOption = options.find(
        (item) => item.id && item.id === initialOptionIds[j]
      );
      if (!keepOption) {
        yield axios.delete(
          `http://localhost:4000/options/${initialOptionIds[j]}`
        );
      }
    }
    // Images
    for (let i = 0; i < images.length; i++) {
      if (!images[i].id) {
        yield axios.post("http://localhost:4000/images", {
          ...images[i],
          productId: result.data.id,
        });
      }
    }
    for (let j = 0; j < initialImageIds.length; j++) {
      const keepImage = images.find(
        (item) => item.id && item.id === initialImageIds[j]
      );
      if (!keepImage) {
        yield axios.delete(
          `http://localhost:4000/images/${initialImageIds[j]}`
        );
      }
    }
    yield put({
      type: [SUCCESS(PRODUCT_ACTION.UPDATE_PRODUCT)],
      payload: {
        data: result.data,
      },
    });
    yield callback.goToAdminProductList();
  } catch (e) {
    yield put({
      type: [FAIL(PRODUCT_ACTION.UPDATE_PRODUCT)],
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

function* deleteProductSaga(action) {
  try {
    const { id, callback } = action.payload;
    yield axios.delete(`http://localhost:4000/products/${id}`);
    yield put({
      type: [SUCCESS(PRODUCT_ACTION.DELETE_PRODUCT)],
      payload: {
        id: id,
      },
    });
    yield callback.dispatch();
    // yield put({ type: [SUCCESS(PRODUCT_ACTION.GET_PRODUCT_LIST)] });
  } catch (e) {
    yield put({
      type: [FAIL(PRODUCT_ACTION.DELETE_PRODUCT)],
      payload: {
        error: "Đã có lỗi xảy ra!",
      },
    });
  }
}

export default function* productSaga() {
  // yield debounce(
  //   500,
  //   [REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST)],
  //   getProductListSaga
  // );
  yield takeEvery(REQUEST(PRODUCT_ACTION.GET_PRODUCT_LIST), getProductListSaga);
  yield takeEvery(
    REQUEST(PRODUCT_ACTION.GET_PRODUCT_DETAIL),
    getProductDetailSaga
  );
  yield takeEvery([REQUEST(PRODUCT_ACTION.CREATE_PRODUCT)], createProductSaga);
  yield takeEvery([REQUEST(PRODUCT_ACTION.UPDATE_PRODUCT)], updateProductSaga);
  yield takeEvery([REQUEST(PRODUCT_ACTION.DELETE_PRODUCT)], deleteProductSaga);
}
