import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faLaptop,
  faPaintRoller,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { Carousel } from "antd";

import image1 from "../assets/images/img/image1.png";
import image2 from "../assets/images/img/image2.png";
import image3 from "../assets/images/img/image3.png";
import image4 from "../assets/images/img/image4.png";
import image5 from "../assets/images/img/image5.png";

import slider1 from "../assets/images/slider/slide1.jpg";
import slider2 from "../assets/images/slider/slide2.jpg";
import slider3 from "../assets/images/slider/slide3.png";
import slider4 from "../assets/images/slider/slide4.jpg";

import { useEffect } from "react";

import { getCategoryListAction } from "../redux/actions";

import { useSelector, useDispatch } from "react-redux";

const Slide = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryListAction());
  }, []);

  const renderCategoryOptions = () => {
    return categoryList.data.map((item) => {
      return (
        <div
          key={item.id}
          className="slide__left__item"
          onClick={() => {
            navigate(`/category/${item.id}`);
          }}
        >
          <FontAwesomeIcon
            icon={item.icon}
            className="slide__left__item-icon"
          />
          <span>{item.name}</span>
        </div>
      );
    });
  };
  return (
    <>
      <div className="container">
        <div className="slide">
          <div className="slide__left">{renderCategoryOptions()}</div>
          <div className="slide__between">
            <Carousel autoplay>
              <div>
                <img src={slider1} alt="" />
              </div>
              <div>
                <img src={slider2} alt="" />
              </div>
              <div>
                <img src={slider3} alt="" />
              </div>
              <div>
                <img src={slider4} alt="" />
              </div>
            </Carousel>
          </div>
          <div className="slide__right">
            <Link to="/">
              <img src={image1} alt="" />
            </Link>
            <img src={image2} alt="" />
          </div>
          {/* <div className="slide__bottom">
            <div className="slide__bottom-item">
              <img src={image3} alt="" />
            </div>
            <div className="slide__bottom-item">
              <img src={image4} alt="" />
            </div>
            <div className="slide__bottom-item">
              <img src={image5} alt="" />
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Slide;
