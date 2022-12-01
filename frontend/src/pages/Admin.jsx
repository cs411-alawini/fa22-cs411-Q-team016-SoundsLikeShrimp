import { Button } from "antd";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";

function Admin() {
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

  if (loading) {
    return <h1>Still loading...</h1>;
  } else {
    return (
      <div>
        <Navbar email={email} isAdmin={isAdmin} />
        <Button
          type="primary"
          onClick={() => navigate("/" + email + "/admin/check-revenue")}
        >
          See Revenue
        </Button>
        <Button onClick={() => navigate("/" + email + "/admin/check-feature")}>
          Popular Feature
        </Button>
        <Button type="primary" onClick={() => navigate("/" + email + "/admin/hiring")}>
          Hiring Management
        </Button>
      </div>
    );
  }
}

export default Admin;
