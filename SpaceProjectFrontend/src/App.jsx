import { AppShell, BackgroundImage } from "@mantine/core";
import Header from "./components/Header";
import InfoPage from "./components/InfoPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import MindMap from "./components/Mindmap";
import LogoutPage from "./components/LogoutPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
//import { HomeContext } from "./components/HomePage";

export const AuthContext = createContext();

const loadUserDataFromStorage = () => {
  const userVal = localStorage.getItem("authUser");
  if (userVal !== undefined || userVal !== null) return JSON.parse(userVal);
  return null;
};

var host = "https://localhost:57433/";

function App() {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );
  const [user, setUser] = useState(loadUserDataFromStorage());
  const navigate = useNavigate();

  const [AIs, setAIs] = useState([]);
  const [people, setPeople] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [books, setBooks] = useState([]);
  const [concepts, setConcepts] = useState([]);

  //  const { AIs } = useContext(HomeContext);

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
      <AuthContext.Provider
        value={{
          user,
          authToken,
          login,
          logout,
          host,
          AIs,
          setAIs,
          people,
          setPeople,
          spacecrafts,
          setSpacecrafts,
          books,
          setBooks,
          concepts,
          setConcepts,
        }}
      >
        <AppShell header={{ height: 60 }} padding="md">
          <BackgroundImage src="https://i.imgur.com/34gc5UO.jpeg" radius="sm">
            <Header />
            <AppShell.Main>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                <Route path="/mindmap" element={<MindMap />} />
                <Route
                  path="/ais"
                  element={<InfoPage name="AI" object={AIs} />}
                />
                <Route
                  path="/people"
                  element={<InfoPage name="people" object={people} />}
                />
                <Route
                  path="/concepts"
                  element={<InfoPage name="concept" object={concepts} />}
                />
                <Route
                  path="/spacecrafts"
                  element={<InfoPage name="spacecraft" object={spacecrafts} />}
                />
                <Route
                  path="/books"
                  element={<InfoPage name="book" object={books} />}
                />
              </Routes>
            </AppShell.Main>
          </BackgroundImage>
        </AppShell>
      </AuthContext.Provider>
    </>
  );
}

export default App;
