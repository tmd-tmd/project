import React, { useState, useMemo } from "react";
import { Steps, Col, Row } from "antd";

import Cart from "./components/Cart";
import Info from "./components/Info";
import Payment from "./components/Payment";
import Success from "./components/Sucess";
import * as S from "./styles";

const CheckoutPage = () => {
  const [step, setStep] = useState(0);

  const renderCheckoutContent = useMemo(() => {
    switch (step) {
      case 1: {
        return <Info setStep={setStep} />;
      }
      case 2: {
        return <Payment setStep={setStep} />;
      }
      case 3: {
        return <Success setStep={setStep} />;
      }
      case 0:
      default: {
        return <Cart setStep={setStep} />;
      }
    }
  }, [step]);

  return (
    <S.Wrapper>
      <Row>
        <Col
          lg={{ span: 16, offset: 4 }}
          sm={{ span: 20, offset: 2 }}
          xs={{ span: 24, offset: 0 }}
        >
          <Steps current={step}>
            <Steps.Step title="Giỏ hàng" />
            <Steps.Step title="Xác minh" />
            <Steps.Step title="Thanh toán" />
            <Steps.Step title="Thành công" />
          </Steps>
          {renderCheckoutContent}
        </Col>
      </Row>
    </S.Wrapper>
  );
};

export default CheckoutPage;
