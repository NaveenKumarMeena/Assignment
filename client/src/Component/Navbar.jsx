import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { DataContext } from "../context/DataProvider";

export default function ButtonAppBar({ setRender, render }) {
  const { setAccount } = useContext(DataContext);
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "grey" }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome User
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              setAccount({ user_id: "", username: "" });
              setRender(!render);
            }}
          >
            LogOut
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
