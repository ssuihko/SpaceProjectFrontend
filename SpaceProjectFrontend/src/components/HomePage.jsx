import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { Box, Text, Paper, Select, Group, Button, Grid } from "@mantine/core";
import { useNavigate, Link } from "react-router-dom";
import {
  IconAtom,
  IconBinaryTree,
  IconRocket,
  IconUsers,
  IconRobotFace,
  IconBook2,
} from "@tabler/icons-react";
import CardItem from "./CardItem";
import classes from "./HomePage.module.css";
import CreateForm from "./CreateForm";

export const HomeContext = createContext();

function HomePage() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [searchSelection, setSearchSelection] = useState([]);

  useEffect(() => {
    if (searchValue == "" || searchValue == "AI") {
      setSearchSelection(context.AIs);
    }

    if (searchValue == "People") {
      setSearchSelection(context.people);
    }

    if (searchValue == "Spacecrafts") {
      setSearchSelection(context.spacecrafts);
    }

    if (searchValue == "Books") {
      setSearchSelection(context.books);
    }

    if (searchValue == "Concepts") {
      setSearchSelection(context.concepts);
    }
  });

  useEffect(() => {
    if (!context.user) {
      navigate("/login");
    }
  }, [context.user, navigate]);

  const myHeaders = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${context.authToken}`,
  });

  // fetch data
  useEffect(() => {
    fetch(context.host + "ais", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        context.setAIs(data);
      })
      .catch((error) => {
        console.error("Error fetching AIs:", error);
      });
  }, []);

  // fetch data
  useEffect(() => {
    fetch(context.host + "theories", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        context.setConcepts(data);
      })
      .catch((error) => {
        console.error("Error fetching AIs:", error);
      });
  }, []);

  // fetch data
  useEffect(() => {
    fetch(context.host + "books", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        context.setBooks(data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  // fetch data
  useEffect(() => {
    fetch(context.host + "people", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        context.setPeople(data);
      })
      .catch((error) => {
        console.error("Error fetching people:", error);
      });
  }, []);

  // fetch data
  useEffect(() => {
    fetch(context.host + "spacecrafts", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => response.json())
      .then((data) => {
        context.setSpacecrafts(data);
      })
      .catch((error) => {
        console.error("Error fetching spacecrafts:", error);
      });
  }, []);

  // real - not real button
  // filter by author
  return (
    <>
      <Box
        p={10}
        opacity={5}
        ta="center"
        mx="auto"
        maw={1000}
        bg="blue.5"
        my="xl"
      >
        <h3>
          {" "}
          Logged in with email {context.user ? context.user : "anonymous"}
        </h3>
        <Paper shadow="xl" p="xl">
          <Text>Hi stranger!</Text>
          <Text>
            Here´s a neat collection of kewl space related things I´m interested
            in. Expect a lot of SciFi writers, books, spacecrafts and physics
            concepts.
          </Text>
          <CreateForm />
        </Paper>

        <Group className={classes.topiclinks} justify="center">
          <Button
            component={Link}
            to="/mindmap"
            color="rgba(189, 25, 79, 1)"
            radius="xl"
            leftSection={<IconBinaryTree size={14} />}
          >
            Mindmap
          </Button>

          <Button
            component={Link}
            to="/people"
            leftSection={<IconUsers size={14} />}
            color="rgba(189, 25, 79, 1)"
            variant="filled"
            radius="xl"
          >
            People
          </Button>

          <Button
            component={Link}
            to="/books"
            leftSection={<IconBook2 size={14} />}
            color="rgba(189, 25, 79, 1)"
            variant="filled"
            radius="xl"
          >
            Books
          </Button>

          <Button
            component={Link}
            to="/ais"
            color="rgba(189, 25, 79, 1)"
            radius="xl"
            leftSection={<IconRobotFace size={14} />}
          >
            AI & Androids
          </Button>

          <Button
            component={Link}
            to="/spacecrafts"
            color="rgba(189, 25, 79, 1)"
            radius="xl"
            leftSection={<IconRocket size={14} />}
          >
            Spacecrafts
          </Button>

          <Button
            component={Link}
            to="/concepts"
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
        <Grid className={classes.cardgroup}>
          {searchSelection.length == 0 ? (
            <Text>LOADING......</Text>
          ) : (
            searchSelection.map((el, index) => (
              <Grid.Col key={index} span={4}>
                <CardItem key={index} subject={el} topic={searchValue} />
              </Grid.Col>
            ))
          )}
        </Grid>
      </Box>
    </>
  );
}

export default HomePage;
