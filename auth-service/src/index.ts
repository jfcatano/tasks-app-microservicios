import { connectDB } from "../config";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.NODEJS_SERVER_PORT || 3000;

const main = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error starting the NodeJS server:", error);
    }
};

main()