import React, { useState } from "react";
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
const { RangePicker } = DatePicker;

function padLeadingZeros(num, size) {
  let s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

const Booking = () => {
  const PROJECT_PATH = "http://localhost:3000";
  const navigate = useNavigate();
  const dateFormat = "YYYY/MM/DD";
  let currentDate = new Date();
  let d = currentDate.getDate(),
    m = currentDate.getMonth() + 1,
    y = currentDate.getFullYear();
  let defaultDate =
    y.toString() + "/" + padLeadingZeros(m, 2) + "/" + padLeadingZeros(d, 2);

  const [stayTime, setStayTime] = useState({
    checkin_date: d,
    checkin_month: m,
    checkin_year: y,
    checkout_date: d,
    checkout_month: m,
    checkout_year: y,
  });

  // Fetch with current date, render the result
  const [rooms, setRoomSelection] = useState([]);
  const showRoom = (values) => {
    let start = values[0].format().substring(0, 10);
    let end = values[1].format().substring(0, 10);

    let checkin_year = parseInt(start.substring(0, 4));
    let checkin_month = parseInt(start.substring(5, 7));
    let checkin_date = parseInt(start.substring(8, 10));
    let checkout_year = parseInt(end.substring(0, 4));
    let checkout_month = parseInt(end.substring(5, 7));
    let checkout_date = parseInt(end.substring(8, 10));

    setStayTime((prev) => {
      prev.checkin_year = checkin_year;
      prev.checkin_month = checkin_month;
      prev.checkin_date = checkin_date;
      prev.checkout_year = checkout_year;
      prev.checkout_month = checkout_month;
      prev.checkout_date = checkout_date;
      return prev;
    });

    // Fetch rooms with selected date
    setRoomSelection((prev) => {
      return [];
    });
    console.log(JSON.stringify(stayTime));
    fetch(PROJECT_PATH + "/booking/getroom", {
      method: "POST",
      body: JSON.stringify(stayTime),
    }).then((res) => {
      res.data.map((room) => {
        setRoomSelection((prev) => {
          return [
            ...prev,
            {
              room_number: room.room_number,
              accommondation: room.accommondation,
              price: room.price,
              feature: room.feature,
            },
          ];
        });
        return room;
      });
    });
  };

  const data = [
    { room_number: "item" },
    { room_number: 2 },
    { room_number: 3 },
    { room_number: 4 },
    { room_number: 5 },
  ];

  const [toBook, setRoomNum] = useState(-1);

  const book = (values) => {
		console.log(JSON.stringify({
			room_number: toBook,
        ...stayTime,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
		}));
    fetch(PROJECT_PATH + "/booking", {
      method: "POST",
      body: JSON.stringify({
        room_number: toBook,
        ...stayTime,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      }),
    }).then((res) => {
      if (res.status !== 200) {
        message.error("Room not availible");
      } else {
        navigate("/" + values.email);
      }
    });
  };

  return (
    <>
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

export default Booking;
