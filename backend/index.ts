import express from "express";
import path from 'path'
import dotenv from 'dotenv';

dotenv.config();

const port = 8080;

const app = express();
app.use(express.static(path.join(__dirname + '/public')));


const { auth } = require('express-openid-connect');
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: "http://localhost:8080",
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    issuerBaseURL: 'https://dev-48mc1fv1emkg4uww.us.auth0.com'
};
app.use(auth(config));


//Routes
import datatableAPI from "./routes/datatableAPIRoutes";
app.use("/api", datatableAPI);

import restAPI from "./routes/restAPIRoutes";
app.use("/api/v1", restAPI);

import { responseWrap } from "./services/responseWrapper";
app.use("/api/v1/*", ( req, res ) => {
    res.status(404).json(responseWrap("Not found", "Requested API route/resource does not exist"));
});

import { AuthRequest } from "./interface/authRequest";
app.get('/checkauth', (req: AuthRequest, res) => {
    res.send(req.oidc.isAuthenticated() ? true : false);
});

import privateAPI from "./routes/privateRoutes"
app.use("/user", privateAPI);

//Default - send Angular App
app.get( "*", ( req, res ) => {
    res.sendFile(path.resolve('./dist/public/index.html'));
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});