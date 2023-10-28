import Users, { List, listItem } from "../model/user.js";

export const createList = async (req, res) => {
  const { userId, title } = req.body;
  try {
    const user = await Users.findByPk(userId);
    if (!user) {
      return res.status(200).json({ msg: "User Does not Exist!!!!" });
    }
    const newList = await List.create({ title, user_id: userId }); // Change UserUserId to user_id
    res.status(200).json(newList);
  } catch (error) {
    return res.status(500).json("Error: " + error);
  }
};

export const createListItem = async (req, res) => {
  try {
    const { listId, text } = req.body;
    const list = await List.findByPk(listId);

    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const newItem = await listItem.create({ text, list_id: listId });
    res.status(201).json(newItem);
  } catch (error) {
    return res.status(500).json("Error : ", error);
  }
};

export const getUserLists = async (req, res) => {
  try {
    const userId = req.query.userId;
    console.log(userId);
    const user = await Users.findByPk(userId, {
      include: [
        {
          model: List,
          as: "lists",
          include: [
            {
              model: listItem,
              as: "listItems", // Should match the alias in your association
            },
          ],
        },
      ],
    });
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    console.log(user.lists);
    return res.status(200).json(user.lists);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Unable to retrieve user lists" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.query;
    console.log(taskId);
    const task = await listItem.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    await task.destroy();

    return res.status(204).send(); // Successful deletion, no content response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
