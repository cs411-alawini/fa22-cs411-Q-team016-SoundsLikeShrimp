import React, { useEffect, useState } from "react";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  List,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";
const { RangePicker } = DatePicker;

function padLeadingZeros(num, size) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

const Service = () => {
  const PROJECT_PATH = "http://localhost:5024";
  const navigate = useNavigate();
  


  const [toBook, setRoomNum] = useState(-1);

  const book = (values) => {
    console.log(values);
    axios.post(PROJECT_PATH + "/booking", {
      room_number: toBook,
      ...stayTime,
      email: values.email,
      firstName: values.firstName,
      lastName: values.firstName,
      phone: values.phone,
    }).then(res => {
      message.success("Booking success")
      navigate("/" + values.email);
      
    }).catch(err => {
      message.error("Room not availible")
    })

  };

  return (
    <>
			<Navbar />
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        onFinish={book}
      >
        <Form.Item label="Stay">
          <RangePicker
            defaultValue={[
              moment(defaultDate, dateFormat),
              moment(defaultDate, dateFormat),
            ]}
            onChange={showRoom}
            format={dateFormat}
          />
        </Form.Item>

        <Form.Item label="Rooms">
          <List
            bordered
            dataSource={rooms}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  setRoomNum(item.room_number);
                }}
              >
                {item.room_number}
              </List.Item>
            )}
          />
        </Form.Item>

        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="First Name" name="firstName">
          <Input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName">
          <Input />
        </Form.Item>

        <Form.Item label="Phone number" name="phone">
          <InputNumber />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Book!
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default Service;
