import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import axios from "axios";

const Home = () => {
	const PROJECT_PATH = "http://localhost:5024";
	const { email } = useParams();
	const [isAdmin, setAdmin] = useState(false);

	useEffect(() => {
		axios.get(PROJECT_PATH + "/" + email).then(res => {
			res.json().then(data => {
				if (data.membership === 5) {setAdmin(true);}
			});
		});

		// fetch(PROJECT_PATH + '/' + email, {
		// 	method: 'GET',
		// }).then(res => {
		// 	res.json().then(data => {
		// 		if (data.membership === 5) {
		// 			setAdmin(true);
		// 		}

		// 	});
		// });
	}, []);

  

  return (
		<Navbar
			email={email}
			isAdmin={isAdmin}
		/>
	);
};

export default Home;