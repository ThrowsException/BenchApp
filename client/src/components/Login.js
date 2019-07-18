import React, { useState } from "react";
import wretch from "wretch";
import {
  Button,
  TextField,
  AppBar,
  Typography,
  Toolbar
} from "@material-ui/core";
import styled from "styled-components";

const SignupForm = styled.form`
  min-width: 320px;
  max-width: 600px;
`;

const Root = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Login = ({ history }) => {
  const [user, setValues] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({ ...user, [name]: value });
  };

  const submit = async e => {
    e.preventDefault();
    await wretch("/api/login")
      .post({ username: user.email, password: user.password })
      .json(() => {
        history.push("/teams");
      })
      .catch(error => console.log(error));
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Front Office
          </Typography>
        </Toolbar>
      </AppBar>
      <Root>
        <SignupForm onSubmit={submit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            onChange={handleInputChange}
            value={user.email}
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            value={user.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={submit}
          >
            Submit
          </Button>
        </SignupForm>
      </Root>
    </>
  );
};

export default Login;
