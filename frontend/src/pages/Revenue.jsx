import { List, Button } from "antd";
import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const Revenue = () => {
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

	const changePrice = () => {
		// axios.get(PROJECT_PATH + "/admin/change-price").then(res => {
		console.log("clicked");
		// });
	}
	
	if (loading) {
		return <h1>Still Loading</h1>
	} else {
	return (
		<>
			<Navbar email={email} isAdmin={isAdmin} />
			<Button type="primary" onClick={changePrice}>Update price</Button>
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
	);}
};
export default Revenue;
