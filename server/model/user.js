import { DataTypes } from "sequelize";
import { db } from "../database/db.js";

const Users = db.define("Users", {
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const List = db.define("lists", {
  title: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
});

export const listItem = db.define("listItems", {
  text: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Users.hasMany(List, {
  foreignKey: "user_id",
  as: "lists",
});
List.belongsTo(Users, {
  foreignKey: "user_id",
  as: "lists",
});
List.hasMany(listItem, {
  foreignKey: "list_id",
  as: "listItems",
});
listItem.belongsTo(List, {
  foreignKey: "list_id",
  as: "listItems",
});

export default Users;
