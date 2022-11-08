import express from "express";
import path from 'path'

//import dotenv from 'dotenv';
//dotenv.config();

const port = 8080;

const app = express();
app.use(express.static(path.join(__dirname + '/public')));


app.get( "*", ( req, res ) => {
    res.sendFile(path.resolve('./dist/public/index.html'))
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});