import { Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useNavigate, useLocation, generatePath } from "react-router-dom";
import {
  faBars,
  faCartPlus,
  faFileCircleCheck,
  faFire,
  faPhone,
  faScrewdriverWrench,
  faSearch,
  faTruckFast,
  faUser,
  faLaptop,
  faCloud,
  faShareAltSquare,
  faNetworkWired,
  faHeadphones,
  faShippingFast,
  faSocks,
  faHouseUser,
  faMobile,
  faTabletButton,
  faDesktop,
  faLaptopHouse,
  faComputerMouse,
  faKeyboard,
  faBook,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";
import {
  FacebookFilled,
  YoutubeFilled,
  MessageOutlined,
  ToolOutlined,
  InstagramOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";

import { getProductListAction, logoutAction } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

import { ROUTES } from "../constants/routes";
import { PRODUCT_LIST_LIMIT } from "../constants/pagination";

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
  const { cartList } = useSelector((state) => state.cart);
  const accessToken = localStorage.getItem("accessToken");

  const handleRenderIconLogin = () => {
    return (
      <>
        {pathname === "/user/profile" || pathname === "/admin/dashboard" ? (
          <div className="header__top__action__item">
            <div className="header__top__action__item-icon">
              <FontAwesomeIcon icon={faSmile} />
            </div>
            <div className="header__top__action__item-detail">
              <span
                onClick={() => {
                  dispatch(logoutAction());
                  navigate(ROUTES.HOME);
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
                ? navigate(ROUTES.ADMIN.DASHBOARD)
                : navigate(ROUTES.USER.PROFILE);
            }}
          >
            <div className="header__top__action__item-icon">
              <FontAwesomeIcon icon={faSmile} />
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

  const handleFilter = (key, e) => {
    if (e.which === 13) {
      setFilterParams({
        ...filterParams,
        // ...productList.params,
        [key]: e.target.value,
      });
      dispatch(
        getProductListAction({
          params: {
            // ...productList.params,
            ...filterParams,
            [key]: e.target.value,
            page: 1,
            limit: PRODUCT_LIST_LIMIT,
          },
          e: e.which,
          callback: {
            goToProductList: () => navigate(`/products?q=${e.target.value}`),
          },
        })
      );
    }
  };

  return (
    <>
      <div className="header">
        <div className="navbar" ref={headerRef}>
          <div
            className="navbar__item show-note"
            onClick={() => {
              navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 1 }));
            }}
          >
            <FontAwesomeIcon icon={faMobile} />
            <div className="navbar__item__detail note">
              <span>Điện thoại</span>
            </div>
          </div>
          <div
            className="navbar__item show-note"
            onClick={() => {
              navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 2 }));
            }}
          >
            <FontAwesomeIcon icon={faLaptop} />
            <div className="navbar__item__detail note">
              <span>Laptop</span>
            </div>
          </div>
          <div
            className="navbar__item show-note"
            onClick={() => {
              navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 3 }));
            }}
          >
            <FontAwesomeIcon icon={faTabletButton} />
            <div className="navbar__item__detail note">
              <span>Tablet</span>
            </div>
          </div>
          <div
            className="navbar__item show-note"
            onClick={() => {
              navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 4 }));
            }}
          >
            <FontAwesomeIcon icon={faDesktop} />
            <div className="navbar__item__detail note">
              <span>PC</span>
            </div>
          </div>
          <div
            className="navbar__item show-note"
            onClick={() => {
              navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 5 }));
            }}
          >
            <FontAwesomeIcon icon={faLaptopHouse} />
            <div className="navbar__item__detail note">
              <span>Case PC</span>
            </div>
          </div>
          <div
            className="navbar__item show-note"
            onClick={() => {
              navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 6 }));
            }}
          >
            <FontAwesomeIcon icon={faHeadphones} />
            <div className="navbar__item__detail note">
              <span>Tai nghe</span>
            </div>
          </div>
          <div
            className="navbar__item show-note"
            onClick={() => {
              navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 7 }));
            }}
          >
            <FontAwesomeIcon icon={faComputerMouse} />
            <div className="navbar__item__detail note">
              <span>Chuột</span>
            </div>
          </div>
          <div
            className="navbar__item show-note"
            onClick={() => {
              navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 8 }));
            }}
          >
            <FontAwesomeIcon icon={faKeyboard} />
            <div className="navbar__item__detail note">
              <span>Bàn phím</span>
            </div>
          </div>
        </div>
        <div className="navbar__social">
          <div className="navbar__social__item">
            <MessageOutlined className="navbar__social__item-icon" />
          </div>
          <div className="navbar__social__item">
            <ToolOutlined className="navbar__social__item-icon" />
          </div>
          <div className="navbar__social__item">
            <InstagramOutlined className="navbar__social__item-icon" />
          </div>
          <div className="navbar__social__item">
            <FacebookFilled className="navbar__social__item-icon" />
          </div>
          <div className="navbar__social__item">
            <YoutubeFilled className="navbar__social__item-icon" />
          </div>
        </div>
        <div className="container">
          <div className="header__menu">
            <div className="header__menu__direct">
              <FontAwesomeIcon
                icon={faBars}
                className="header__menu__direct-icon"
                onClick={() => menuToggle()}
              />
            </div>
            <Input
              placeholder="Search..."
              suffix={<FontAwesomeIcon icon={faSearch} />}
              onKeyDown={(e) => handleFilter("keyword", e)}
              // onChange={(e) => handleFilter("keyword", e.target.value)}
              // value={productList.params.keyword}
              size="large"
              style={{ borderRadius: "5px" }}
              className="header__menu__input"
            />
            <div className="header__menu__action">
              <FontAwesomeIcon
                icon={faUser}
                className="header__menu__action-icon"
              />
            </div>
          </div>

          <div className="header__top">
            <div className="header__top__logo">
              <Link to={ROUTES.HOME}>
                <img
                  src="https://cdn.dribbble.com/users/972737/screenshots/5473796/media/a2296b3e7bc97943c27f0069100b567a.png?compress=1&resize=400x300"
                  alt=""
                />
              </Link>
            </div>
            <div className="header__top__search">
              <Input
                placeholder="Search..."
                onKeyDown={(e) => handleFilter("keyword", e)}
                // onChange={(e) => handleFilter("keyword", e.target.value)}
                // value={productList.params.keyword}
                suffix={<FontAwesomeIcon icon={faSearch} />}
                size="large"
                style={{ borderRadius: "5px" }}
              />
            </div>
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

              {accessToken ? (
                handleRenderIconLogin()
              ) : (
                <div
                  className="header__top__action__item"
                  onClick={() => {
                    navigate(ROUTES.LOGIN);
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
              <Link to={ROUTES.USER.CART_PAGE}>
                <div className="header__top__action__item">
                  <div className="header__top__action__item__total-card">
                    {cartList.length}
                  </div>
                  <div className="header__top__action__item-icon">
                    <FontAwesomeIcon icon={faCartPlus} />
                  </div>
                  <div className="header__top__action__item-detail">
                    <span>Giỏ hàng</span>
                  </div>
                </div>
              </Link>
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
                icon={faFire}
                className="header__bottom__item-icon"
              />
              <div className="header__bottom__item-title">
                Tổng hợp khuyến mãi
              </div>
            </div>
            <div className="header__bottom__item">
              <FontAwesomeIcon
                icon={faScrewdriverWrench}
                className="header__bottom__item-icon"
              />
              <div className="header__bottom__item-title">
                Chính sách bảo hành
              </div>
            </div>
            <div className="header__bottom__item">
              <FontAwesomeIcon
                icon={faFileCircleCheck}
                className="header__bottom__item-icon"
              />
              <div className="header__bottom__item-title">
                Hướng dẫn trả góp
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
                icon={faBook}
                className="header__bottom__item-icon"
              />
              <div className="header__bottom__item-title">
                Bài viết đánh giá
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
              onClick={() => navigate(ROUTES.HOME)}
            >
              <FontAwesomeIcon
                icon={faHouseUser}
                className="toggle__wrapper__support__item-icon"
              />
              <div className="toggle__wrapper__support__item-title">
                Trang chủ..
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
            <div
              className="toggle__wrapper__list__item"
              onClick={() => {
                navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 1 }));
              }}
            >
              <FontAwesomeIcon
                icon={faMobile}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">
                Điện thoại
              </div>
            </div>
            <div
              className="toggle__wrapper__list__item"
              onClick={() => {
                navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 2 }));
              }}
            >
              <FontAwesomeIcon
                icon={faLaptop}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">Laptop</div>
            </div>
            <div
              className="toggle__wrapper__list__item"
              onClick={() => {
                navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 3 }));
              }}
            >
              <FontAwesomeIcon
                icon={faTabletButton}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">Tablet</div>
            </div>
            <div
              className="toggle__wrapper__list__item"
              onClick={() => {
                navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 4 }));
              }}
            >
              <FontAwesomeIcon
                icon={faDesktop}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">PC</div>
            </div>
            <div
              className="toggle__wrapper__list__item"
              onClick={() => {
                navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 5 }));
              }}
            >
              <FontAwesomeIcon
                icon={faLaptopHouse}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">Case PC</div>
            </div>
            <div
              className="toggle__wrapper__list__item"
              onClick={() => {
                navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 6 }));
              }}
            >
              <FontAwesomeIcon
                icon={faHeadphones}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">Tai nghe</div>
            </div>
            <div
              className="toggle__wrapper__list__item"
              onClick={() => {
                navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 7 }));
              }}
            >
              <FontAwesomeIcon
                icon={faComputerMouse}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">Chuột</div>
            </div>
            <div
              className="toggle__wrapper__list__item"
              onClick={() => {
                navigate(generatePath(ROUTES.USER.CATEGORY_LIST, { id: 8 }));
              }}
            >
              <FontAwesomeIcon
                icon={faKeyboard}
                className="toggle__wrapper__list__item-icon"
              />
              <div className="toggle__wrapper__list__item-title">Bàn phím</div>
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
