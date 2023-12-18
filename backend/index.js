import mongoose from "mongoose";
import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes.js";
import "./models/user.js";
import cors from "cors";

// connect to the database.
await mongoose.connect("mongodb://127.0.0.1:27017/FarmToTable");

// initialize server.
const app = express();

// plugin for reading JSON payloads.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors()); 
// initialize router.
router(app);

// server listens at Port 3001.
app.listen(3001, () => {
    console.log("API listening at port 3001.");
});
