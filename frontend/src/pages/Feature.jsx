import { Button, Form, InputNumber, List } from "antd";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Feature = () => {
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

  const [featureData, dataRefresh] = useState([]);
  const [range, setRange] = useState({
    minPrice: 0,
    maxPrice: 0,
  });
  async function fetchData(minPrice, maxPrice) {
    try {
      await setRange((prev) => {
        prev.minPrice = minPrice;
        prev.maxPrice = maxPrice;
        return prev;
      });
      await dataRefresh((prev) => {
        return [];
      });

      axios
        .post(PROJECT_PATH + "/admin/check-feature", {
          minPrice: minPrice,
          maxPrice: maxPrice,
        })
        .then((res) => {
          res.data.map((detail) => {
            dataRefresh((prev) => {
              return [
                ...prev,
                {
                  feature: detail.feature,
                  popularity: detail.popularity,
                },
              ];
            });
            return detail;
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  const showFeature = (values) => {
    fetchData(values.minbound, values.maxbound);
  };

  useEffect(() => {
    dataRefresh([]);
  }, [range]);

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
          onFinish={showFeature}
        >
          <Form.Item label="Min Price:" name="minbound">
            <InputNumber />
          </Form.Item>
          <Form.Item label="Max Price" name="maxbound">
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Check
            </Button>
          </Form.Item>
        </Form>
        <List
          bordered
          dataSource={featureData}
          renderItem={(item) => (
            <List.Item>
              {"Feature: " + item.feature + ", Popularity: " + item.popularity}
            </List.Item>
          )}
        />
      </>
    );
  }
};
export default Feature;
