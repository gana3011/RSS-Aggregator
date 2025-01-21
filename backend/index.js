import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import channelRoutes from "./src/routes/channelRoutes.js";
import videoRoutes from "./src/routes/videoRoutes.js"

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/users/:id", channelRoutes);
app.use("/api/users/:id/channels", videoRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
