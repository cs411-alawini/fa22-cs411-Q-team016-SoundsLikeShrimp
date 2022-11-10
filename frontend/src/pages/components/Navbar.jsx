import React, { useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { Menu } from 'antd';


// Props: email, isAdmin, clickAction
const Navbar = (props) => {
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

	const onClick = (e) => {
		props.clickAction(e);
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
		<Menu onClick={onClick} mode="horizontal" items={items} />
	)
}

export default Navbar;