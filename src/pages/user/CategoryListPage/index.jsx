import { useEffect, useState, useMemo } from "react";
import { Button, Select, Checkbox, Space, Tag, Slider, Spin } from "antd";
import { generatePath, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faFilter } from "@fortawesome/free-solid-svg-icons";

import {
  getProductListAction,
  getCategoryListAction,
  getCompanyListAction,
  getDemandListAction,
} from "../../../redux/actions";
import { ROUTES } from "../../../constants/routes";
import { PRODUCT_LIST_LIMIT } from "../../../constants/pagination";

import styles from "./styles.module.css";

function UserCategoryListPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    companyId: [],
    demandId: [],
    keyword: "",
    order: "",
    price: [],
  });

  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  const { companyList } = useSelector((state) => state.company);
  const { demandList } = useSelector((state) => state.demand);

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getCompanyListAction());
    dispatch(getDemandListAction());
  }, []);

  useEffect(() => {
    setFilterParams({
      ...filterParams,
      categoryId: id,
      page: 1,
      limit: PRODUCT_LIST_LIMIT,
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          // ...productList.params,
          page: 1,
          limit: PRODUCT_LIST_LIMIT,
          categoryId: id,
        },
      })
    );
  }, [id]);

  const handleFilter = (key, value) => {
    setFilterParams({
      ...filterParams,
      // ...productList.params,
      [key]: value,
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          // ...productList.params,
          [key]: value,
          // page: 1,
          // limit: PRODUCT_LIST_LIMIT,
          // categoryId: id,
        },
      })
    );
  };

  const renderFilterCompany = () => {
    return filterParams.companyId.map((filterItemId) => {
      const companyData = companyList.data.find(
        (companyItem) => companyItem.id === filterItemId
      );
      return (
        <Tag
          key={filterItemId}
          closable
          onClose={() => handleClearCompanyFilter(filterItemId)}
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
      // ...productList.params,
      companyId: newCompanyId,
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          // ...productList.params,
          companyId: newCompanyId,
          // page: 1,
          // limit: PRODUCT_LIST_LIMIT,
          // categoryId: id,
        },
      })
    );
  };

  const renderFilterDemand = () => {
    return filterParams.demandId.map((filterItemId) => {
      const demandData = demandList.data.find(
        (demandItem) => demandItem.id === filterItemId
      );
      return (
        <Tag
          key={filterItemId}
          closable
          onClose={() => handleClearDemandFilter(filterItemId)}
        >
          {demandData.name}
        </Tag>
      );
    });
  };

  const handleClearDemandFilter = (clearId) => {
    const newDemandId = filterParams.demandId.filter(
      (item) => item !== clearId
    );
    setFilterParams({
      ...filterParams,
      // ...productList.params,
      demandId: newDemandId,
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          // ...productList.params,
          demandId: newDemandId,
          // page: 1,
          // limit: PRODUCT_LIST_LIMIT,
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
          // page: 1,
          // limit: PRODUCT_LIST_LIMIT,
          // categoryId: id,
        },
      })
    );
  };

  const handleClearPriceFilter = () => {
    setFilterParams({
      ...filterParams,
      price: [],
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          price: [],
          // page: 1,
          // limit: PRODUCT_LIST_LIMIT,
          // categoryId: id,
        },
      })
    );
  };

  const handleClearAllFilter = () => {
    setFilterParams({
      ...filterParams,
      companyId: [],
      demandId: [],
      keyword: "",
      price: [],
    });
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
          companyId: [],
          demandId: [],
          keyword: "",
          price: [],
        },
      })
    );
  };

  const renderCompanyOptions = useMemo(() => {
    return companyList.data.map((item, index) => {
      return (
        <Checkbox className={styles.DropdownCompanyItem} value={item.id}>
          {item.name}
        </Checkbox>
      );
    });
  }, [companyList.data]);

  const renderDemandOptions = useMemo(() => {
    return demandList.data.map((item, index) => {
      return (
        <Checkbox className={styles.DropdownCompanyItem} value={item.id}>
          {item.name}
        </Checkbox>
      );
    });
  }, [demandList.data]);

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
                fontSize: `1.4rem`,
                fontWeight: 500,
                boxSizing: "border-box",
              }}
            >
              {item.name}
            </div>
            <span
              style={{
                boxSizing: "border-box",
                backgroundColor: "#eaeaea",
                border: `1px solid #eaeaea`,
                borderRadius: 2,
                fontSize: 10,
                padding: `4px 5px`,
              }}
            >
              Còn {item.quantity} sản phẩm
            </span>
            <div
              style={{
                color: "red",
                fontSize: `1.75rem`,
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
          page: productList.meta.page + 1,
          // limit: PRODUCT_LIST_LIMIT,
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
  const [company, setCompany] = useState(false);
  const [demand, setDemand] = useState(false);
  const [price, setPrice] = useState(false);

  const handleCompany = () => {
    setCompany(!company);
  };
  const handleDemand = () => {
    setDemand(!demand);
  };
  const handlePrice = () => {
    setPrice(!price);
  };

  return (
    <>
      <div className="main">
        <div
          style={{
            display: "flex",
          }}
        >
          <div className={styles.FilterContainer}>
            {/* <S.CategoryContainer>{renderCategoryOptions()}</S.CategoryContainer> */}
            <div>
              <div
                style={{
                  fontSize: 24,
                  borderBottom: `3px solid #378fe1`,
                  boxSizing: "border-box",
                  color: "#378fe1",
                }}
              >
                <FontAwesomeIcon icon={faFilter} />
                <span
                  style={{
                    marginLeft: 16,
                  }}
                >
                  Lọc theo
                </span>
              </div>
              <Space
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  padding: 8,
                }}
              >
                {renderFilterCompany()}
                {renderFilterDemand()}
                {productList.params?.keyword && (
                  <Tag closable onClose={() => handleClearKeywordFilter()}>
                    Keyword: {productList.params.keyword}
                  </Tag>
                )}
                {filterParams.price.length > 0 && (
                  <Tag closable onClose={() => handleClearPriceFilter()}>
                    Giá: {filterParams.price[0].toLocaleString()} -{" "}
                    {filterParams.price[1].toLocaleString()}
                  </Tag>
                )}
                {(filterParams.companyId.length > 0 ||
                  filterParams.demandId.length > 0 ||
                  filterParams.price.length > 0 ||
                  productList.params?.keyword) && (
                  <Tag
                    closable
                    style={{ backgroundColor: "#69c0ff" }}
                    onClose={() => handleClearAllFilter()}
                  >
                    Xóa tất cả
                  </Tag>
                )}
              </Space>
            </div>
            <div
              className={`${styles.FilterItem} ${
                company && styles.ClickChangeFilterItem
              }`}
              onClick={handleCompany}
            >
              Thương hiệu
            </div>
            <div
              className={`${styles.DropdownContainer} ${
                company && styles.Show
              }`}
            >
              <Checkbox.Group
                onChange={(value) => handleFilter("companyId", value)}
                value={filterParams.companyId}
              >
                {renderCompanyOptions}
              </Checkbox.Group>
            </div>
            <div
              className={`${styles.FilterItem} ${
                demand && styles.ClickChangeFilterItem
              }`}
              onClick={handleDemand}
            >
              Nhu cầu
            </div>
            <div
              className={`${styles.DropdownContainer} ${demand && styles.Show}`}
            >
              <Checkbox.Group
                onChange={(value) => handleFilter("demandId", value)}
                value={filterParams.demandId}
              >
                {renderDemandOptions}
              </Checkbox.Group>
            </div>
            <div
              className={`${styles.FilterItem} ${
                price && styles.ClickChangeFilterItem
              }`}
              onClick={handlePrice}
            >
              Khoảng giá
            </div>
            <div
              className={`${styles.DropdownContainer} ${price && styles.Show}`}
            >
              <Slider
                tooltip={{ formatter }}
                marks={marks}
                range
                // defaultValue={[0, 50000000]}
                min={0}
                max={50000000}
                step={1000000}
                onChange={(value) => {
                  handleFilter("price", value);
                }}
                value={filterParams.price}
              />
            </div>
          </div>
          <div className={styles.WrapperProduct}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  color: "#426e97",
                  fontWeight: 550,
                  marginLeft: 2,
                }}
              >
                Có {productList.meta.total} sản phẩm
              </span>
              <div>
                <Select
                  placeholder="Sắp xếp theo"
                  style={{
                    width: 120,
                    marginRight: 2,
                  }}
                  onChange={(value) => {
                    handleFilter("order", value);
                  }}
                >
                  <Select.Option value={""}>Sắp xếp theo</Select.Option>
                  <Select.Option value={"asc"}>Tăng dần</Select.Option>
                  <Select.Option value={"desc"}>Giảm dần</Select.Option>
                </Select>
              </div>
            </div>

            <Spin spinning={productList.loading}>
              <div className={styles.ContainerProduct}>
                {renderProductList()}
              </div>
            </Spin>
            {productList.data.length !== productList.meta.total && (
              <div style={{ textAlign: "center" }}>
                <Button
                  style={{ marginTop: 16 }}
                  onClick={() => handleShowMore()}
                  loading={productList.loading}
                >
                  Show more
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCategoryListPage;
