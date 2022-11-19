import { Row, Col, Button, Radio, Card, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

import * as S from "../styles";

import {
  orderProductAction,
  guestOrderProductAction,
} from "../../../../redux/actions";

const Payment = ({ setStep }) => {
  const [paymentForm] = Form.useForm();
  const dispatch = useDispatch();

  const { cartList, checkoutInfo, codeDiscount } = useSelector(
    (state) => state.cart
  );

  const { userInfo } = useSelector((state) => state.user);
  const totalPrice = cartList
    .map((item) => item.price * item.quantity)
    .reduce((total, price) => total + price, 0);

  const handleSubmitPaymentForm = (values) => {
    if (userInfo.data.id) {
      dispatch(
        orderProductAction({
          ...checkoutInfo,
          ...values,
          userId: userInfo.data.id,
          totalPrice: codeDiscount?.percentage
            ? totalPrice - (totalPrice * codeDiscount.percentage) / 100
            : totalPrice,
          status: "Đang chuẩn bị đơn",
          products: cartList.map((item) => ({
            productId: item.productId,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
            ...(item.optionName && {
              optionName: item.optionName,
            }),
          })),
        })
      );
    } else {
      dispatch(
        guestOrderProductAction({
          ...checkoutInfo,
          ...values,
          totalPrice: codeDiscount?.percentage
            ? totalPrice - (totalPrice * codeDiscount.percentage) / 100
            : totalPrice,
          products: cartList.map((item) => ({
            productId: item.productId,
            productName: item.name,
            price: item.price,
            quantity: item.quantity,
            ...(item.optionName && {
              optionName: item.optionName,
            }),
          })),
        })
      );
    }
  };

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Thanh toán</h2>

      <Form
        form={paymentForm}
        layout="vertical"
        name="paymentForm"
        onFinish={(values) => handleSubmitPaymentForm(values)}
      >
        <Card size="small">
          <Form.Item label="Chọn phương thức thanh toán:" name="method">
            <Radio.Group>
              <Row>
                <Col span={24}>
                  <Radio value="COD">
                    <img
                      class="method-icon"
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                      width="32"
                      height="32"
                      alt="icon"
                    ></img>{" "}
                    Thanh toán tiền mặt khi nhận hàng
                  </Radio>
                </Col>
                <Col span={24}>
                  <Radio value="VISA">
                    <img
                      class="method-icon"
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-credit.svg"
                      width="32"
                      height="32"
                      alt="icon"
                    ></img>{" "}
                    Thanh toán bằng thẻ quốc tế Visa, Master, JCB
                  </Radio>
                </Col>
                <Col span={24}>
                  <Radio value="ATM">
                    <img
                      class="method-icon"
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg"
                      width="32"
                      height="32"
                      alt="icon"
                    ></img>{" "}
                    Thẻ ATM nội địa/Internet Banking (Hỗ trợ Internet Banking)
                  </Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
        </Card>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.method !== currentValues.method
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("method") === "VISA" && (
              <Card size="small">
                <h2>
                  Thêm Thẻ Tín Dụng/ Ghi Nợ Quốc Tế{" "}
                  <img
                    width="32"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-credit-type-tiki-card.svg"
                    alt="tikicard"
                  ></img>
                  <img
                    width="32"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-visa.png"
                    alt="visa"
                  ></img>
                  <img
                    width="32"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-credit-type-mastercard.svg?v=1"
                    alt="mastercard"
                  ></img>
                  <img
                    width="32"
                    src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-credit-type-jcb.svg"
                    alt="jcb"
                  ></img>
                </h2>
                <Form.Item label="Số thẻ:" name="cardNumber">
                  <Input placeholder="VD: 4123 4567 8901 2345" />
                </Form.Item>
                <Form.Item label="Tên in trên thẻ:" name="cardName">
                  <Input placeholder="VD: NGUYEN VAN A" />
                </Form.Item>
                <Form.Item label="Ngày hết hạn:" name="date">
                  <Input placeholder="MM/YY" />
                </Form.Item>
                <Form.Item label="Mã bảo mật:" name="code">
                  <Input placeholder="VD: 123" />
                </Form.Item>
              </Card>
            )
          }
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.method !== currentValues.method
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("method") === "ATM" && (
              <Card size="small">
                <Form.Item label="Thẻ ATM:" name="bank">
                  <Radio.Group
                    onChange={(e) =>
                      console.log(`radio checked:${e.target.value}`)
                    }
                  >
                    <S.RadioButton value="Vietcombank">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/VCB.jpg"
                        alt="Vietcombank"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/VCB.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="VietinBank">
                      <img
                        src="https://salt.tikicdn.com/cache/w160/ts/upload/c0/92/71/98b4ac5a2e4fbe9cee282d40c54579bd.png"
                        alt="Vietinbank"
                        height="40"
                        srcset="https://salt.tikicdn.com/cache/w160/ts/upload/c0/92/71/98b4ac5a2e4fbe9cee282d40c54579bd.png"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="BIDV">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/BIDV.jpg"
                        alt="BIDV"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/BIDV.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="VPBank">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/VPB.jpg"
                        alt="VPBank"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/VPB.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="MB">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/MB.jpg"
                        alt="MBBank"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/MB.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="Techcombank">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/MB.jpg"
                        alt="MBBank"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/MB.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="Agribank">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/VARB.jpg"
                        alt="Agribank"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/VARB.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="ACB">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/ACB.jpg"
                        alt="ACB"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/ACB.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="HDBank">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/HDB.jpg"
                        alt="HDBank"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/HDB.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="SHB">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/SHB.jpg"
                        alt="SHB"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/SHB.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="Sacombank">
                      <img
                        src="https://salt.tikicdn.com/cache/w160/ts/upload/b3/67/8d/2feb0c1f3f3ec9f38dd4d462883459be.png"
                        alt="Sacombank"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/cache/w160/ts/upload/b3/67/8d/2feb0c1f3f3ec9f38dd4d462883459be.png"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="VIB">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/VIB.jpg"
                        alt="VIB"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/VIB.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="SCB">
                      <img
                        src="https://salt.tikicdn.com/cache/w160/ts/upload/3e/14/63/1ad7660d2088ca2b2d56e8fccb7f07c4.png"
                        alt="SCB"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/cache/w160/ts/upload/3e/14/63/1ad7660d2088ca2b2d56e8fccb7f07c4.png"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="SeABank">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/SEAB.jpg"
                        alt="SeABank"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/SEAB.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                    <S.RadioButton value="Oceanbank">
                      <img
                        src="https://salt.tikicdn.com/assets/img/zalopaygw/OJB.jpg"
                        alt="Oceanbank"
                        width="80"
                        height="40"
                        srcset="https://salt.tikicdn.com/assets/img/zalopaygw/OJB.jpg"
                        class="WebpImg__StyledImg-sc-h3ozu8-0 fWjUGo"
                      ></img>
                    </S.RadioButton>
                  </Radio.Group>
                </Form.Item>
              </Card>
            )
          }
        </Form.Item>
      </Form>
      <Row justify="space-between" style={{ marginTop: 8 }}>
        <Button onClick={() => setStep(1)}>Quay lại</Button>
        <Button
          type="primary"
          onClick={() => {
            paymentForm.submit();
            setStep(3);
          }}
        >
          Hoàn thành
        </Button>
      </Row>
    </>
  );
};

export default Payment;
