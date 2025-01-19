import express from "express";
import authRoutes from "./src/routes/authRoutes.js";
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import formRoutes from "./src/routes/formRoutes.js";
dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use("/api/users", authRoutes);
app.use("/api/form", formRoutes);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
