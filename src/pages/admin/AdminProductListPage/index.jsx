import { useState, useEffect } from "react";
import { Button, Table, Space, Pagination, Avatar } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, generatePath } from "react-router-dom";
import * as S from "./styles";
import { ADMIN_TABLE_LIMIT } from "../../../constants/pagination";
import {
  deleteProductAction,
  getProductListAction,
} from "../../../redux/actions";

import { ROUTES } from "../../../constants/routes";

const AdminProductListPage = () => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getProductListAction({
        params: {
          page: 1,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
    // dispatch(getCategoryListAction());
  }, []);

  const handleChangePage = (page) => {
    setPage(page);
    dispatch(
      getProductListAction({
        params: {
          page: page,
          limit: ADMIN_TABLE_LIMIT,
        },
      })
    );
  };

  const handleDeleteTask = (id) => {
    dispatch(
      deleteProductAction({
        id: id,
        callback: dispatch(
          getProductListAction({
            params: {
              page: page,
              limit: ADMIN_TABLE_LIMIT,
            },
          })
        ),
      })
    );
  };

  const tableColumn = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => {
        return (
          <Space>
            <Avatar size="large" shape="square" src={item.category?.image} />
            <h4>{item.name}</h4>
          </Space>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name,
    },
    {
      title: "Hãng",
      dataIndex: "company",
      key: "company",
      render: (company) => company.name,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, item) => {
        return (
          <Space>
            <Button
              type="primary"
              ghost
              onClick={() =>
                navigate(
                  generatePath(ROUTES.ADMIN.UPDATE_PRODUCT, { id: item.id })
                )
              }
            >
              Update
            </Button>
            <Button danger onClick={() => handleDeleteTask(item.id)}>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  const tableData = productList.data.map((item) => ({
    ...item,
    key: item.id,
  }));
  return (
    <>
      <S.Wrapper>
        <S.TopWrapper>
          <h1>Product List</h1>
          <h4>Total: {productList.meta.total}</h4>
          <Button
            type="primary"
            onClick={() => navigate(ROUTES.ADMIN.CREATE_PRODUCT)}
          >
            Create Product
          </Button>
        </S.TopWrapper>
        <Table
          columns={tableColumn}
          dataSource={tableData}
          pagination={false}
        />
        <Pagination
          // defaultCurrent={1}
          current={productList.meta.page}
          pageSize={ADMIN_TABLE_LIMIT}
          total={productList.meta.total}
          onChange={(page) => handleChangePage(page)}
          style={{ margin: "16px auto 0" }}
        />
      </S.Wrapper>
    </>
  );
};

export default AdminProductListPage;
