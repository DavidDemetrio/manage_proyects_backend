import "dotenv/config";
import server from "./server";
import logger from "./shared/logger";

const PORT = process.env.PORT || "4000";

server.listen(PORT, () => {
    logger.success(`[CONEXION SERVER SUCCESS]: Server is running on port ${PORT}`);
});