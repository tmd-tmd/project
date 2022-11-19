import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

import AdminHeader from "../../components/AdminHeader";
import Footer from "../../components/Footer";
import Helmet from "../../components/Helmet";

function AdminLayout() {
  const { userInfo } = useSelector((state) => state.user);

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken && userInfo.loading) {
    return (
      <S.LoadingWrapper>
        <LoadingOutlined style={{ fontSize: 32 }} />
      </S.LoadingWrapper>
    );
  } else if (userInfo.data.role !== "admin") {
    return <Navigate to={ROUTES.USER.HOME} />;
  }

  return (
    <>
      <Helmet title="Trang chủ">
        <AdminHeader />
        <div className="container">
          <div style={{ marginTop: 24 }}>
            <Outlet />
          </div>
        </div>
        <Footer />
      </Helmet>
    </>
  );
}

export default AdminLayout;
