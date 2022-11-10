//import express  from "express";
//import bodyParser from "body-parser";
// import userRoute from './routes/users.js';
const express = require("express");
const bodyParser = require("body-parser");
const userRoute = require("./routes/users.js");
const cors = require("cors");

const PORT = 5024;

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/',userRoute);

app.listen(PORT,() => console.log(`Server running on port: http://localhost:${PORT}`));