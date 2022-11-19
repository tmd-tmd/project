import { Outlet, Navigate } from "react-router-dom";

import { ROUTES } from "../../constants/routes";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Helmet from "../../components/Helmet";

const LoginLayout = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) return <Navigate to={ROUTES.USER.HOME} />;
  return (
    <Helmet title="Trang chủ">
      <Header />
      <div className="container">
        <div
          style={{
            width: 500,
            margin: `${0} auto`,
          }}
        >
          <Outlet />
        </div>
      </div>
      <Footer />
    </Helmet>
  );
};

export default LoginLayout;
