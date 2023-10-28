import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  styled,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import Navbar from "./Navbar";
import { DataContext } from "../context/DataProvider";
import { DragDropContext } from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { createTask, fetchdataUser } from "../service/api";
import Lists from "./List";
import CreateNewListButton from "./CreatenewList";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import CreateNewtaskButton from "./CreatenewTask";

const Container = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  margin-top: 30px;
  margin-left: 30px;
  min-width: 330px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 600px;
  & > img,
  & > p {
    padding: 0 5px 5px 5px;
  }
`;
const Containers = styled(Box)`
  border: 1px solid #d3cede;
  border-radius: 10px;
  margin: 10px;
  margin-top: 30px;
  margin-left: 30px;
  min-width: 250px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 600px;
  & > img,
  & > p {
    padding: 0 5px 5px 5px;
  }
`;
const Cover = styled(Box)`
  display: flex;
  overflow: scroll;
`;
const Title = styled(Box)`
  height: 50px;
  width: 100%;
  margin-bottom: 10px;
  text-align: center;
  display: flex;
  font-size: 20px;
  justify-content: space-between;

  align-items: center;
  background-color: grey;
`;

const Home = () => {
  const [data, setData] = useState([]);
  const [listId, setListId] = useState("");
  const [render, setRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { account } = useContext(DataContext);

  const [text, setText] = useState("");

  const handleTitleChange = (event) => {
    setText(event.target.value);
  };
  const createTasks = async () => {
    const response = await createTask({
      text: text,
      listId: listId,
    });
    setIsOpen(false);
    setRender(!render);
    console.log(response);
  };

  useEffect(() => {
    if (account.user_id === "") {
      navigate("/login");
    }
    const fetch = async () => {
      //   console.log(account.user_id);
      const response = await fetchdataUser(account.user_id);
      setData(response);
      //   console.log(response);
    };
    fetch();
  }, [render]);

  return (
    <DragDropContext>
      <Box sx={{ width: "100%" }}>
        <Box>
          <Navbar render={render} setRender={setRender} />
        </Box>
        <Cover>
          {data.data?.map((list) => (
            <Container>
              <Box sx={{ width: "100%" }}>
                <Title>
                  <Box sx={{ marginLeft: "10px" }}>{list.title}</Box>{" "}
                  <Button
                    onClick={() => {
                      setListId(list.title);
                      setIsOpen(true);
                    }}
                  >
                    <AddCircleOutline />
                  </Button>
                </Title>
              </Box>
              <Lists listdata={list.listItems} />
            </Container>
          ))}

          <Containers>
            <CreateNewListButton setRender={setRender} render={render} />
          </Containers>
        </Cover>

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
              value={text}
              onChange={handleTitleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setIsOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={createTasks} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </DragDropContext>
  );
};

export default Home;
