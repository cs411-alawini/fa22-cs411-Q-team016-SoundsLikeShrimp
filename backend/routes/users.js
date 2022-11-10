//const express = require("express");
import express from "express";
import { registerUser,homepage,adminpage,userInfo,editUser,login,emailReservations,deleteReservation,checkRevenue,checkFeature,bookingCheck,bookARoom } from "../controller/user.js";
// import mysql from mysql2;
// const { registerUser,homepage,adminpage,userInfo,editUser,login,emailReservations,deleteReservation,checkRevenue,checkFeature,bookingCheck,bookARoom } = require("../controller/user.js");
var router = express.Router();
var mysql = require("mysql2");


// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'hotel'
});

/* GET users listing. */

const usersDB = []

// mainpage
router.get("/", homepage);

// register (email, password, phone, name)
router.post("/register",registerUser );

//admin
router.get("/admin",adminpage);

// /<email>/info
router.get("/:email",userInfo);
router.patch("/:email",editUser);

// LOGIN Authentication
app.post("/login", login);

// <email>/reservations
app.get('/:email/reservations',emailReservations);

//<email>/delete
app.delete("/:email/reservations/:reservation_id/:room_number",deleteReservation );

// admin/check-revenue 
app.get('/admin/check-revenue ',checkRevenue);

// admin/check-feature
app.post('/admin/check-feature',checkFeature);

// booking
app.post('/booking/getroom',bookingCheck);
app.post("/booking",bookARoom);

export default router;