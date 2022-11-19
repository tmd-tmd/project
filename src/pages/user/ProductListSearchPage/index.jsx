import { useEffect, useState } from "react";
import {
  Row,
  Col,
  Button,
  Input,
  Select,
  Card,
  Checkbox,
  Space,
  Tag,
  Slider,
  Spin,
} from "antd";
import { generatePath, useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  getProductListAction,
  getCategoryListAction,
  getCompanyListAction,
} from "../../../redux/actions";
import { ROUTES } from "../../../constants/routes";
import { PRODUCT_LIST_LIMIT } from "../../../constants/pagination";

import styles from "./styles.module.css";

function ProductListSearchPage() {
  const navigate = useNavigate();
  // const { id } = useParams();

  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    companyId: [],
    keyword: "",
    order: "",
    price: [],
  });

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { companyList } = useSelector((state) => state.company);
  const { categoryList } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getCompanyListAction());
  }, []);
  useEffect(() => {
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          ...productList.params,
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          // categoryId: id,
        },
      })
    );
  }, [productList.params?.keyword]);

  const handleFilter = (key, value) => {
    setFilterParams({
      ...filterParams,
      ...productList.params,
      [key]: value,
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          ...productList.params,
          [key]: value,
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          // categoryId: id,
        },
      })
    );
  };

  const renderFilterCompany = () => {
    return filterParams.companyId.map((filterItem) => {
      const companyData = companyList.data.find(
        (companyItem) => companyItem.id === filterItem
      );
      return (
        <Tag
          key={filterItem}
          closable
          onClose={() => handleClearCompanyFilter(filterItem)}
        >
          {companyData.name}
        </Tag>
      );
    });
  };

  const handleClearCompanyFilter = (clearId) => {
    const newCompanyId = filterParams.companyId.filter(
      (item) => item !== clearId
    );
    setFilterParams({
      ...filterParams,
      ...productList.params,
      companyId: newCompanyId,
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          ...productList.params,
          companyId: newCompanyId,
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          // categoryId: id,
        },
      })
    );
  };

  const handleClearKeywordFilter = () => {
    setFilterParams({
      ...filterParams,
      keyword: "",
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          keyword: "",
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          // categoryId: id,
        },
      })
    );
  };

  // const renderOptions = () => {
  //   const company = productList.data.map((item) => {
  //     return item.companyId;
  //   });
  //   const newCompany = [...new Set(company)];
  //   const renderCopany = companyList.data.filter((item) => {
  //     return newCompany.includes(item.id);
  //   });
  //   return renderCopany;
  // };
  const renderCompanyOptions = () => {
    return companyList.data.map((item, index) => {
      return (
        <Col span={4} key={item.id}>
          <Checkbox value={item.id}>{item.name}</Checkbox>
        </Col>
      );
    });
  };

  const renderProductList = () => {
    return productList.data.map((item) => {
      return (
        <div
          className={styles.ItemProduct}
          onClick={() => {
            navigate(
              generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                id: `${item.slug}.${item.id}`,
              })
            );
          }}
        >
          <div>
            <img src={item.image} alt="" style={{ maxWidth: `100%` }} />
            <div
              style={{
                margin: 8,
              }}
            >
              {item.name}
            </div>
            <div
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {item.price.toLocaleString()} đ
            </div>
          </div>
        </div>
      );
    });
  };
  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          ...productList.params,
          page: productList.meta.page + 1,
          limit: PRODUCT_LIST_LIMIT,
          // categoryId: id,
        },
        more: true,
      })
    );
  };

  const formatter = (value) => value.toLocaleString();
  const marks = {
    0: {
      style: {
        color: "#ffbb96",
      },
      label: <strong>0</strong>,
    },
    25000000: {
      style: {
        color: "yellowgreen",
      },
      label: <strong>25tr</strong>,
    },
    50000000: {
      style: {
        color: "#d4380d",
      },
      label: <strong>50tr</strong>,
    },
  };
  return (
    <>
      <div className="main">
        <div>
          <Row Row gutter={[16, 16]}>
            <Col span={12}>
              <Card size="small" title="Hãng">
                <Checkbox.Group
                  onChange={(value) => handleFilter("companyId", value)}
                  value={filterParams.companyId}
                >
                  <Row>{renderCompanyOptions()}</Row>
                </Checkbox.Group>
              </Card>
            </Col>
            <Col span={7}>
              <Card size="small" title="Giá tiền(VNĐ)">
                <Slider
                  tooltip={{ formatter }}
                  marks={marks}
                  range
                  defaultValue={[0, 50000000]}
                  min={0}
                  max={50000000}
                  step={1000000}
                  onChange={(value) => {
                    handleFilter("price", value);
                    // value={filterParams.price}
                  }}
                />
              </Card>
            </Col>
            <Col span={5}>
              <Card size="small" title="Sắp xếp theo">
                <Select
                  placeholder="Sắp xếp theo"
                  style={{ width: "100%" }}
                  onChange={(value) => {
                    handleFilter("order", value);
                  }}
                >
                  <Select.Option value={""}>Sắp xếp theo</Select.Option>
                  <Select.Option value={"asc"}>Tăng dần</Select.Option>
                  <Select.Option value={"desc"}>Giảm dần</Select.Option>
                </Select>
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Space
              style={{
                marginTop: 4,
                marginLeft: 8,
              }}
            >
              {renderFilterCompany()}
              {productList.params.keyword && (
                <Tag closable onClose={() => handleClearKeywordFilter()}>
                  Keyword: {productList.params.keyword}
                </Tag>
              )}
            </Space>
          </Row>
          {/* <h1
            style={{
              textAlign: "center",
              margin: 24,
            }}
          >
            Danh sách tìm kiếm
          </h1> */}
          <Spin spinning={productList.loading}>
            <div className={styles.Container}>{renderProductList()}</div>
          </Spin>
          {productList.data.length !== productList.meta.total && (
            <Row justify="center">
              <Button
                style={{ marginTop: 16 }}
                onClick={() => handleShowMore()}
                loading={productList.loading}
              >
                Show more
              </Button>
            </Row>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductListSearchPage;
