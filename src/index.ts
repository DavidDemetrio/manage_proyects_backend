import colors from "colors";
import server from "./server";

const PORT = process.env.PORT || "4000";

server.listen(PORT, () => {
    console.log(colors.green.bold(`[CONEXION SERVER SUCCESS]: Server is running on port ${PORT}`));
});