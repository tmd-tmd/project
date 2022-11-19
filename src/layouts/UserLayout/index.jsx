import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { LoadingOutlined } from "@ant-design/icons";

import { ROUTES } from "../../constants/routes";

import * as S from "./styles";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Helmet from "../../components/Helmet";

const UserLayout = () => {
  // const { userInfo } = useSelector((state) => state.user);
  // console.log(
  //   "🚀 ~ file: index.jsx ~ line 17 ~ AdminLayout ~ userInfo",
  //   userInfo
  // );
  // const accessToken = localStorage.getItem("accessToken");

  // if (accessToken && userInfo.loading) {
  //   return (
  //     <S.LoadingWrapper>
  //       <LoadingOutlined style={{ fontSize: 32 }} />
  //     </S.LoadingWrapper>
  //   );
  // } else if (userInfo.data.role !== "user") {
  //   return <Navigate to={ROUTES.USER.HOME} />;
  // }

  return (
    <Helmet title="Trang chủ">
      <Header />
      <div className="container">
        <div style={{ marginTop: 24 }}>
          <Outlet />
        </div>
      </div>
      <Footer />
    </Helmet>
  );
};

export default UserLayout;
