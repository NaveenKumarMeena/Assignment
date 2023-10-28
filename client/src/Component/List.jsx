import { Button, Checkbox, List, ListItem } from "@mui/material";
import React, { useState } from "react";
import { deleteTask } from "../service/api";

const Lists = ({ listdata }) => {
  const deleteTasks = async (taskId) => {
    console.log(taskId);
    await deleteTask({ taskId });
    console.log("task deleted");
  };
  return (
    <>
      <List
        sx={{
          width: "100%",
          height: "100%",
          bgcolor: "lightgrey",
          overflow: "scroll",
        }}
      >
        {listdata?.map((task) => (
          <ListItem
            sx={{
              width: "91%",
              bgcolor: "white",
              color: "black",
              marginLeft: "10px",
              marginRight: "10px",
              marginTop: "30px",
              borderRadius: "10px",
            }}
            key={task.id}
          >
            <Button
              onClick={() => {
                deleteTasks(task.id);
              }}
            >
              <Checkbox color="primary" />
            </Button>
            {task.text}
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Lists;
