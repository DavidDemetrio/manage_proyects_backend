import express from "express";
import { connectDB } from "./config/db";

const app = express();

connectDB();

export default app;