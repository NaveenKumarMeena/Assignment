//importing modules
import express from "express";
import sequelize from "sequelize";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { db } from "./database/db.js";
import router from "./routes/route.js";
import Users, { List, listItem } from "./model/user.js";
dotenv.config();

//setting up your port
const PORT = process.env.PORT || 8000;

//assigning the variable app to express
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Database authentication
db.authenticate()
  .then(async () => {
    await Users.sync({ forced: true });
    await List.sync({ forced: true });
    await listItem.sync({ forced: true });
    console.log("Database connected successfully... ");
  })
  .catch((err) => console.log("Error : " + err));

//routes
app.use("/", router);

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`));
