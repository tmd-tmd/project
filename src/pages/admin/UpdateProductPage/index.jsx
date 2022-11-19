import { useEffect, useMemo } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Card,
  Select,
  Space,
  Spin,
  Row,
  Col,
  Upload,
} from "antd";

import { PlusOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";

import { ROUTES } from "../../../constants/routes";

import {
  updateProductAction,
  getCategoryListAction,
  getCompanyListAction,
  getProductDetailAction,
  clearProductDetailAction,
} from "../../../redux/actions";

import {
  convertBase64ToImage,
  convertImageToBase64,
} from "../../../utils/file";

function UpdateProductPage() {
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateForm] = Form.useForm();

  const { productDetail } = useSelector((state) => state.product);
  const { companyList } = useSelector((state) => state.company);
  const { categoryList } = useSelector((state) => state.category);

  const initialValues = {
    name: productDetail.data?.name,
    price: productDetail.data?.price,
    categoryId: productDetail.data?.categoryId,
    companyId: productDetail.data?.companyId,
    content: productDetail.data?.content,
    // image: productDetail.data?.image,
    options: productDetail.data?.options,
    // images: productDetail.data?.images,
  };
  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));
    dispatch(getCategoryListAction());
    dispatch(getCompanyListAction());
  }, [id]);

  useEffect(() => {
    if (productDetail.data.id) {
      updateForm.resetFields();
      setImagesField(productDetail.data.images);
    }
  }, [productDetail.data]);

  useEffect(() => {
    return () => dispatch(clearProductDetailAction());
  }, []);

  const setImagesField = async (images) => {
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imageFile = await convertBase64ToImage(
        images[i].url,
        images[i].name,
        images[i].type
      );
      await newImages.push({
        id: images[i].id,
        lastModified: imageFile.lastModified,
        lastModifiedDate: imageFile.lastModifiedDate,
        name: imageFile.name,
        size: imageFile.size,
        type: imageFile.type,
        thumbUrl: images[i].thumbUrl,
        originFileObj: imageFile,
      });
    }
    await updateForm.setFieldValue("images", newImages);
  };

  const handleUpdateProduct = async (values) => {
    const { options, images, ...productValues } = values;
    const newImages = [];
    for (let i = 0; i < images.length; i++) {
      const imgBase64 = await convertImageToBase64(images[i].originFileObj);
      await newImages.push({
        ...(images[i].id && { id: images[i].id }),
        name: images[i].name,
        type: images[i].type,
        thumbUrl: images[i].thumbUrl,
        url: imgBase64,
      });
    }
    dispatch(
      updateProductAction({
        id: id,
        values: {
          ...productValues,
          categoryId: parseInt(values.categoryId),
          companyId: parseInt(values.companyId),
        },
        options: options,
        initialOptionIds: productDetail.data.options.map((item) => item.id),
        images: newImages,
        initialImageIds: productDetail.data.images.map((item) => item.id),
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
    return companyList.data.map((item, index) => {
      return (
        <Select.Option key={item.id} values={item.id}>
          {item.name}
        </Select.Option>
      );
    });
  }, [companyList.data]);

  return (
    <Spin spinning={productDetail.loading}>
      <Row>
        <Col span={16} offset={4}>
          <h1 style={{ textAlign: "center" }}>Cập nhật sản phẩm</h1>
          <Form
            form={updateForm}
            layout="vertical"
            initialValues={initialValues}
            onFinish={(values) => handleUpdateProduct(values)}
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
                  message: "Bạn cần chọn hãng!",
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
                    min: 10000,
                    message: "Giá sản phẩm phải lớn hơn 100.000!",
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
                            parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
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
                  updateForm.setFieldsValue({ content: value });
                }}
              />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={productDetail.loading}
            >
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </Spin>
  );
}

export default UpdateProductPage;
