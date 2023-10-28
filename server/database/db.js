import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();
const password = process.env.PASSWORD;
const database = process.env.DATABASE;
export const db = new Sequelize(
  `postgres://postgres:${password}@localhost:5432/${database}`,
  { dialect: "postgres" }
);
