import React, { useEffect, useState } from "react";
import { Form, Input, Button, Space, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const PROJECT_PATH = "http://localhost:5024";
  const { email } = useParams();
  const [isAdmin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(email !== undefined ? true : false);

  const [user, setUser] = useState({
    name: "",
    phone: "",
    membership: 1,
  });

  useEffect(() => {
    axios
      .get(PROJECT_PATH + "/" + email)
      .then((res) => {
        if (res.data[0].membership === 5) {
          setAdmin(true);
        }
        setLoading(false);
        console.log(res.data[0]);

        setUser((prev) => {
          prev.name = res.data[0].name;
          prev.phone = res.data[0].phone;
          prev.membership = res.data[0].membership;
          return prev;
        });
      })
      .catch((err) => {
        console.log("Not login");
      });
  }, []);

  const [componentDisabled, setComponentDisabled] = useState(true);
  const edit = () => {
    setComponentDisabled((prev) => {
      return !prev;
    });
  };

  const modify = (values) => {
    setUser((prev) => {
      if (values.name !== undefined) {
        prev.name = values.name;
      }
      if (values.phone !== undefined) {
        prev.phone = values.phone;
      }
      return prev;
    });

    axios.patch(PROJECT_PATH + "/" + email, {
      name: values.name,
      phone: values.phone,
    });

    navigate("/" + email + "/info");
  };

  if (loading) {
    return <h1>Still Loading</h1>;
  } else {
    return (
      <>
        <Navbar email={email} isAdmin={isAdmin} />
        <Button onClick={edit}>Edit</Button>

        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          disabled={componentDisabled}
          onFinish={modify}
        >
          <Form.Item label="User Name" name="name">
            <Input defaultValue={user.name} />
          </Form.Item>
          <Form.Item label="Phone Number" name="phone">
            <Input defaultValue={user.phone} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>

        <Space
          direction="vertical"
          size="middle"
          style={{
            display: "flex",
          }}
        >
          <Card title="Profile" size="small">
            <p>Email: {email}</p>
            <p>Name: {user.name}</p>
            <p>Phone: {user.phone}</p>
            <p>Membership: {user.membership}</p>
          </Card>
        </Space>
      </>
    );
  }
};
export default Profile;
