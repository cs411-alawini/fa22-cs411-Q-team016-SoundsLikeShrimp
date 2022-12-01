import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Form, Button, InputNumber, message } from "antd";

const Layoff = () => {
  const navigate = useNavigate();
  const PROJECT_PATH = "http://localhost:5024";
  const { email } = useParams();
  const [isAdmin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(email !== undefined ? true : false);

  useEffect(() => {
    axios
      .get(PROJECT_PATH + "/" + email)
      .then((res) => {
        if (res.data[0].membership === 5) {
          setAdmin((prev) => true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Not login");
      });
  }, []);

  const layoff = (values) => {
    axios
      .delete(PROJECT_PATH + "/admin/layoff/" + values.emp_id)
      .then((res) => {
        message.success("We appreciate your contribution.");
        navigate("/" + email);
      })
      .catch((err) => {
        message.error("This employee is hard-working");
      });
  };

  if (loading) {
    return <h1>Still Loading</h1>;
  } else {
    return (
      <>
        <Navbar email={email} isAdmin={isAdmin} />

        <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          onFinish={layoff}
        >
          <Form.Item label="Employee ID" name="emp_id">
            <InputNumber />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Goodbye
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
};

export default Layoff;
