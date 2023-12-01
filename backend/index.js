import express from "express";

// initialize server
const app = express();

// plugin for reading JSON payloads
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// server listens at Port 3001
app.listen(3001, () => {
    console.log("API listening at port 3001.");
});
