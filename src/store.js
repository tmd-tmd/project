import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import userReducer from "./redux/reducers/user.reducer";
import productReducer from "./redux/reducers/product.reducer";
import categoryReducer from "./redux/reducers/category.reducer";
import companyReducer from "./redux/reducers/company.reducer";
import cartReducer from "./redux/reducers/cart.reducer";
import locationReducer from "./redux/reducers/location.reducer";
import reviewReducer from "./redux/reducers/review.reducer";
import orderReducer from "./redux/reducers/order.reducer";
import favoriteReducer from "./redux/reducers/favorite.reducer";
import demandReducer from "./redux/reducers/demand.reducer";
import discountReducer from "./redux/reducers/discount.reducer";

import rootSaga from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    category: categoryReducer,
    company: companyReducer,
    cart: cartReducer,
    location: locationReducer,
    review: reviewReducer,
    order: orderReducer,
    favorite: favoriteReducer,
    demand: demandReducer,
    discount: discountReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});
sagaMiddleware.run(rootSaga);

export { store };
