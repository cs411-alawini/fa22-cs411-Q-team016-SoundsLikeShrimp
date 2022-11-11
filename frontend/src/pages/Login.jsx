import { Button, Form, Input, message } from "antd";
import React from "react";
import "antd/dist/antd.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const PROJECT_PATH = "http://localhost:5024";

  const login = (values) => {
    axios.post(PROJECT_PATH + "/login", {
      email: values.email,
      password: values.password,
    }).then(res => {
      if (res.status !== 200) {
        message.error("Login failed");
      } else {
        res.json().then(data => {
          navigate("/" + data.email);
        })
      }
    });

    // fetch(PROJECT_PATH + "/login", {
    //   method: "POST",
    //   body: JSON.stringify({
    //     'email': values.email,
    //     'password': values.password,
    //   }),
    // }).then((res) => {
    //   if (res.status !== 200) {
    //     message.error("Login failed");
    //   } else {
    //     res.json().then((data) => {
    //       // Get email from data and navigate to /<email>
    //       navigate("/" + data.email);
    //     });
    //   }
    // });
  };

  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={login}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button style={{ width: "50%" }} type="primary" htmlType="submit">
            Submit
          </Button>
          <Button
            style={{ width: "50%" }}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
