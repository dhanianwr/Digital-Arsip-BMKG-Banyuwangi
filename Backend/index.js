import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";
import cookieParser from "cookie-parser";
import db from './config/Database.js'
import Users from './models/UserModel.js'
import UserRoute from './routes/UserRoute.js'

import DokumenRoute from "./routes/dokumenroute.js";


dotenv.config();

const app = express();
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/public", express.static(path.join(__dirname, "public")));

app.use(cors({ credentials: true, origin: "https://arsip-bmkgbwi.vercel.app" }));

app.use(cookieParser())

app.use(UserRoute)
try {
  await db.authenticate();
  await Users.sync();
} catch (error) {}


app.use(DokumenRoute);


app.listen(process.env.APP_PORT, () => {
  console.log("Server Running Port 5000");
});
