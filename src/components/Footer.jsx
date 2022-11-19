import Grid from "./Grid";
import { Link } from "react-router-dom";
import {
  FacebookOutlined,
  YoutubeOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={10}>
          <div>
            <div className="footer__title">THÔNG TIN LIÊN HỆ</div>
            <div className="footer__content">
              <div className="footer__content__showroom">
                <div className="footer__content__showroom__detail">
                  <p
                    className="footer__content__showroom__detail__name
                "
                  >
                    showroom đà nẵng
                  </p>
                  <span>Địa chỉ: 40A Hàm Nghi, Q. Thanh Khê, TP Đà Nẵng</span>
                  <p>
                    Hotline: <b>079 565 1818 - (0236) 3835566</b>{" "}
                  </p>
                </div>
                <div className="footer__content__showroom__detail">
                  <p
                    className="footer__content__showroom__detail__name
                "
                  >
                    showroom cần thơ
                  </p>

                  <span>
                    Địa chỉ: 291B/9 Nguyễn Văn Cừ ND - P.An Khánh - Q. Ninh Kiều
                    - Tp. Cần Thơ
                  </span>
                  <p>
                    Hotline: <b>(0236) 3835566</b>
                  </p>
                </div>
                <div className="footer__content__showroom__social">
                  <FacebookOutlined className="footer__content__showroom__social__icon" />
                  <YoutubeOutlined className="footer__content__showroom__social__icon" />
                  <InstagramOutlined className="footer__content__showroom__social__icon" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="footer__title">HỖ TRỢ KHÁCH HÀNG</div>
            <div className="footer__content">
              <div className="footer__content__policy">
                <Link to="/">
                  <p className="footer__content__policy__item">
                    Chính sách chung
                  </p>
                </Link>
                <Link to="/">
                  <p className="footer__content__policy__item">
                    Chính sách bảo hành
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="footer__title">THÔNG TIN KHUYẾN MÃI</div>
            <div className="footer__content">
              <div className="footer__content__sale">
                <Link to="/">
                  <p className="footer__content__policy__item">
                    Tổng hợp khuyến mãi SP-ONE
                  </p>
                </Link>
                <Link to="/">
                  <p className="footer__content__policy__item">
                    Hướng Dẫn Trả Góp tại SP-ONE – Trả Góp 0% Với Thẻ Tín Dụng
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <div className="footer__title">TỔNG ĐÀI HỖ TRỢ</div>
            <div className="footer__content">
              <div className="footer__content__support">
                <div className="footer__content__support__contact">
                  <p>Kinh Doanh</p>
                  <p className="footer__content__support__contact__number">
                    0236 383 55 66
                  </p>
                </div>
                <div className="footer__content__support__contact">
                  <p>Kỹ thuật bảo hành</p>
                  <p className="footer__content__support__contact__number">
                    0236 383 55 68
                  </p>
                </div>
                <div className="footer__content__support__logo">
                  <img
                    src="https://sp-one.vn/Content/themes/oneshop2021/assets/images/bct.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <div className="footer__copyright">
          <p>
            © 2020 SP-One : Máy tính PC | Laptop cao cấp & Workstation chính
            hãng hàng đầu Việt Nam
          </p>
          <p>Cung cấp bởi: Oneshop.asia | E-commerce solutions</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
