import express from "express";
import {
  loginUser,
  signupUser,
  getUsers,
} from "../controller/user-controller.js";
import {
  createList,
  createListItem,
  deleteTask,
  getUserLists,
} from "../controller/task-controller.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/signup", signupUser);
router.get("/getusers", getUsers);

router.post("/createlist", createList);
router.post("/createlistitem", createListItem);
router.get("/getlist", getUserLists);
router.delete("/deletetask/", deleteTask);

export default router;
