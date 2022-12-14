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
      <h2 style={{ textAlign: "center" }}>X??c minh th??ng tin</h2>
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
                label="T??n ?????y ?????"
                name="fullName"
                rules={[
                  {
                    required: true,
                    message: "B???n c???n nh???p t??n",
                  },
                  {
                    type: "string",
                    min: 1,
                    message: "T??n ph???i c?? nhi???u h??n 1 k?? t???",
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
                    message: "B???n c???n nh???p email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="S??? ??i???n tho???i li??n l???c"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: "B???n c???n nh???p s??? ??i???n tho???i",
                  },
                  {
                    type: "string",
                    min: 9,
                    message: "S??? ??i???n tho???i ph???i c?? ??t nh???t 10 s???",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="T???nh - Th??nh ph???"
                name="cityCode"
                rules={[
                  {
                    required: true,
                    message: "B???n c???n ch???n t???nh-th??nh ph???",
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
                label="Qu???n - Huy???n"
                name="districtCode"
                rules={[
                  {
                    required: true,
                    message: "B???n c???n ch???n qu???n-huy???n",
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
                label="Ph?????ng - X??"
                name="wardCode"
                rules={[
                  {
                    required: true,
                    message: "B???n c???n ch???n ph?????ng-x??",
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
                label="?????a ch??? c??? th???"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Vui l??ng th??m ?????a ch??? c??? th???",
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
        <Button onClick={() => setStep(0)}>Quay l???i</Button>
        <Button type="primary" onClick={() => infoForm.submit()}>
          Ti???p t???c
        </Button>
      </Row>
    </>
  );
};

export default Info;
