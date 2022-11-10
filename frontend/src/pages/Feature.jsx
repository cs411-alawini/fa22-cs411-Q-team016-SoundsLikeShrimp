import { Button, Form, InputNumber, List } from "antd";
import React, { useState } from "react";
import Navbar from "./components/Navbar";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
const Feature = () => {
  const PROJECT_PATH = "http://localhost:3000";
  const [featureData, dataRefresh] = useState([]);
  const fetchData = (minPrice, maxPrice) => {
    fetch(PROJECT_PATH + "/admin/check-feature", {
      method: "POST",
			body: JSON.stringify({
				minPrice: minPrice,
				maxPrice: maxPrice,
			})
    }).then((res) => {
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
  };
	const showFeature = (values) => {
		fetchData(values.minbound, values.maxbound);
	}

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
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
};
export default Feature;
