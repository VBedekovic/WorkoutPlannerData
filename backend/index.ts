import express from "express";
import path from 'path'

//import dotenv from 'dotenv';
//dotenv.config();

const port = 8080;

const app = express();
app.use(express.static(path.join(__dirname + '/public')));


//Routes
import datatableAPI from "./routes/datatableAPIRoutes";
app.use("/api", datatableAPI);

import restAPI from "./routes/restAPIRoutes";
app.use("/api/v1", restAPI);

import { responseWrap } from "./services/responseWrapper";
app.use("/api/v1/*", ( req, res ) => {
    res.status(404).json(responseWrap("Not found", "Requested API route/resource does not exist"));
});
//Default - send Angular App
app.get( "*", ( req, res ) => {
    res.sendFile(path.resolve('./dist/public/index.html'));
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});