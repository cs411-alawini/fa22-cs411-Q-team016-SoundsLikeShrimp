import { Button, Form, InputNumber, List } from "antd";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];
const Feature = () => {
  const PROJECT_PATH = "http://localhost:5024";
  const [featureData, dataRefresh] = useState([]);
	const [range, setRange] = useState({
		minPrice: 0,
		maxPrice: 0,
	})
  async function fetchData(minPrice, maxPrice) {
		try {
			await setRange(prev => {
				prev.minPrice = minPrice;
				prev.maxPrice = maxPrice;
				return prev;
			});
			await dataRefresh(prev => {return []});

			axios.post(PROJECT_PATH + "/admin/check-feature", {
				minPrice: minPrice,
				maxPrice: maxPrice,
			}).then(res => {
				res.data.map(detail => {
					dataRefresh(prev => {
						return [...prev, {
							feature: detail.feature,
							popularity: detail.popularity,
						}];
					});
					return detail;
				});
			});
		} catch(error) {
			console.log(error);
		}

  };
	const showFeature = (values) => {
		fetchData(values.minbound, values.maxbound);
	}

	useEffect(() => {
		dataRefresh([]);
	}, [range]);

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
        renderItem={(item) => <List.Item>{"Feature: " + item.feature + ", Popularity: " + item.popularity}</List.Item>}
      />
    </>
  );
};
export default Feature;
