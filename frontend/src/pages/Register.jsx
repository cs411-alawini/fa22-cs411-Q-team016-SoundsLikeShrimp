import { Button, Form, Input, message } from "antd";
import React from "react";
import "antd/dist/antd.min.css";
import { useNavigate } from "react-router-dom";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const Register = () => {
  const PROJECT_PATH = "http://localhost:3000";
  const navigate = useNavigate();

  const register = (values) => {
    fetch(PROJECT_PATH + "/register", {
      method: "POST",
      body: JSON.stringify({
        'email': values.email,
        'password': values.password,
        'name': values.name,
        'phone': values.phone,
        'membership': 1,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        message.error("Cannot register this email");
      } else {
        res.json().then((data) => {
          // Get email from data and navigate to /<email>
          navigate("/" + data.email);
        });
      }
    });
  };
  return (
    <Form
      {...layout}
      name="nest-messages"
      onFinish={register}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Please input your email",
          },
          {
            type: "email",
            message: "The input is not a valid email",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: "Please input your password",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="name" label="Name">
        <Input />
      </Form.Item>

      <Form.Item
        name="phone"
        label="Phone"
        rules={[
          {
            type: "Number",
            message: "Ex: 123456789",
          },
          {
            len: 10,
            message: "Your phone number should be 10 digits",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          ...layout.wrapperCol,
          offset: 8,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Register;
