import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";

const Home = () => {
	const PROJECT_PATH = "http://localhost:3000";
	const { email } = useParams();
	const [isAdmin, setAdmin] = useState(false);

	useEffect(() => {
		fetch(PROJECT_PATH + '/' + email, {
			method: 'GET',
		}).then(res => {
			res.json().then(data => {
				if (data.membership === 5) {
					setAdmin(true);
				}

			});
		});
	}, []);

  

  return (
		<Navbar
			email={email}
			isAdmin={isAdmin}
		/>
	);
};

export default Home;