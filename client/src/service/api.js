import axios from "axios";

const url = "http://localhost:8000";

export const authenticateLogin = async (user) => {
  try {
    return await axios.post(`${url}/login`, user);
  } catch (error) {
    console.log("Error while calling login API: ", error);
  }
};

export const authenticateSignup = async (user) => {
  try {
    return await axios.post(`${url}/signup`, user);
  } catch (error) {
    console.log("Error while calling Signup API: ", error);
  }
};

export const fetchdataUser = async (userId) => {
  try {
    return await axios.get(`${url}/getlist?userId=${userId}`);
  } catch (error) {
    console.log("Error while Fetching data: ", error);
  }
};

export const createList = async ({ userId, title }) => {
  try {
    return await axios.post(`${url}/createlist`, {
      userId,
      title,
    });
  } catch (error) {
    console.log("Error while calling createList API: ", error);
  }
};

export const createTask = async ({ listId, text }) => {
  try {
    console.log(listId, text);
    return await axios.post(`${url}/createlistitem`, {
      listId,
      text,
    });
  } catch (error) {
    console.log("Error while calling createTask API: ", error);
  }
};

export const deleteTask = async ({ taskId }) => {
  try {
    console.log(taskId);
    await axios.delete(`${url}/deletetask/?taskId=${taskId}`);
  } catch (error) {
    console.log("Error while calling createTask API: ", error);
  }
};
