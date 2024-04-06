import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { Box, Text, Paper, Select, Group, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import {
  IconAtom,
  IconBinaryTree,
  IconRocket,
  IconUsers,
  IconRobotFace,
  IconBook2,
} from "@tabler/icons-react";
import InfoPage from "./InfoPage";
import CardItem from "./CardItem";
import classes from "./HomePage.module.css";

export const HomeContext = createContext();

function HomePage() {
  const { user, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [AIs, setAIs] = useState([]);
  const [people, setPeople] = useState([]);
  const [spacecrafts, setSpacecrafts] = useState([]);
  const [books, setBooks] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchSelection, setSearchSelection] = useState([]);

  useEffect(() => {
    if (searchValue == "" || searchValue == "AI") {
      setSearchSelection(AIs);
    }

    if (searchValue == "People") {
      setSearchSelection(people);
    }

    if (searchValue == "Spacecrafts") {
      setSearchSelection(spacecrafts);
    }

    if (searchValue == "Books") {
      setSearchSelection(books);
    }

    if (searchValue == "Concepts") {
      setSearchSelection(concepts);
    }
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${authToken}`,
  });

  // fetch data
  useEffect(() => {
    fetch("https://localhost:61026/ais", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        setAIs(data);
      })
      .catch((error) => {
        console.error("Error fetching AIs:", error);
      });
  }, []);

  // fetch data
  useEffect(() => {
    fetch("https://localhost:61026/theories", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        setConcepts(data);
      })
      .catch((error) => {
        console.error("Error fetching AIs:", error);
      });
  }, []);

  // fetch data
  useEffect(() => {
    fetch("https://localhost:61026/books", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  // fetch data
  useEffect(() => {
    fetch("https://localhost:61026/people", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        setPeople(data);
      })
      .catch((error) => {
        console.error("Error fetching people:", error);
      });
  }, []);

  // fetch data
  useEffect(() => {
    fetch("https://localhost:61026/spacecrafts", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        setSpacecrafts(data);
      })
      .catch((error) => {
        console.error("Error fetching spacecrafts:", error);
      });
  }, []);

  // real - not real button
  // filter by author
  return (
    <>
      <HomeContext.Provider value={{ AIs, people, spacecrafts }}>
        <Box
          p={10}
          opacity={5}
          ta="center"
          mx="auto"
          maw={1700}
          bg="blue.5"
          my="xl"
        >
          <h3> Logged in with email {user ? user : "anonymous"}</h3>
          <Paper shadow="xl" p="xl">
            <Text>Hi stranger!</Text>
            <Text>
              Here's a neat collection of kewl space related things I'm
              interested about. Expect a lot of SciFi writers, books,
              spacecrafts and physics concepts.
            </Text>
          </Paper>

          <Group className={classes.topiclinks} justify="center">
            <Button
              color="rgba(189, 25, 79, 1)"
              radius="xl"
              leftSection={<IconBinaryTree size={14} />}
            >
              Mindmap
            </Button>

            <Button
              leftSection={<IconUsers size={14} />}
              color="rgba(189, 25, 79, 1)"
              variant="filled"
              radius="xl"
            >
              People
            </Button>

            <Button
              leftSection={<IconBook2 size={14} />}
              color="rgba(189, 25, 79, 1)"
              variant="filled"
              radius="xl"
            >
              Books
            </Button>

            <Button
              color="rgba(189, 25, 79, 1)"
              radius="xl"
              leftSection={<IconRobotFace size={14} />}
            >
              AI & Androids
            </Button>

            <Button
              color="rgba(189, 25, 79, 1)"
              radius="xl"
              leftSection={<IconRocket size={14} />}
            >
              Spacecrafts
            </Button>

            <Button
              variant="filled"
              color="rgba(189, 25, 79, 1)"
              radius="xl"
              leftSection={<IconAtom size={14} />}
            >
              Concepts
            </Button>
          </Group>

          <Paper shadow="xl" p="xl">
            <Select
              clearable
              searchable
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              label="Pick topics to filter your search"
              placeholder="Pick value"
              data={["People", "Books", "AI", "Spacecrafts", "Concepts"]}
            />
          </Paper>
          <Group grow className={classes.cardgroup}>
            {searchSelection.length == 0 ? (
              <p>LOADING......</p>
            ) : (
              searchSelection.map((ai, index) => (
                <CardItem key={index} subject={ai} />
              ))
            )}
          </Group>
        </Box>
      </HomeContext.Provider>
    </>
  );
}
export default HomePage;
