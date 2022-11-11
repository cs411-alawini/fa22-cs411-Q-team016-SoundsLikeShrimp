import { List, Button } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

const Reservation = () => {
  const PROJECT_PATH = "http://localhost:5024";
  const { email } = useParams();

  const [myRoom, setRoom] = useState([]);
  const getReservation = () => {
    console.log("Start get reservation");
    axios.get(PROJECT_PATH + "/" + email + "/reservations").then(res => {
      console.log(res);
      res.data.map((oldReservation) => {
        setRoom((prev) => {
          return [
            ...prev,
            {
              reservation_id: oldReservation.reservation_id,
              room_number: oldReservation.room_number,
              email: oldReservation.email,
              duration: oldReservation.duration,
              checkin_year: oldReservation.checkin_year,
              checkin_month: oldReservation.checkin_month,
              checkin_date: oldReservation.checkin_date,
              checkout_year: oldReservation.checkout_year,
              checkout_month: oldReservation.checkout_month,
              checkout_date: oldReservation.checkout_date,
              checkin: oldReservation.checkin,
              checkout: oldReservation.checkout,
            },
          ];
        });
        return oldReservation;
      });
    }).catch(err => {
      console.log(err);
    });
  };

  useEffect(() => {
    getReservation();
  }, []);

  const delRoom = (resId, room_number) => {
    axios.delete(PROJECT_PATH + "/" + email + "/reservations/" + resId + "/" + room_number).then(res => {
      getReservation();
    }).catch(err => {
      console.log(err);
    });
  };

  return (
    <>
      <Navbar email={email} />

      <List
        bordered
        dataSource={myRoom}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button>Modify</Button>,
              <Button
                onClick={() => {
                  setRoom([]);
                  delRoom(item.reservation_id, item.room_number);
                }}
              >
                Cancel
              </Button>,
            ]}
          >
            {"Reservation id: " + item.reservation_id + " Room Number: "+ item.room_number}
          </List.Item>
        )}
      />
    </>
  );
};

export default Reservation;
