import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { Menu } from 'antd';

const Home = () => {
	const PROJECT_PATH = "http://localhost:3000";
	const { email } = useParams();
	const navigate = useNavigate();
	const authorized = (email !== undefined);
	const loginItem = authorized ? {
		label: 'Hi, ' + email,
		key: 'account',
	} : {
		label: 'Login',
		key: 'account',
	};
	const bookItem = {
		label: 'Booking',
		key: 'booking',
	};
	const adminLink = {
		label: 'Admin',
		key: 'admin',
	};
	const myReserve = {
		label: 'Reservation',
		key: 'reservation',
	};
	const [items, setItem] = useState([
		loginItem,
		bookItem,
		myReserve,
		// adminLink,
	]);
	const [isAdmin, setAdmin] = useState(false);

	// useEffect(() => {
	// 	fetch(PROJECT_PATH + '/' + email, {
	// 		method: 'GET',
	// 	}).then(res => {
	// 		res.json().then(data => {
	// 			if (data.membership === 5) {
	// 				setAdmin(true);
	// 			}

	// 			setItem(prev => {return [...prev, loginItem];});
	// 			setItem(prev => {return [...prev, bookItem];});
	// 			if (authorized) {
	// 				setItem(prev => {return [...prev, myReserve]});
	// 			}
	// 			if (isAdmin) {
	// 				setItem(prev => {return [...prev, adminLink];});
	// 			}
	// 		}).catch(err => {
	// 			console.log(err);
	// 		});
	// 	});
	// });


  const [current, setCurrent] = useState('mail');

  const onClick = (e) => {
    console.log('click ', e);

    if (e.key === 'account') {
			if (authorized) {
				navigate('/' + email + '/info');
			} else {
				navigate('/login');
			}
		} else if (e.key === 'reservation') {
			navigate('/' + email + '/reservation');
		} else {
			navigate('/' + e.key);
		}
  };

  return (
		<Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
	);
};

export default Home;