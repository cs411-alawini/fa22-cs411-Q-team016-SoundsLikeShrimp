import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { Menu } from 'antd';
import { useNavigate } from "react-router-dom";


// Props: email, isAdmin
const Navbar = (props) => {
	const navigate = useNavigate();

	// Navbar items
	const homeItem = {
		label: 'Chivage',
		key: 'home',
	}
	const loginItem = (props.email !== undefined) ? {
		label: 'Hi, ' + props.email,
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
		homeItem,
		loginItem,
		bookItem,
	]);
	const toRender = [
		{
			shouldRender: (props.email !== undefined),
			renderItem: myReserve,
		}, 
		{
			shouldRender: props.isAdmin,
			renderItem: adminLink,
		},
	];

	const redirect = (e) => {
    if (e.key === 'account') {
			if (props.email !== undefined) {
				navigate('/' + props.email + '/info');
			} else {
				navigate('/login');
			}
		} else if (e.key === 'home') {
			if (props.email !== undefined) {
				navigate('/' + props.email);
			} else {
				navigate('/');
			}
		} else if (e.key === 'reservation') {
			navigate('/' + props.email + '/reservations');
		} else {
			navigate('/' + e.key);
		}
  };

	useEffect(() => {
		toRender.map(item => {
			if (item.shouldRender) {
				setItem(prev => {
					return [...prev,
						item.renderItem
					];
				});
			}
			return item;
		});
	}, []);

	return (
		<Menu onClick={redirect} mode="horizontal" items={items} />
	)
}

export default Navbar;