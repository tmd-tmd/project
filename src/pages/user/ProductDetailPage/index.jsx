import { useEffect, useState, useMemo } from "react";
import { useParams, generatePath, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Radio, Button, Input, notification, Space, Form, Rate } from "antd";

import moment from "moment";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
  CaretUpOutlined,
} from "@ant-design/icons";

import {
  getProductDetailAction,
  getProductListAction,
  addToCartAction,
  favoriteProductAction,
  unFavoriteProductAction,
  getReviewListAction,
  postReviewAction,
} from "../../../redux/actions";
import { ROUTES } from "../../../constants/routes";

import * as S from "./styles";

import styles from "./styles.module.css";

const ProductDetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = parseInt(id.split(".")[1]);
  const dispatch = useDispatch();

  const [selectedOptionId, setSelectedOptionId] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);

  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    companyId: [],
    keyword: "",
    order: "",
    price: [],
  });

  const { productDetail } = useSelector((state) => state.product);
  const { userInfo } = useSelector((state) => state.user);
  const { productList } = useSelector((state) => state.product);
  const { reviewList } = useSelector((state) => state.review);

  const hasOptions = !!productDetail.data.options?.length;
  const selectedOptionData = productDetail.data.options?.find(
    (item) => item.id === selectedOptionId
  );
  const bonusPrice = selectedOptionData ? selectedOptionData.bonusPrice : 0;
  const productPrice = (productDetail.data.price || 0) + bonusPrice;

  const isLike = userInfo.data.id
    ? productDetail.data.favorites?.some(
        (item) => item.userId === userInfo.data.id
      )
    : false;

  useEffect(() => {
    dispatch(
      getProductListAction({
        params: {
          ...filterParams,
        },
      })
    );
  }, []);

  useEffect(() => {
    dispatch(getProductDetailAction({ id: productId }));
    dispatch(getReviewListAction({ productId: productId }));
  }, [productId]);

  useEffect(() => {
    if (hasOptions) {
      setSelectedOptionId(productDetail.data.options[0].id);
    }
  }, [productDetail.data, hasOptions]);

  const renderProductOptions = useMemo(() => {
    return productDetail.data.options?.map((item) => {
      return (
        <Radio key={item.id} value={item.id}>
          {item.name}
        </Radio>
      );
    });
  }, [productDetail.data]);

  const handleAddToCart = () => {
    dispatch(
      addToCartAction({
        ...(selectedOptionData && {
          optionId: selectedOptionData.id,
          optionName: selectedOptionData.name,
        }),
        productId: productId,
        name: productDetail.data.name,
        image: productDetail.data.image,
        quantity: productQuantity,
        price: productPrice,
        slug: productDetail.data.slug,
      })
    );
    openNotificationWithIcon("success");
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Đã thêm vào giỏ hàng",
      duration: 3,
    });
  };

  const handleToggleFavorite = () => {
    if (userInfo.data.id) {
      if (isLike) {
        const favoriteData = productDetail.data.favorites?.find(
          (item) => item.userId === userInfo.data.id
        );
        if (favoriteData) {
          dispatch(
            unFavoriteProductAction({
              id: favoriteData.id,
              productId: productDetail.data.id,
            })
          );
        }
      } else {
        dispatch(
          favoriteProductAction({
            userId: userInfo.data.id,
            productId: productDetail.data.id,
          })
        );
      }
    } else {
      notification.warn({ message: "Bạn cần đăng nhập" });
    }
  };

  const handlePostReview = (values) => {
    dispatch(
      postReviewAction({
        ...values,
        userId: userInfo.data.id,
        productId: productDetail.data.id,
      })
    );
  };

  const renderReviewList = useMemo(() => {
    if (!reviewList.data.length)
      return (
        <>
          <span>Chưa có đánh giá</span>
        </>
      );
    return reviewList.data?.map((item) => {
      return (
        <div>
          <Space>
            <h3>{item.user.fullName}</h3>
            <h4>{moment(item.createdAt).fromNow()}</h4>
          </Space>
          <div>
            <Rate value={item.rate} disabled style={{ fontSize: 12 }} />
          </div>
          <div>{item.comment}</div>
        </div>
      );
    });
  }, [reviewList.data]);

  const renderProductSimilar = () => {
    const productSimilar = productList.data.filter((item) => {
      return (
        item.categoryId === productDetail.data.categoryId &&
        productDetail.data.name !== item.name &&
        productDetail.data.companyId === item.companyId
      );
    });
    const list = productSimilar.map((itemSimilar) => {
      return (
        <div
          className={styles.ItemProduct}
          onClick={() => {
            navigate(
              generatePath(ROUTES.USER.PRODUCT_DETAIL, {
                id: `${itemSimilar.slug}.${itemSimilar.id}`,
              })
            );
          }}
        >
          <div>
            <img src={itemSimilar.image} alt="" style={{ maxWidth: `100%` }} />
            <div
              style={{
                margin: 8,
                fontSize: `1.4rem`,
                fontWeight: 500,
                boxSizing: "border-box",
              }}
            >
              {itemSimilar.name}
            </div>
            <div
              style={{
                color: "red",
                fontSize: `1.75rem`,
                fontWeight: "bold",
              }}
            >
              {itemSimilar.price.toLocaleString()} đ
            </div>
          </div>
        </div>
      );
    });
    return list;
  };

  const handlePlusCart = () => {
    setProductQuantity(productQuantity + 1);
  };
  const handleMinusCart = () => {
    if (productQuantity >= 2) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const renderProductImages = useMemo(() => {
    if (!productDetail.data.images?.length) return null;
    return productDetail.data.images?.map((item) => {
      return (
        <img
          key={item.id}
          src={item.url}
          alt={item.name}
          width="100%"
          height="auto"
        />
      );
    });
  }, [productDetail.data]);

  const [displayInfoProduct, setDisplayInfoProduct] = useState(false);
  // const handledisplayInfoProduct = () => {
  //   setDisplayInfoProduct(!displayInfoProduct);
  // };

  return (
    <div className={styles.Wrapper}>
      <div className={styles.ContainerContent}>
        <div className={styles.LeftContent}>
          <div
            style={{
              width: `60%`,
              margin: `0 auto`,
            }}
          >
            <img
              style={{ width: `100%` }}
              src={productDetail.data.image}
              alt=""
            />
            {/* {renderProductImages} */}
          </div>
          <div className={styles.InfoProduct}>
            <div
              style={{
                width: `60%`,
                marginTop: 32,
              }}
            >
              <h1>{productDetail.data.name}</h1>
              <h2 style={{ color: "red" }}>
                Giá: {productPrice?.toLocaleString()} đ
              </h2>
              {hasOptions && (
                <Radio.Group
                  optionType="button"
                  buttonStyle="solid"
                  onChange={(e) => setSelectedOptionId(e.target.value)}
                  value={selectedOptionId}
                >
                  {renderProductOptions}
                </Radio.Group>
              )}
              <div style={{ marginTop: 16 }}>
                <div style={{ width: 90, display: "flex" }}>
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      handleMinusCart();
                    }}
                  >
                    -
                  </div>
                  <Input
                    readOnly
                    value={productQuantity}
                    style={{
                      textAlign: "center",
                      marginRight: 8,
                      marginLeft: 8,
                    }}
                    onChange={(value) => setProductQuantity(value)}
                  />
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                    }}
                    onClick={() => {
                      handlePlusCart();
                    }}
                  >
                    +
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 16 }}>
                <Space size={16}>
                  <Button
                    size="large"
                    type="primary"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart()}
                  >
                    Thêm vào giỏ
                  </Button>

                  <Button
                    size="large"
                    danger={isLike}
                    icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                    onClick={() => handleToggleFavorite()}
                  >
                    {productDetail.data?.favorites?.length || 0} liked
                  </Button>
                </Space>
              </div>
            </div>
          </div>
          <h2
            style={{
              margin: `32px  0`,
            }}
          >
            Thông tin sản phẩm
          </h2>
          <div
            className={`${styles.Content} ${
              displayInfoProduct && styles.SetContent
            }`}
          >
            <S.ProductContent
              dangerouslySetInnerHTML={{
                __html: productDetail.data.content,
              }}
            />
            <div
              className={`${styles.Contenthidden} ${
                displayInfoProduct && styles.SetContenthidden
              }`}
            >
              <h4
                className={styles.DisplayContent}
                onClick={() => {
                  setDisplayInfoProduct(!displayInfoProduct);
                }}
              >
                {displayInfoProduct ? (
                  <span>Ẩn bớt {<CaretUpOutlined />}</span>
                ) : (
                  <span>
                    Xem thêm <FontAwesomeIcon icon={faCaretRight} />
                  </span>
                )}
              </h4>
            </div>
          </div>
          <div
            style={{
              border: `1px solid #e0e0e0`,
              marginTop: 48,
              padding: 16,
              borderRadius: 8,
            }}
          >
            <h2>Đánh giá {productDetail.data.name}</h2>
            {userInfo.data.id && (
              <S.CustomForm
                layout="vertical"
                onFinish={(values) => handlePostReview(values)}
              >
                <Form.Item label="Đánh giá" name="rate">
                  <Rate />
                </Form.Item>
                <Form.Item label="Bình luận" name="comment">
                  <Input.TextArea autoSize={{ maxRows: 6, minRows: 2 }} />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Thêm bình luận
                </Button>
              </S.CustomForm>
            )}
            {renderReviewList}
          </div>
        </div>
        <div className={styles.RightContent}>
          <div
            style={{
              paddingLeft: 24,
            }}
          >
            <h1>{productDetail.data.name}</h1>
            <h2 style={{ color: "red" }}>
              Giá: {productPrice?.toLocaleString()} đ
            </h2>
            {hasOptions && (
              <Radio.Group
                optionType="button"
                buttonStyle="solid"
                onChange={(e) => setSelectedOptionId(e.target.value)}
                value={selectedOptionId}
              >
                {renderProductOptions}
              </Radio.Group>
            )}
            <div style={{ marginTop: 16 }}>
              <div style={{ width: 90, display: "flex" }}>
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    handleMinusCart();
                  }}
                >
                  -
                </div>
                <Input
                  readOnly
                  value={productQuantity}
                  style={{
                    textAlign: "center",
                    marginRight: 8,
                    marginLeft: 8,
                  }}
                  onChange={(value) => setProductQuantity(value)}
                />
                <div
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                  }}
                  onClick={() => {
                    handlePlusCart();
                  }}
                >
                  +
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16 }}>
              <Space size={16}>
                <Button
                  size="large"
                  type="primary"
                  icon={<ShoppingCartOutlined />}
                  onClick={() => handleAddToCart()}
                >
                  Thêm vào giỏ
                </Button>

                <Button
                  size="large"
                  danger={isLike}
                  icon={isLike ? <HeartFilled /> : <HeartOutlined />}
                  onClick={() => handleToggleFavorite()}
                >
                  {productDetail.data?.favorites?.length || 0} liked
                </Button>
              </Space>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2
          style={{
            margin: `32px 0 16px`,
          }}
        >
          Xem thêm{" "}
          <span
            style={{
              textTransform: "lowercase",
            }}
          >
            {productDetail.data.category?.name}
          </span>{" "}
          khác
        </h2>
        <div className={styles.ContainerProduct}>{renderProductSimilar()}</div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
