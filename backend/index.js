import express from "express";
import cors from "cors";
import authRoutes from "./src/routes/authRoutes.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import channelRoutes from "./src/routes/channelRoutes.js";
import videoRoutes from "./src/routes/videoRoutes.js"
import cookieParser from "cookie-parser";
import { startCronJob } from "./src/jobs/fetch-updates-jobs.js";

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({
  origin: "https://feed-tube-frontend.onrender.com", 
  credentials: true, 
}));

app.use("/api/auth", authRoutes);
app.use("/api/users/:id", channelRoutes);

app.use("/api/users/:id/channels/:channelId", videoRoutes);

startCronJob();

app.listen(3000, () => {
  console.log("listening on port 3000");
});
