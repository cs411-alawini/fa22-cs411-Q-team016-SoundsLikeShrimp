import express  from "express";
import bodyParser from "body-parser";

import userRoute from './routes/users.js';

const app = express();
const PORT = 5024;

app.use(bodyParser.json());

app.use('/,',userRoute);

app.listen(PORT,() => console.log(`Server running on port: http://localhost:${PORT}`));