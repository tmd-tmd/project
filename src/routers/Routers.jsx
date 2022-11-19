import { Routes, Route } from "react-router-dom";

import LoginLayout from "../layouts/LoginLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

import HomePage from "../pages/HomePage";
import UserCategoryListPage from "../pages/user/CategoryListPage";
import ProductListSearchPage from "../pages/user/ProductListSearchPage";
import ProductDetailPage from "../pages/user/ProductDetailPage";
import CartPage from "../pages/user/CartPage";
import ProfilePage from "../pages/user/ProfilePage";

import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

import DashBoardPage from "../pages/admin/DashBoardPage";
import AdminProductListPage from "../pages/admin/AdminProductListPage";
import CreateProductPage from "../pages/admin/CreateProductPage";
import UpdateProductPage from "../pages/admin/UpdateProductPage";

import { ROUTES } from "../constants/routes";

const Routers = () => {
  return (
    <>
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        <Route element={<AdminLayout />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<DashBoardPage />} />
          <Route
            path={ROUTES.ADMIN.PRODUCT_LIST}
            element={<AdminProductListPage />}
          />
          <Route
            path={ROUTES.ADMIN.CREATE_PRODUCT}
            element={<CreateProductPage />}
          />
          <Route
            path={ROUTES.ADMIN.UPDATE_PRODUCT}
            element={<UpdateProductPage />}
          />
        </Route>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route element={<UserLayout />}>
          <Route
            path={ROUTES.USER.CATEGORY_LIST}
            element={<UserCategoryListPage />}
          />
          <Route
            path={ROUTES.USER.PRODUCT_LIST}
            element={<ProductListSearchPage />}
          />
          <Route
            path={ROUTES.USER.PRODUCT_DETAIL}
            element={<ProductDetailPage />}
          />
          <Route path={ROUTES.USER.CART_PAGE} element={<CartPage />} />
          <Route path={ROUTES.USER.PROFILE} element={<ProfilePage />} />
          {/* <Route path={ROUTES.USER.ABOUT} element={<AboutPage />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default Routers;
