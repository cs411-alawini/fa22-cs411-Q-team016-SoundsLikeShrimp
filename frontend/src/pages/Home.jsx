import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";

const Home = () => {
	const PROJECT_PATH = "http://localhost:3000";
	const { email } = useParams();
	const navigate = useNavigate();
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

  const redirect = (e) => {

    if (e.key === 'account') {
			if (email !== undefined) {
				navigate('/' + email + '/info');
			} else {
				navigate('/login');
			}
		} else if (e.key === 'home') {
			if (email !== undefined) {
				navigate('/' + email);
			} else {
				navigate('/');
			}
		} else if (e.key === 'reservation') {
			navigate('/' + email + '/reservations');
		} else {
			navigate('/' + e.key);
		}
  };

  return (
		<Navbar
			email={email}
			isAdmin={isAdmin}
			clickAction={redirect}
		/>
	);
};

export default Home;