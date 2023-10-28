import { Box, Button, TextField, Typography, styled } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../context/DataProvider";
import { authenticateLogin, authenticateSignup } from "../service/api";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  margin-top: 100px;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, showError] = useState("");
  const [account, toggleAccount] = useState("login");

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  useEffect(() => {
    showError(false);
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await authenticateLogin(login);
    if (!response) showError("Account donot exist!!!");
    else {
      setAccount({
        user_id: response.data.user_id,
        username: response.data.username,
      });
      console.log({
        user_id: response.data.user_id,
        username: response.data.username,
      });
      navigate("/");
    }
  };

  const signupUser = async () => {
    let response = await authenticateSignup(signup);
    if (!response) return;

    setAccount(signup.username);
  };

  return (
    <Component>
      <Box>
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
            />
            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton
              onClick={() => {
                toggleAccount("signup");
                setLogin(loginInitialValues);
                setSignup(signupInitialValues);
              }}
              style={{ marginBottom: 50 }}
            >
              Create an account
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              value={signup.username}
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              value={signup.password}
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
            />

            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton
              variant="contained"
              onClick={() => {
                toggleAccount("login");
                setLogin(loginInitialValues);
                setSignup(signupInitialValues);
              }}
            >
              Already have an account
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
