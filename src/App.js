import Routers from "./routers/Routers";
import { useLocation } from "react-router-dom";
import "moment/locale/vi";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";

import { getUserInfoAction } from "./redux/actions";
function App() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      const decodeInfo = jwtDecode(accessToken);
      dispatch(getUserInfoAction({ id: decodeInfo.sub }));
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Routers />
    </>
  );
}

export default App;
