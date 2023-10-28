import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useContext, useEffect, useState } from "react";
import { createList } from "../service/api";
import { DataContext } from "../context/DataProvider";

const CreateNewListButton = ({ setRender, render }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");

  const { account } = useContext(DataContext);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const createLists = async () => {
    const response = await createList({
      title: title,
      userId: account.user_id,
    });
    setIsOpen(false);
    setRender(!render);
    console.log(response);
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Create New List
        <AddCircleOutlineIcon sx={{ fontSize: "70px" }} />
      </Button>
      <Dialog open={isOpen} onClose={isOpen}>
        <DialogTitle>Add a New List</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the title for your new list:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            value={title}
            onChange={handleTitleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={createLists} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CreateNewListButton;
