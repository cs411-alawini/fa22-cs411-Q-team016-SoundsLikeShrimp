import express  from "express";
import { registerUser,homepage,adminpage,userInfo,editUser,login,emailReservations,deleteReservation,checkRevenue,checkFeature,bookingCheck,bookARoom } from "../controller/user.js";
var router = express.Router();
var mysql = require("mysql2");

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'test'
});

/* GET users listing. */

const usersDB = []

// mainpage
router.get("/", homepage);

// register (email, password, phone, name)
router.post("/",registerUser );

//admin
router.get("/admin",adminpage);

// /<email>/info
router.get("/:email/info",userInfo);
router.patch("/:email/info",editUser);

// LOGIN Authentication
app.post("/login", login);

// <email>/reservations
app.get('/:email/reservations',emailReservations);

//<email>/delete
app.delete("/:email/reservations/:reservation_id",deleteReservation );

// admin/check-revenue 
app.get('/admin/check-revenue ',checkRevenue);

// admin/check-feature
app.get('/admin/check-feature',checkFeature);

// booking
app.get('/booking',bookingCheck);
app.post("/booking",bookARoom);

export default router;