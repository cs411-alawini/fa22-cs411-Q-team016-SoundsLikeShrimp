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
    axios.get(PROJECT_PATH + "/" + email + "/reservations").then((res) => {
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
            },
          ];
        });
        return oldReservation;
      });
    });

    // fetch(PROJECT_PATH + "/" + email + "/reservations", {
    //   method: "GET",
    // }).then((res) => {
    //   res.data.map((oldReservation) => {
    //     setRoom((prev) => {
    //       return [
    //         ...prev,
    //         {
    //           reservation_id: oldReservation.reservation_id,
    //           room_number: oldReservation.room_number,
    //           email: oldReservation.email,
    //           duration: oldReservation.duration,
    //           checkin_year: oldReservation.checkin_year,
    //           checkin_month: oldReservation.checkin_month,
    //           checkin_date: oldReservation.checkin_date,
    //           checkout_year: oldReservation.checkout_year,
    //           checkout_month: oldReservation.checkout_month,
    //           checkout_date: oldReservation.checkout_date,
    //         },
    //       ];
    //     });
    //     return oldReservation;
    //   });
    // });
  };

  const delRoom = (resId, room_number) => {
    axios.delete(PROJECT_PATH + "/" + email + "/reservations/" + resId + "/" + room_number).then(() => {
      getReservation();
    });

    // fetch(
    //   PROJECT_PATH + "/" + email + "/reservations/" + resId + "/" + room_number,
    //   {
    //     method: "DELETE",
    //   }
    // ).then(() => {
    //   getReservation();
    // });
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
            {item.reservation_id}
          </List.Item>
        )}
      />
    </>
  );
};

export default Reservation;
