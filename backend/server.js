// const express = require("express");
// const bodyParser = require("body-parser");
// const userRoute = require("./routes/users.js");
// import userRoute from './routes/users.js';
import express from "express";
import userRoute from "./routes/users.js";
import bodyParser from "body-parser";


const app = express();
const PORT = 5024;

app.use(bodyParser.json());

app.use('/',userRoute);

app.listen(PORT,() => console.log(`Server running on port: http://localhost:${PORT}`));