import { Button, Stack } from "@mantine/core";
import { useContext } from "react";
import { AuthContext } from "../App";
import { useNavigate } from "react-router-dom";

function LogoutPage() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Stack h={300} bg="var(--mantine-color-body)" align="center" gap="md">
      {user && (
        <>
          <p>
            Are you sure you want to logout, {user ? user.name : "anonymous"}?
          </p>
          <Button onClick={logout}>Confirm Logout</Button>
        </>
      )}
      {!user && (
        <>
          <p>Please login first.</p>
          <Button onClick={() => navigate("/login")}>Go To Login</Button>
        </>
      )}
    </Stack>
  );
}

export default LogoutPage;
