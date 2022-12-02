import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  DatePicker,
  InputNumber,
	Select,
	message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";


const Service = () => {
  const PROJECT_PATH = "http://localhost:5024";
  const navigate = useNavigate();
	const dateFormat = "YYYY/MM/DD";
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


	// Make request
	const request = (values) => {

		axios.post(PROJECT_PATH + "/" + email + "/service", {
			room_number: values.room_number,
			service_id: values.service_id,
			date: values.date.format().substring(0, 10),
		}).then(res => {
      message.success("Request success")
      navigate("/" + email);
    }).catch(err => {
      message.error("Invalid request, have you reserved a room?")
    })
	}

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
        onFinish={request}
      >
       <Form.Item label="room_number" name="room_number">
          <InputNumber />
        </Form.Item>
				<Form.Item label="date" name="date">
          <DatePicker format={dateFormat}/>
        </Form.Item>
				<Form.Item label="service_id" name="service_id">

					<Select>
						<Select.Option value="1">Dry cleaning</Select.Option>
						<Select.Option value="2">Ironing service</Select.Option>
						<Select.Option value="3">Massages</Select.Option>
						<Select.Option value="4">Laundry and valet service</Select.Option>
						<Select.Option value="5">Room service (24-hour)</Select.Option>
						<Select.Option value="6">Turndown service</Select.Option>
						<Select.Option value="7">Wine</Select.Option>
						<Select.Option value="8">Shoeshine service</Select.Option>
						<Select.Option value="9">Doctor on call</Select.Option>
						<Select.Option value="10">Courier services</Select.Option>
					</Select>
        </Form.Item>
				<Form.Item>
          <Button type="primary" htmlType="submit">
            Get Service!
          </Button>
        </Form.Item>
			 
      </Form>
      </>
    );
  }
};

export default Service;
