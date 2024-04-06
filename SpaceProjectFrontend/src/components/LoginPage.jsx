import { Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";
import { IconAt, IconPassword } from "@tabler/icons-react";
import classes from "./LoginPage.module.css";

import {
  BackgroundImage,
  Overlay,
  AspectRatio,
  Box,
  Text,
  Paper,
} from "@mantine/core";

const DEFAULT_FORM_STATE = {
  email: "",
  password: "",
};

function LoginPage() {
  const { user, login } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formState, setFormState] = useState({ ...DEFAULT_FORM_STATE });

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const changeForm = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  // API CALL HERE!!
  const onLoginRequested = (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    const loginOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    };

    fetch("https://localhost:61026/auth/login", loginOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Something went wrong! Status: ${res.status}`);
      })
      .then((newLogin) => {
        console.log("MESSAGE BACK");
        console.log(newLogin);
        // context.setPosts([...context.posts, newL]);
        login(newLogin.email, newLogin.token);
      })
      .catch((err) => {
        console.log(err);
      });

    //login(payload.user, payload.authToken);

    setFormState({ ...DEFAULT_FORM_STATE });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Stack
      className={classes.loginform}
      h={0}
      bg="var(--mantine-color-body)"
      align="center"
      gap="md"
    >
      <form>
        <TextInput
          leftSection={<IconAt size={16} />}
          placeholder="email"
          name="email"
          required
          autoComplete="off"
          onChange={changeForm}
          value={formState.email}
        />
        <PasswordInput
          leftSection={<IconPassword size={16} />}
          placeholder="password"
          name="password"
          required
          onChange={changeForm}
          value={formState.password}
        />
        <Button
          onClick={onLoginRequested}
          loading={isLoggingIn}
          loaderProps={{ type: "dots" }}
        >
          Log In
        </Button>
      </form>
    </Stack>
  );
}

export default LoginPage;
