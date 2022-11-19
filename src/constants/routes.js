export const ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/",
  USER: {
    CATEGORY_LIST: "/category/:id",
    PRODUCT_LIST: "/products",
    PRODUCT_DETAIL: "/products/:id",
    ABOUT: "/about",
    CART_PAGE: "/cart",
    PROFILE: "user/profile",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PRODUCT_LIST: "/admin/products",
    CREATE_PRODUCT: "/admin/products/create",
    UPDATE_PRODUCT: "/admin/products/:id/update",
    USER_LIST: "/admin/users",
  },
};
