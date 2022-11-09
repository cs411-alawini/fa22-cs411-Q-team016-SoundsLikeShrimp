// // var router = express.Router();
// // var express = require('express');
// import express from "express";
// import bodyParser from "body-parser"; // allow us to take in incoming post request
// // var mysql = require("mysql2");
// // const { query } = require('express');
// var app = express();

// const PORT = 5024;
// app.use(bodyParser.json());
// app.listen(PORT,()=> console.log(`Server listening on port: http://localhost:${PORT}`));



// // var db = mysql.createConnection(){
// //     host="local host",
// //     user="root",
// //     password=""
// // };


// // // mainpage
// // app.get("/,/${email}",function(req,res){


// // });
// // //login
// // app.get("/login",function(req,res){

// // });

// // // register
// // app.get("/",function(req,res){

// // });

// // //<email>/reservations
// // app.delete("",function(req,res){

// // });

// // ///<email>/info


// // //admin


// // // /admin/check-revenue 
// // app.get('admin/check-revenue ',function(req,res){
// //     const revenue_query = "SELECT res.checkin_month AS month, SUM(res.duration * rm.price) AS revenue FROM Reservation res JOIN Room rm USING(room_number) GROUP BY res.checkin_month ORDER BY res.checkin_month;"

// //     db.query (revenue_query,(err,result)) => ({
// //         res.send(result);
// //     });
// // });


// // // /admin/check-feature
// // app.get('/admin/check-feature',function(req,res){
// //     const feature_query = "SELECT rm.feature, COUNT(res.reservation_id) AS popularity FROM Reservation res JOIN Room rm USING(room_number) WHERE rm.price <= 180 AND rm.price >= 100 GROUP BY rm.feature ORDER BY rm.feature;";

// //     db.query(feature_query,(err,result)) => ({
// //         res.send(result);
// //     });

// // });



// // // /booking
// // app.get('/booking',function(req,res)=>{
// //     // const cust_checkin_year= //input;
// //     // const cust_checkin_month= //input
// //     // const cust_checkin_date= //input
// //     // const cust_checkout_year= //input
// //     // const cust_checkout_month=
// //     // const cust_checkout_date=
// //     // const people=
// //     // const price_low=
// //     // const price_high=
// //     // contst feature
// //     const booking_query = "SELECT room_number,price, feature, accomodation FROM Room ro natural join Reservation re WHERE cust_checkin_year <= re.checkin_year <= cust_checkout_year  and cust_checkin_month <= re.checkin_month <= cust_checkout_month and cust_checkin_date <= re.checkin_date <= cust_checkout_date and people <= ro.accomodation AND price_low <= ro.price <= price_high; ";

// //     db.query(booking_query,(err,result)=>({
// //         res.send(result);
// //     });
// // });

// // app.post("/booking",function(req,res){
// //     var reservationID = ;
// //     const selected_room_number=
// //     const cust_email = ;
// //     // const cust_checkin_year= //input;
// //     // const cust_checkin_month= //input
// //     // const cust_checkin_date= //input
// //     // const cust_checkout_year= //input
// //     // const cust_checkout_month=
// //     // const cust_checkout_date=
// //     const reservationInsert = "INSERT INTO Reservation (reservationID,selected_room_number,cust_email,cust_checkin_year,cust_checkin_month,cust_checkin_date,cust_checkout_year,cust_checkout_month,cust_checkout_date) VALUES(?,?,?,?,?,?,?,?,?)"
// //     db.query(reservationInsert,[reservationID,selected_room_number,cust_email,cust_checkin_year,cust_checkin_month,cust_checkin_date,cust_checkout_year,cust_checkout_month,cust_checkout_date],(err,result)) => { if (err){
// //         return res.status(400);
// //     }else{
// //         return res.status(200);
// //     }};
// // });