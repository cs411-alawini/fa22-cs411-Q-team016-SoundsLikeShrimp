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

const Booking = () => {
  const PROJECT_PATH = "http://localhost:5024";
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
    checkin: defaultDate,
    checkout: defaultDate,
  });

  // Fetch with current date, render the result
  const [rooms, setRoomSelection] = useState([]);
  useEffect(() => {
    setRoomSelection((prev) => []);
  }, [stayTime]);

  async function showRoom(values) {
    let start = values[0].format().substring(0, 10);
    let end = values[1].format().substring(0, 10);

    let checkin_year = parseInt(start.substring(0, 4));
    let checkin_month = parseInt(start.substring(5, 7));
    let checkin_date = parseInt(start.substring(8, 10));
    let checkout_year = parseInt(end.substring(0, 4));
    let checkout_month = parseInt(end.substring(5, 7));
    let checkout_date = parseInt(end.substring(8, 10));

    try {
      await setStayTime((prev) => {
        prev.checkin_year = checkin_year;
        prev.checkin_month = checkin_month;
        prev.checkin_date = checkin_date;
        prev.checkout_year = checkout_year;
        prev.checkout_month = checkout_month;
        prev.checkout_date = checkout_date;
        prev.checkin = start;
        prev.checkout = end;
        return prev;
      });

      await setRoomSelection(prev => []);

      // Fetch rooms with selected date
      axios.post(PROJECT_PATH + "/booking/getroom", stayTime).then(res => {
        res.data.map(room => {
          setRoomSelection(prev => {
            return [...prev, {
              room_number: room.room_number,
              accommondation: room.accommondation,
              price: room.price,
              feature: room.feature,
            }];
          });
          return room;
        });
      });
    } catch(e) {
      console.log(e);
    }
  };

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
                {"Room Number: " + item.room_number + ", Price: " + item.price}
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
