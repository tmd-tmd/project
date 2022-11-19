import React from "react";
import Slider from "react-slick";
import { Rate, Spin } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, generatePath } from "react-router-dom";

import {
  getProductListAction,
  getCategoryListAction,
} from "../../redux/actions";

import { ROUTES } from "../../constants/routes";

import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Helmet from "../../components/Helmet";
import Slide from "../../components/Slide";

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "yellow", color: "red" }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
};
const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    companyId: [],
    demandId: [],
    keyword: "",
    order: "",
    price: [],
  });
  useEffect(() => {
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
        },
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
    ],
  };
  // onmouseover:

  const renderCategoryList = () => {
    return categoryList.data.map((categoryItem) => {
      const renderProductList = productList.data.filter((itemProduct) => {
        return itemProduct.categoryId === categoryItem.id;
      });
      return (
        <div className="home__product" key={categoryItem.id}>
          <div
            className="home__product__title"
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(
                generatePath(ROUTES.USER.CATEGORY_LIST, {
                  id: categoryItem.id,
                })
              );
            }}
          >
            {categoryItem.name}
          </div>
          <div className="home__product__list">
            <Slider {...settings} className="home__product__list__slick">
              {renderProductList.map((item) => {
                if (item.reviews.length > 0) {
                  const rate = item.reviews.map((ItemReviews) => {
                    return ItemReviews.rate;
                  });
                  const sum = rate.reduce((partialSum, a) => partialSum + a, 0);
                  var avg = sum / rate.length;
                }

                return (
                  <div
                    className="home__product__list__slick__item"
                    key={item.id}
                    onClick={() =>
                      navigate(
                        generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                          id: `${item.slug}.${item.id}`,
                        })
                      )
                    }
                  >
                    <img src={item.image} alt="" />
                    <div className="home__product__list__slick__item__detail">
                      <p className="home__product__list__slick__item__detail-title">
                        {item.name}
                      </p>
                      {avg ? (
                        <Rate
                          defaultValue={avg}
                          className="home__product__list__slick__item__detail-rate"
                        />
                      ) : (
                        <Rate
                          defaultValue={5}
                          className="home__product__list__slick__item__detail-rate"
                        />
                      )}

                      <del>100.000.000</del>
                      <p className="home__product__list__slick__item__detail-price">
                        {item.price.toLocaleString()} đ
                      </p>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <Helmet title="Trang chủ">
        <Header />
        <Slide />
        <div className="container">
          <Spin spinning={categoryList.loading}>
            <div className="main">{renderCategoryList()}</div>
          </Spin>
        </div>
        <Footer />
      </Helmet>
    </>
  );
};

export default HomePage;
