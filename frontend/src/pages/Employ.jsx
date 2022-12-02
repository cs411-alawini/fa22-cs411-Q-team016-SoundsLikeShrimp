import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Form, Input, Button, InputNumber, message } from "antd";


const Employ = () => {
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


	const addEmployee = (values) => {
		axios.post(PROJECT_PATH + "/admin/hire", {
			title: values.title,
			salary: values.salary,
		}).then(res => {
			message.success("Welcome to our company")
			navigate("/" + email)
		}).catch(err => {
			message.error("Cannot hire employ")
		})
	}

	if (loading) {
		return <h1>Still Loading</h1>
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
          onFinish={addEmployee}
        >
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
					<Form.Item label="Salary" name="salary">
						<InputNumber />
					</Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </Form>
			</>
		)
	}
}

export default Employ;