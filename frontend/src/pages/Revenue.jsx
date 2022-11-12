import { List } from "antd";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";

const Revenue = () => {
	const PROJECT_PATH = "http://localhost:5024";
	const [revenueData, dataRefresh] = useState([]);
	const fetchData = () => {
		axios.get(PROJECT_PATH + "/admin/check-revenue").then(res => {
			res.data.map(detail => {
				dataRefresh(prev => {
					return [...prev, {
						month: detail.month,
						revenue: detail.revenue,
					}];
				});
				return detail;
			});
		});
	};

	useEffect(() => {
		fetchData();
	}, []);
	
	return (
		<>
			<Navbar />
			<List
				bordered
				dataSource={revenueData}
				renderItem={(item) => (
					<List.Item>
						{"month: " + item.month + ", revenue: " + item.revenue}
					</List.Item>
				)}
			/>
		</>
	)
};
export default Revenue;
