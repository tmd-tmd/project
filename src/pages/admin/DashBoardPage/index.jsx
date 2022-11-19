import React from "react";
import { useSelector } from "react-redux";

function DashBoardPage() {
  const { userInfo } = useSelector((state) => state.user);
  return (
    <>
      <h1>Dash Board Page</h1>

      <h2>admin: {userInfo.data.fullName}</h2>
    </>
  );
}

export default DashBoardPage;
