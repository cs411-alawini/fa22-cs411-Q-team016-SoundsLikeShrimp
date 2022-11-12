import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";

const Home = () => {
	const PROJECT_PATH = "http://localhost:5024";
	const { email } = useParams();
	const [isAdmin, setAdmin] = useState(false);
	const [loading, setLoading] = useState(email !== undefined ? true:false);

	useEffect(() => {
		axios.get(PROJECT_PATH + "/" + email).then(res => {
			if (res.data[0].membership === 5) {
				setAdmin(prev => true);
			}
			setLoading(false);
		}).catch(err => {
			console.log("Not login");
		});
	}, []);

	if (loading) {
		return <h1>Still loading...</h1>
	} else {
		return (
			<Navbar
				email={email}
				isAdmin={isAdmin}
			/>
		);
	}
};

export default Home;