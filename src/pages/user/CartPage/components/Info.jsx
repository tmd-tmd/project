import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Card, Form, Select, Input } from "antd";

import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  setCheckoutInfoAction,
} from "../../../../redux/actions";

const Info = ({ setStep }) => {
  const [infoForm] = Form.useForm();
  const dispatch = useDispatch();

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  const { userInfo } = useSelector((state) => state.user);

  const initialValues = {
    fullName: userInfo.data.fullName || "",
    email: userInfo.data.email || "",
    phoneNumber: "",
    address: "",
    cityCode: undefined,
    districtCode: undefined,
    wardCode: undefined,
  };

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);

  useEffect(() => {
    if (userInfo.data.id) {
      infoForm.resetFields();
    }
  }, [userInfo.data]);

  const handleSubmitInfoForm = (values) => {
    const { cityCode, districtCode, wardCode, ...otherValues } = values;
    const cityData = cityList.data.find((item) => item.code === cityCode);
    const districtData = districtList.data.find(
      (item) => item.code === districtCode
    );
    const wardData = wardList.data.find((item) => item.code === wardCode);
    dispatch(
      setCheckoutInfoAction({
        ...otherValues,
        cityId: cityData.id,
        cityName: cityData.name,
        districtId: districtData.id,
        districtName: districtData.name,
        wardId: wardData.id,
        wardName: wardData.name,
      })
    );
    setStep(2);
  };

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [cityList.data]);

  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [districtList.data]);

  const renderWardListOptions = useMemo(() => {
    return wardList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [wardList.data]);

  return (
    <>
      <h2 style={{ textAlign: "center" }}>Xác minh thông tin</h2>
      <Card size="small">
        <Form
          name="infoForm"
          form={infoForm}
          layout="vertical"
          initialValues={initialValues}
          onFinish={(values) => handleSubmitInfoForm(values)}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label="Tên đầy đủ"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "Bạn cần nhập tên",
                  },
                  {
                    type: "string",
                    min: 1,
                    message: "Tên phải có nhiều hơn 1 kí tự",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Bạn cần nhập email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Số điện thoại liên lạc"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "Bạn cần nhập số điện thoại",
                  },
                  {
                    type: "string",
                    min: 9,
                    message: "Số điện thoại phải có ít nhất 10 số",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tỉnh - Thành phố"
                name="cityCode"
                rules={[
                  {
                    required: true,
                    message: "Bạn cần chọn tỉnh-thành phố",
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    dispatch(getDistrictListAction({ cityCode: value }));
                    infoForm.setFieldsValue({
                      districtCode: undefined,
                      wardCode: undefined,
                    });
                  }}
                >
                  {renderCityOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Quận - Huyện"
                name="districtCode"
                rules={[
                  {
                    required: true,
                    message: "Bạn cần chọn quận-huyện",
                  },
                ]}
              >
                <Select
                  onChange={(value) => {
                    dispatch(getWardListAction({ districtCode: value }));
                    infoForm.setFieldsValue({
                      wardCode: undefined,
                    });
                  }}
                  disabled={!infoForm.getFieldValue("cityCode")}
                >
                  {renderDistrictOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Phường - Xã"
                name="wardCode"
                rules={[
                  {
                    required: true,
                    message: "Bạn cần chọn phường-xã",
                  },
                ]}
              >
                <Select disabled={!infoForm.getFieldValue("districtCode")}>
                  {renderWardListOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Địa chỉ cụ thể"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng thêm địa chỉ cụ thể",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Row justify="space-between" style={{ marginTop: 8 }}>
        <Button onClick={() => setStep(0)}>Quay lại</Button>
        <Button type="primary" onClick={() => infoForm.submit()}>
          Tiếp tục
        </Button>
      </Row>
    </>
  );
};

export default Info;
