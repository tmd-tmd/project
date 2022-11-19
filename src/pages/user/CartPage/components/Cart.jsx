import { useEffect, useState } from "react";

import {
  Button,
  Input,
  Table,
  InputNumber,
  Row,
  Col,
  Form,
  Space,
  Avatar,
  Popconfirm,
  Result,
} from "antd";
import { useNavigate, Link, generatePath } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { ROUTES } from "../../../../constants/routes";

import {
  updateCartItemAction,
  deleteCartItemAction,
  getDiscountListAction,
  addCodeDiscountToCartAction,
} from "../../../../redux/actions";

import * as S from "../styles";

const CartPage = ({ setStep }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [DiscountForm] = Form.useForm();

  const [searchDiscount, setSearchDiscount] = useState({});

  const { cartList } = useSelector((state) => state.cart);

  const { discountList } = useSelector((state) => state.discount);

  useEffect(() => {
    dispatch(getDiscountListAction());
  }, []);

  const handleChangeQuantity = (productId, optionId, value) => {
    dispatch(
      updateCartItemAction({
        productId: productId,
        optionId: optionId,
        quantity: value,
      })
    );
  };
  const handleDeleteCartItem = (productId, optionId) => {
    dispatch(
      deleteCartItemAction({
        productId: productId,
        optionId: optionId,
      })
    );
  };

  const tableColumn = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (_, item) => {
        return (
          <Link
            to={generatePath(ROUTES.USER.PRODUCT_DETAIL, {
              id: `${item.slug}.${item.productId}`,
            })}
          >
            <Space>
              <Avatar size="large" shape="square" src={item.image} />
              <h4>
                {item.name} {item?.optionName && ` - ${item.optionName}`}
              </h4>
            </Space>
          </Link>
        );
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity, item) => (
        <InputNumber
          min={1}
          value={quantity}
          onChange={(value) =>
            handleChangeQuantity(item.productId, item.optionId, value)
          }
        />
      ),
    },
    {
      title: "Số tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, item) =>
        `${(item.price * item.quantity).toLocaleString()} VND`,
    },
    {
      title: " ",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Popconfirm
          title="Bạn muốn xóa sản phẩm này?"
          onConfirm={() => handleDeleteCartItem(item.productId, item.optionId)}
          okText="Yes"
          cancelText="No"
        >
          <Button ghost danger>
            Xóa
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const totalPrice = cartList.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const discountItem = discountList.data.find((item) => {
    return item.code === searchDiscount?.code;
  });

  const newTotalPrice = discountItem
    ? totalPrice - (totalPrice * discountItem.percentage) / 100
    : totalPrice;

  const handleAddCodeDiscountToCart = (values) => {
    setSearchDiscount(values);

    const codeDiscount = discountList.data.find((item) => {
      return item.code === values?.code;
    });
    codeDiscount && dispatch(addCodeDiscountToCartAction({ ...codeDiscount }));
  };

  return (
    <>
      {cartList.length < 1 ? (
        <Result
          status="404"
          title="Giỏ hàng trống"
          subTitle="Mua hàng ngay để nhận được nhiều ưu đãi"
          extra={
            <Button type="primary" onClick={() => navigate(ROUTES.HOME)}>
              Mua ngay
            </Button>
          }
        />
      ) : (
        <S.Wrapper>
          <h2 style={{ textAlign: "center" }}>Giỏ hàng</h2>
          <Table
            size="small"
            columns={tableColumn}
            dataSource={cartList}
            rowKey="id"
            pagination={false}
          />
          <h3 style={{ marginTop: 16 }}>Mã giảm giá</h3>
          <Form
            form={DiscountForm}
            layout="vertical"
            onFinish={(values) => handleAddCodeDiscountToCart(values)}
          >
            <Row style={{ marginTop: 8 }}>
              <Col span={17}>
                <Form.Item name="code">
                  <Input placeholder="Nhập mã khuyến mãi" />
                </Form.Item>
              </Col>
              <Col span={6} offset={1}>
                <Button type="primary" htmlType="submit" block>
                  Xác nhận
                </Button>
              </Col>
            </Row>
          </Form>
          <span>
            {discountItem && (
              <span
                style={{
                  fontSize: 13,
                  color: "#624949",
                }}
              >
                Bạn được <span>{discountItem.name.toLowerCase()} !!</span>
              </span>
            )}
          </span>
          <span>
            {!discountItem && searchDiscount.code?.length > 0 && (
              <span
                style={{
                  fontSize: 13,
                  color: "#624949",
                }}
              >
                Không có mã giảm giá này !!
              </span>
            )}
          </span>
          <div
            style={{
              textAlign: "right",
              fontSize: 18,
            }}
          >
            Tổng thanh toán:{" "}
            <span
              style={{
                color: "red",
                fontWeight: 650,
              }}
            >
              {newTotalPrice.toLocaleString()} đ
            </span>
          </div>

          <Row justify="end" style={{ marginTop: 16 }}>
            <Button type="primary" onClick={() => setStep(1)}>
              Tiếp tục
            </Button>
          </Row>
        </S.Wrapper>
      )}
    </>
  );
};

export default CartPage;
