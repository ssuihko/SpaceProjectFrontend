import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../App";
import { Box, Text, Paper } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import InfoPage from "./InfoPage";

function HomePage() {
  const { user, authToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const [AIs, setAIs] = useState([]);
  const [people, setPeople] = useState([]);

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
        console.error("Error fetching posts:", error);
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
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
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
          Here's a neat collection of kewl space related things I'm interested
          about. Expect a lot of SciFi writers, books, spacecrafts and physics
          concepts.
        </Text>
        <Text>Click on a node to see more information.</Text>
      </Paper>
      {AIs.length == 0 ? (
        <p>LOADING......</p>
      ) : (
        AIs.map((ai, index) => (
          <div key={index}>
            <Paper shadow="xl" p="xl">
              <Text>{ai.name}</Text>
              <Text>{ai.description}</Text>
            </Paper>
          </div>
        ))
      )}
    </Box>
  );
}
export default HomePage;
