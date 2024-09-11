import express, { json } from "express";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes"

const app = express();

connectDB();

// Habilitar el envío de json por body
app.use(json());

// Routes
app.use('/api/projects', projectRoutes);

export default app;