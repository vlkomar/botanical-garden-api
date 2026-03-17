import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import zoneRoutes from "./routes/zone.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/zones", zoneRoutes);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
