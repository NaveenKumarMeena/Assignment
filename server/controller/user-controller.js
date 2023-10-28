import bcrypt from "bcrypt";
import User from "../model/user.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users.every((user) => user instanceof User)); // true
    console.log("All users:", JSON.stringify(users, null, 2));
    res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ msg: "Error while getting  users" });
  }
};

export const loginUser = async (req, res) => {
  const user = await User.findOne({ where: { username: req.body.username } });
  if (!user) {
    return res.status(400).json({ msg: "User doesnot exist !!" });
  }
  try {
    let match = await bcrypt.compare(req.body.password, user.password);
    if (match) {
      console.log("Login successfull");

      res
        .status(200)
        .json({
          username: user.username,
          user_id: user.user_id,
          msg: "Login successfull",
        });
    } else {
      res.status(400).json({ msg: "Password does not match" });
    }
  } catch (error) {
    return res.status(500).json({ msg: "Error while getting  users" });
  }
};

export const signupUser = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const username = req.body.username;
    const user = await User.create({
      username: username,
      password: hashedPassword,
    });

    console.log(user);
    return res.status(200).json({ msg: "signup successfull....." });
  } catch (error) {
    return res.status(500).json({ msg: "Error while signing up user" });
  }
};
