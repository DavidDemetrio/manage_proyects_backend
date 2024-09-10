import mongoose from "mongoose";
import { exit } from 'node:process';
import logger from "../shared/logger";

export const connectDB = async () => {
    try {        
        const connection = await mongoose.connect(process.env.DATABASE_URL!);
        const url = `${connection.connection.host}:${connection.connection.port}`;
        logger.db(`[DB CONNECTED IN]: ${url}`);
    } catch (error) {
        logger.error(error as string);
        exit(1); // Terminar la ejecución de la aplicación diciendo que terminó con errores
    }
}