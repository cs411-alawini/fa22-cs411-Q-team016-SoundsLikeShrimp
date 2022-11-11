import React, { useEffect , useState } from "react";
import { Form, Input, Button } from "antd";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";


const Profile = () => {
	const PROJECT_PATH = "http://localhost:5024";
	const { email } = useParams();
  const [componentDisabled, setComponentDisabled] = useState(true);
  const edit = () => {
    setComponentDisabled((prev) => {
      return !prev;
    });
  };

  const [user, setUser] = useState({
		email: "",
    name: "",
    phone: "",
  });

  const modify = (values) => {
		console.log(values);

		setUser(prev => {
      prev.email = email;
			prev.name = values.name;
			prev.phone = values.phone;
			return prev;
		});

    axios.patch(PROJECT_PATH + "/" + email, {
      name: values.name,
      phone:values.phone,
    });

		// fetch(PROJECT_PATH + '/' + email, {
		// 	method: "PATCH",
		// 	body: JSON.stringify({
		// 		name: values.name,
		// 		phone: values.phone,
		// 	}),
		// });
	}

	useEffect(() => {
    axios.get(PROJECT_PATH + "/" + email).then(res => {
      setUser(prev => {
        prev.email = res.data.email;
        prev.name = res.data.name;
        prev.phone = res.data.phone;
        return prev;
      });
    });

	}, []);

  return (
    <>
			<Navbar email={email} />
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
        <Form.Item disabled label="User Email" name="email">
          <Input defaultValue={user.email} disabled={true} />
        </Form.Item>
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
    </>
  );
};
export default Profile;
