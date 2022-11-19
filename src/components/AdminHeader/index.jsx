import { Input, Col, Row, Checkbox, Tag } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate, useLocation } from "react-router-dom";
import {
  faBars,
  faCartPlus,
  faFileCircleCheck,
  faFire,
  faPhone,
  faPiggyBank,
  faScrewdriverWrench,
  faSearch,
  faTruckFast,
  faUser,
  faLaptop,
  faDownload,
  faCloud,
  faHippo,
  faBackwardFast,
  faShareAltSquare,
  faNetworkWired,
  faHeadphones,
  faMapLocation,
  faShippingFast,
  faSocks,
  faAppleAlt,
  faSackXmark,
  faMouse,
  faUserSecret,
  faPersonDress,
} from "@fortawesome/free-solid-svg-icons";
import {
  FacebookFilled,
  YoutubeFilled,
  MessageOutlined,
  ToolOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

// import { getProductListAction } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

function Header() {
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    companyId: [],
    keyword: "",
    order: "",
    price: [],
  });

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 380 ||
        document.documentElement.scrollTop > 380
      ) {
        headerRef.current.classList.add("showNavbar");
      } else {
        headerRef.current.classList.remove("showNavbar");
      }
      return () => {
        window.removeEventListener("scroll");
      };
    });
  }, []);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);
  const { productList } = useSelector((state) => state.product);
  const { cartList } = useSelector((state) => state.cart);
  const accessToken = localStorage.getItem("accessToken");

  // const handleLogout = () => {
  //   localStorage.clear("accessToken");
  //   navigate("/");
  // };

  const handleRenderLogin = () => {
    return (
      <>
        {pathname === "/user/info" || pathname === "/admin/dashboard" ? (
          <div className="header__top__action__item">
            <div className="header__top__action__item-icon">
              {userInfo.data.gender === "Nam" ? (
                <FontAwesomeIcon icon={faUserSecret} />
              ) : (
                <FontAwesomeIcon icon={faPersonDress} />
              )}
            </div>
            <div className="header__top__action__item-detail">
              <span
                onClick={() => {
                  localStorage.removeItem("accessToken");
                  navigate("/");
                }}
              >
                Đăng xuất
              </span>
            </div>
          </div>
        ) : (
          <div
            className="header__top__action__item"
            onClick={() => {
              userInfo.data.role === "admin"
                ? navigate("/admin/dashboard")
                : navigate("/user/info");
            }}
          >
            <div className="header__top__action__item-icon">
              {userInfo.data.gender === "Nam" ? (
                <FontAwesomeIcon icon={faUserSecret} />
              ) : (
                <FontAwesomeIcon icon={faPersonDress} />
              )}
            </div>
            <div className="header__top__action__item-detail">
              <span>Trang cá nhân</span>
            </div>
          </div>
        )}
      </>
    );
  };

  const menuShow = useRef(null);
  const menuToggle = () => menuShow.current.classList.toggle("active");

  return (
    <>
      <div className="header">
        <div className="container">
          <div className="header__menu">
            <div className="header__menu__direct">
              <FontAwesomeIcon
                icon={faBars}
                className="header__menu__direct-icon"
                onClick={() => menuToggle()}
              />
            </div>

            <div className="header__menu__action">
              <FontAwesomeIcon
                icon={faUser}
                className="header__menu__action-icon"
              />
            </div>
          </div>

          <div className="header__top">
            <div className="header__top__logo" onClick={() => navigate("/")}>
              <img
                src="https://cdn.dribbble.com/users/972737/screenshots/5473796/media/a2296b3e7bc97943c27f0069100b567a.png?compress=1&resize=400x300"
                alt=""
              />
            </div>
            <div className="header__top__search"></div>
            <div className="header__top__action">
              <div className="header__top__action__item">
                <div className="header__top__action__item-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="header__top__action__item-detail">
                  <p></p>
                  <span>
                    Mua hàng online <br />
                    <span className="header__top__action__item-detail__number">
                      079 565 1818
                    </span>
                  </span>
                </div>
              </div>
              <Link to="/cart">
                <div className="header__top__action__item">
                  <div className="header__top__action__item-icon">
                    <FontAwesomeIcon icon={faCartPlus} />
                  </div>
                  <div className="header__top__action__item-detail">
                    <span>Giỏ hàng</span>
                  </div>
                </div>
              </Link>
              {accessToken ? (
                handleRenderLogin()
              ) : (
                <div
                  className="header__top__action__item"
                  onClick={() => {
                    navigate("/login");
                  }}
                >
                  <div className="header__top__action__item-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="header__top__action__item-detail">
                    <span>
                      Đăng nhập
                      <br />
                      Đăng ký
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="header__bottom">
            <div className="header__bottom__item">
              <FontAwesomeIcon
                icon={faBars}
                className="header__bottom__item-icon"
              />
              <div className="header__bottom__item-title">
                Danh mục sản phẩm
              </div>
            </div>
            <div className="header__bottom__item">
              <FontAwesomeIcon
                icon={faScrewdriverWrench}
                className="header__bottom__item-icon"
              />
              <div className="header__bottom__item-title">
                Xây dựng cấu hình
              </div>
            </div>
            <div className="header__bottom__item">
              <FontAwesomeIcon
                icon={faFire}
                className="header__bottom__item-icon"
              />
              <div className="header__bottom__item-title">
                Tổng hợp khuyến mãi
              </div>
            </div>
            <div className="header__bottom__item">
              <FontAwesomeIcon
                icon={faFileCircleCheck}
                className="header__bottom__item-icon"
              />
              <div className="header__bottom__item-title">
                Chính sách bảo hành
              </div>
            </div>
            <div className="header__bottom__item">
              <FontAwesomeIcon
                icon={faTruckFast}
                className="header__bottom__item-icon"
              />
              <div className="header__bottom__item-title">
                Chính sách vận chuyển
              </div>
            </div>
            <div className="header__bottom__item">
              <FontAwesomeIcon
                icon={faPiggyBank}
                className="header__bottom__item-icon"
              />
              <div className="header__bottom__item-title">
                Hướng dẫn trả góp
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="toggle" ref={menuShow}>
        <div className="toggle__wrapper">
          <div className="toggle__wrapper__support">
            <div
              className="toggle__wrapper__support__item"
              onClick={() => menuToggle()}
            >
              <FontAwesomeIcon
                icon={faScrewdriverWrench}
                className="toggle__wrapper__support__item-icon"
              />
              <div className="toggle__wrapper__support__item-title">
                Build PC
              </div>
            </div>
            <div
              className="toggle__wrapper__support__item"
              onClick={() => menuToggle()}
            >
              <FontAwesomeIcon
                icon={faShareAltSquare}
                className="toggle__wrapper__support__item-icon"
              />
              <div className="toggle__wrapper__support__item-title">
                Khuyến mãi
              </div>
            </div>
            <div
              className="toggle__wrapper__support__item"
              onClick={() => menuToggle()}
            >
              <FontAwesomeIcon
                icon={faNetworkWired}
                className="toggle__wrapper__support__item-icon"
              />
              <div className="toggle__wrapper__support__item-title">
                Giới thiệu
              </div>
            </div>
          </div>
          <div className="toggle__wrapper__list" onClick={() => menuToggle()}>
            <div className="toggle__wrapper__list__heading">
              Danh mục sản phẩm
            </div>
            <div className="toggle__wrapper__list__item">
              <FontAwesomeIcon
                icon={faLaptop}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">LapTop</div>
            </div>
            <div className="toggle__wrapper__list__item">
              <FontAwesomeIcon
                icon={faHeadphones}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">
                Tai nghe & Loa
              </div>
            </div>
            <div className="toggle__wrapper__list__item">
              <FontAwesomeIcon
                icon={faMapLocation}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">Bàn ghế</div>
            </div>
            <div className="toggle__wrapper__list__item">
              <FontAwesomeIcon
                icon={faPhone}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">
                Điện thoại
              </div>
            </div>
          </div>
          <div className="toggle__wrapper__policy" onClick={() => menuToggle()}>
            <div className="toggle__wrapper__policy__item">
              <FontAwesomeIcon
                icon={faBookmark}
                className="toggle__wrapper__policy__item-icon"
              />
              <div className="toggle__wrapper__policy__item-title">
                Chính sách bảo hành
              </div>
            </div>
            <div className="toggle__wrapper__policy__item">
              <FontAwesomeIcon
                icon={faShippingFast}
                className="toggle__wrapper__policy__item-icon"
              />
              <div className="toggle__wrapper__policy__item-title">
                Chính sách thanh toán
              </div>
            </div>
            <div className="toggle__wrapper__policy__item">
              <FontAwesomeIcon
                icon={faCloud}
                className="toggle__wrapper__policy__item-icon"
              />
              <div className="toggle__wrapper__policy__item-title">
                Chính sách bảo mật thông tin
              </div>
            </div>
            <div className="toggle__wrapper__policy__item">
              <FontAwesomeIcon
                icon={faSocks}
                className="toggle__wrapper__policy__item-icon"
              />
              <div className="toggle__wrapper__policy__item-title">
                Chính sách xử lý khiếu nại
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
