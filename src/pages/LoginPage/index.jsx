import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input, Button, Checkbox } from "antd";
import { useNavigate, Link } from "react-router-dom";

import { ROUTES } from "../../constants/routes";
import { loginAction } from "../../redux/actions";

const LoginPage = () => {
  const [loginForm] = Form.useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state.user);

  useEffect(() => {
    if (loginData.error) {
      loginForm.setFields([
        {
          name: "email",
          errors: [" "],
        },
        {
          name: "password",
          errors: [loginData.error],
        },
      ]);
    }
  }, [loginData.error]);

  const handleLogin = (values) => {
    dispatch(
      loginAction({
        data: {
          email: values.email,
          password: values.password,
        },
        callback: {
          goToDashboard: () => navigate(ROUTES.ADMIN.DASHBOARD),
          goToHome: () => navigate(ROUTES.HOME),
        },
      })
    );
  };

  return (
    <>
      <div>
        <h1
          style={{
            marginTop: 24,
            textAlign: "center",
          }}
        >
          Đăng Nhập
        </h1>
        <Form
          form={loginForm}
          name="loginForm"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={(values) => handleLogin(values)}
          autoComplete="off"
          style={{ padding: "0 2px" }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Nhớ mật khẩu</Checkbox>
          </Form.Item>
          <div style={{ marginBottom: 16 }}>
            <span>Bạn chưa có tài khoản? </span>
            <Link to={ROUTES.REGISTER}>
              <span style={{ fontWeight: 600 }}>Đăng ký tại đây</span>
            </Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loginData.loading}
          >
            Đăng nhập
          </Button>
        </Form>
      </div>
    </>
  );
};

export default LoginPage;
