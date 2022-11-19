import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../../constants/routes";

const Success = ({ setStep }) => {
  const navigate = useNavigate();

  return (
    <>
      <Result
        status="success"
        title="Hoàn thành đơn hàng"
        subTitle="Đơn hàng của bạn đang được xử lý và giao đến bạn sớm nhất, vui lòng chờ 2-3 ngày, mọi thắc mắc xin vui lòng liên hệ 19001900"
        extra={[
          <Button type="primary" onClick={() => navigate(ROUTES.HOME)}>
            Trang chủ
          </Button>,
          <Button key="buy" onClick={() => navigate(ROUTES.USER.CART_PAGE)}>
            Mua thêm
          </Button>,
        ]}
      />
    </>
  );
};

export default Success;
