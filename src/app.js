import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cookieParser());

//* 404 Handler

//* Error Handler

export default app;
