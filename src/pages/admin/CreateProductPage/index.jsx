import { useEffect, useMemo } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Card,
  Select,
  Space,
  Col,
  Row,
  Spin,
  Upload,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import slug from "slug";

import { ROUTES } from "../../../constants/routes";

import * as S from "./styles";

import {
  getCompanyListAction,
  getCategoryListAction,
  createProductAction,
} from "../../../redux/actions";

function CreateProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createForm] = Form.useForm();

  const { createProductData } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);
  const { companyList } = useSelector((state) => state.company);

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getCompanyListAction());
  }, []);

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCreateProduct = async (values) => {
    const { options, images, ...productValues } = values;
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      await newImages.push({
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      });
    }

    await dispatch(
      createProductAction({
        values: {
          ...productValues,
          categoryId: parseInt(values.categoryId),
          companyId: parseInt(values.companyId),
          price: parseInt(values.price),
          old_price: parseInt(values.old_price),
          default_value: parseInt(values.default_value),
          slug: slug(productValues.name),
        },
        options: options,
        images: newImages,
        callback: {
          goToAdminProductList: () => navigate(ROUTES.ADMIN.PRODUCT_LIST),
        },
      })
    );
  };

  const renderCategoryOptions = useMemo(() => {
    return categoryList.data.map((item, index) => {
      return (
        <Select.Option key={item.id} values={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [categoryList.data]);

  const renderCompanyOptions = useMemo(() => {
    return companyList.data.map((item) => {
      return (
        <Select.Option key={item.id} values={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [companyList.data]);
  return (
    <Spin spinning={categoryList.loading}>
      <Row>
        <Col span={16} offset={4}>
          <S.TopWrapper>
            <h2>Thêm sản phẩm</h2>
            <Button
              type="primary"
              loading={createProductData.loading}
              onClick={() => createForm.submit()}
            >
              Thêm
            </Button>
          </S.TopWrapper>
          <Form
            form={createForm}
            name="createProduct"
            layout="vertical"
            onFinish={(values) => handleCreateProduct(values)}
          >
            <Form.Item
              label="Tên sản phẩm"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Bạn cần nhập tên sản phẩm!",
                },
                {
                  type: "string",
                  min: 4,
                  message: "Tên sản phẩm phải lớn hơn 4 kí tự!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            {/* <Form.Item label="Hình ảnh" name="image">
              <Input />
            </Form.Item> */}
            <Form.Item
              label="Loại"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: "Bạn cần chọn loại!",
                },
              ]}
            >
              <Select loading={categoryList.loading}>
                {renderCategoryOptions}
              </Select>
            </Form.Item>
            <Form.Item
              label="Hãng"
              name="companyId"
              rules={[
                {
                  required: true,
                  message: "Bạn cần chọn hãng!",
                },
              ]}
            >
              <Select loading={companyList.loading}>
                {renderCompanyOptions}
              </Select>
            </Form.Item>
            <Space>
              <Form.Item
                label="Giá"
                name="price"
                rules={[
                  {
                    required: true,
                    message: "Bạn cần nhập tên sản phẩm!",
                  },
                  {
                    type: "number",
                    min: 1000,
                    message: "Giá sản phẩm phải lớn hơn 1000!",
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>
              <span>VND</span>
            </Space>

            <Form.Item label="Options">
              <Form.List name="options">
                {(fields, callback) => (
                  <>
                    {fields.map((field) => {
                      return (
                        <Card
                          key={`card-${field.key}`}
                          size="small"
                          style={{ marginBottom: 16 }}
                        >
                          <Form.Item
                            {...field}
                            label="Option name"
                            name={[field.name, "name"]}
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            label="Bonus price"
                            name={[field.name, "bonusPrice"]}
                          >
                            <InputNumber
                              style={{ width: "100%" }}
                              formatter={(value) =>
                                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                              }
                              parser={(value) =>
                                value.replace(/\$\s?|(,*)/g, "")
                              }
                            />
                          </Form.Item>
                          <Button
                            ghost
                            danger
                            onClick={() => {
                              callback.remove(field.name);
                              // call API delete by id
                            }}
                          >
                            Delete
                          </Button>
                        </Card>
                      );
                    })}
                    <Button
                      type="dashed"
                      block
                      icon={<PlusOutlined />}
                      style={{ marginBottom: 16 }}
                      onClick={() => callback.add()}
                    >
                      Add option
                    </Button>
                  </>
                )}
              </Form.List>
            </Form.Item>
            <Form.Item
              label="Images"
              name="images"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) return e;
                return e?.fileList;
              }}
            >
              <Upload listType="picture-card" beforeUpload={Upload.LIST_IGNORE}>
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
            <Form.Item label="Content" name="content">
              <ReactQuill
                theme="snow"
                onChange={(value) => {
                  createForm.setFieldsValue({ content: value });
                }}
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Spin>
  );
}

export default CreateProductPage;
