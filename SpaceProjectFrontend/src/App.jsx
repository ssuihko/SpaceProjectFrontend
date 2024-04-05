import {
  AppShell,
  BackgroundImage,
  Overlay,
  AspectRatio,
  Box,
  Text,
  Paper,
} from "@mantine/core";
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import LogoutPage from "./components/LogoutPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const loadUserDataFromStorage = () => {
  const userVal = localStorage.getItem("authUser");
  if (userVal !== undefined || userVal !== null) return JSON.parse(userVal);
  return null;
};

function App() {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  const [user, setUser] = useState(loadUserDataFromStorage());
  const navigate = useNavigate();

  const login = (user, authToken) => {
    setUser(user);
    setAuthToken(authToken);

    localStorage.setItem("authUser", JSON.stringify(user));
    localStorage.setItem("authToken", authToken);

    navigate("/");
  };

  const logout = () => {
    setUser(null);
    setAuthToken("");

    localStorage.removeItem("authUser");
    localStorage.removeItem("authToken");

    navigate("/login");
  };

  return (
    <>
      <AuthContext.Provider value={{ user, authToken, login, logout }}>
        <AppShell header={{ height: 60 }} padding="md">
          <BackgroundImage src="https://i.imgur.com/34gc5UO.jpeg" radius="sm">
            <Header />
            <AppShell.Main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
              </Routes>
            </AppShell.Main>
          </BackgroundImage>
        </AppShell>
      </AuthContext.Provider>
    </>
  );
}

export default App;
