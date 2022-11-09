import { Button } from "antd";
import React from "react";
import "antd/dist/antd.min.css";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  return (
    <div>
      <Button type="primary" onClick={() => navigate("/admin/check-revenue")}>
        See Revenue
      </Button>
      <Button onClick={() => navigate("/admin/check-feature")}>
        Popular Feature
      </Button>
    </div>
  );
}

export default Admin;