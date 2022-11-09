import React, { useEffect , useState } from "react";
import { Form, Input, Button } from "antd";
import { useParams } from "react-router-dom";


const Profile = () => {
	const PROJECT_PATH = "http://localhost:3000";
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
		setUser(prev => {
			prev.email = values.email;
			prev.name = values.name;
			prev.phone = values.phone;
		});

		fetch(PROJECT_PATH + '/' + email, {
			method: "PATCH",
			body: JSON.stringify({
				email: values.email,
				name: values.name,
				phone: values.phone,
			}),
		});
	}

	useEffect(() => {
		fetch(PROJECT_PATH + "/" + email, {
			method: "GET",
		}).then(res => {
			res.json().then(data => {
				setUser(prev => {
					prev.email = data.email;
					prev.name = data.name;
					prev.phone = data.phone;
					return prev;
				});
			});
		});
	});


  return (
    <>
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
        <Form.Item label="User Email" name="email">
          <Input value={user.email} />
        </Form.Item>
        <Form.Item label="User Name" name="name">
          <Input value={user.name} />
        </Form.Item>
        <Form.Item label="Phone Number" name="phone">
          <Input value={user.phone} />
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
