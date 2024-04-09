import { AppShell, BackgroundImage } from "@mantine/core";
import Header from "./components/Header";
import InfoPage from "./components/InfoPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import MindMap from "./components/Mindmap";
import LogoutPage from "./components/LogoutPage";
import TopicView from "./components/TopicView";
import ExternalLinks from "./components/ExternalLinks";
import { Route, Routes, useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
import { notifications } from "@mantine/notifications";
//import { HomeContext } from "./components/HomePage";

// fix notification jitter effect...
// graph doesn't disappear when visiting other pages
// prettier custom nodes!

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

  const showNotification = () => {
    notifications.show({
      style: {
        position: "absolute",
        top: "80px",
        right: "20px",
      },
      position: "top-center",
      color: "red",
      message: "Item already in the graph!",
      autoClose: 4000,
    });
  };

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
          showNotification,
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
                <Route path="/external-sources" element={<ExternalLinks />} />
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
                <Route
                  path="/ais/:id"
                  element={
                    <TopicView
                      path={["ais", "AIId"]}
                      setItemList={setAIs}
                      itemList={AIs}
                    />
                  }
                />
                <Route
                  path="/concepts/:id"
                  element={
                    <TopicView
                      path={["theories", "TheoryId"]}
                      setItemList={setConcepts}
                      itemList={concepts}
                    />
                  }
                />
                <Route
                  path="/books/:id"
                  element={
                    <TopicView
                      path={["books", "BookId"]}
                      setItemList={setBooks}
                      itemList={books}
                    />
                  }
                />
                <Route
                  path="/people/:id"
                  element={
                    <TopicView
                      path={["people", "PersonId"]}
                      setItemList={setPeople}
                      itemList={people}
                    />
                  }
                />
                <Route
                  path="/spacecrafts/:id"
                  element={
                    <TopicView
                      path={["spacecrafts", "SpacecraftId"]}
                      setItemList={setSpacecrafts}
                      itemList={spacecrafts}
                    />
                  }
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
