import { useEffect } from "react";

import { generatePath, Link } from "react-router-dom";

import { ROUTES } from "../../../constants/routes";

import {
  Tabs,
  Table,
  Input,
  Form,
  Spin,
  Button,
  InputNumber,
  Row,
  Col,
  Select,
  Space,
  Avatar,
  Popconfirm,
} from "antd";

import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import {
  getOrderList,
  getUserInfoAction,
  getFavoriteList,
} from "../../../redux/actions";

import * as S from "./styles";

const ProfilePage = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  const { orderList } = useSelector((state) => state.order);

  const { favoriteList } = useSelector((state) => state.favorite);

  useEffect(() => {
    dispatch(getUserInfoAction());
  }, []);

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderList({ userId: userInfo.data.id }));
      dispatch(getFavoriteList({ userId: userInfo.data.id }));
      updateForm.resetFields();
    }
  }, [userInfo.data]);

  const [updateForm] = Form.useForm();
  const initialValues = {
    fullName: userInfo.data?.fullName,
    gender: userInfo.data?.gender,
    age: userInfo.data?.age,
    phoneNumber: userInfo.data?.phoneNumber,
    email: userInfo.data?.email,
  };

  const tableColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      key: "status",
      render: (status) => <span style={{ fontWeight: 600 }}>{status}</span>,
    },
    {
      title: "Tổng thanh toán",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => (
        <span style={{ fontWeight: 600, color: "red" }}>
          {totalPrice.toLocaleString()} đ
        </span>
      ),
    },

    {
      title: "Ngày mua",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
  ];

  const tableColumn2 = [
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
              <Avatar size="large" shape="square" src={item.product.image} />
              <h4>{item.product.name}</h4>
            </Space>
          </Link>
        );
      },
    },

    {
      title: "Giá tiền",
      dataIndex: "price",
      key: "price",
      render: (_, item) => `${item.product.price.toLocaleString()} VND`,
    },
    {
      title: " ",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Popconfirm
          title="Xóa khỏi danh sách yêu thích?"
          // onConfirm={() =>
          //   handleDeleteCartItem(item.productId, item.optionId)
          // }
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
  return (
    <>
      <Row>
        <Col
          lg={{ span: 18, offset: 3 }}
          sm={{ span: 20, offset: 2 }}
          xs={{ span: 24, offset: 0 }}
        >
          <S.Image />
          <Tabs tabPosition="left" size="small" defaultActiveKey="1">
            <h1> </h1>
            <Tabs.TabPane tab="Thông tin cá nhân" key="1">
              <h1 style={{ textAlign: "center" }}>Trang cá nhân</h1>
              <Spin spinning={userInfo.loading}>
                <Form
                  form={updateForm}
                  layout="vertical"
                  initialValues={initialValues}
                  // onFinish={(values) => handleUpdateUser(values)}
                >
                  <Form.Item
                    label="Tên khách hàng"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Bạn cần nhập đúng tên!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Tuổi"
                    name="age"
                    rules={[
                      {
                        required: true,
                        message: "Bạn cần nhập tuổi!",
                      },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                  <Form.Item
                    label="Giới tính"
                    name="gender"
                    rules={[
                      {
                        required: true,
                        message: "Bạn cần nhập giới tính!",
                      },
                    ]}
                  >
                    <Select style={{ width: "100%" }}>
                      <Select.Option value={"Khác"}>Khác</Select.Option>
                      <Select.Option value={"Nam"}>Nam</Select.Option>
                      <Select.Option value={"Nữ"}>Nữ</Select.Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="Số điện thoại"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Bạn cần nhập số điện thoại chính xác!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="E-mail"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Bạn cần nhập email chính xác!",
                      },
                    ]}
                  >
                    <Input disabled="true" />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    // loading={productDetail.loading}
                  >
                    Cập nhật
                  </Button>
                </Form>
              </Spin>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử mua hàng" key="2">
              <h1 style={{ textAlign: "center" }}>Lịch sử mua hàng</h1>
              <Table
                columns={tableColumns}
                dataSource={orderList.data}
                rowKey="id"
                pagination={false}
                expandable={{
                  expandedRowRender: (record) => (
                    <div
                      style={{
                        fontSize: 13,
                        padding: 8,
                        backgroundColor: "#ffffff",
                      }}
                    >
                      {record.orderProducts.map((item, index) => (
                        <div key={item.id} style={{ marginBottom: 8 }}>
                          <div style={{ fontWeight: 600 }}>
                            {index + 1}. {item.productName}
                            {item.optionName && ` - ${item.optionName}`}
                          </div>
                          <div style={{ marginLeft: 14 }}>
                            <div>Số lượng: {item.quantity}</div>
                            <div>
                              Số tiền: {item.price.toLocaleString()} *{" "}
                              {item.quantity} ={" "}
                              {(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}

                      <div style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 600 }}>
                          Địa chỉ giao hàng:{" "}
                        </span>
                        {record.address} - {record.wardName} -{" "}
                        {record.districtName} - {record.cityName}
                      </div>
                      <div style={{ marginBottom: 8 }}>
                        <span style={{ fontWeight: 600 }}>
                          Hình thức thanh toán:{" "}
                        </span>
                        {record.method}
                      </div>
                      <div style={{ fontWeight: 600, marginBottom: 8 }}>
                        <span>Tổng số tiền thanh toán: </span>
                        <span style={{ color: "red" }}>
                          {record.totalPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  ),
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Danh sách yêu thích" key="3">
              <h1 style={{ textAlign: "center" }}>
                Danh sách sản phẩm yêu thích
              </h1>
              <Table
                columns={tableColumn2}
                dataSource={favoriteList.data}
                rowKey="id"
                pagination={false}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Thay đổi mật khẩu" key="4">
              <h1 style={{ textAlign: "center" }}>Thay đổi mật khẩu</h1>
            </Tabs.TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
