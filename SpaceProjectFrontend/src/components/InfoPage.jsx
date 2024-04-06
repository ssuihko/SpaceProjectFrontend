import { Box, Text, Paper, Select, Group, Button } from "@mantine/core";
import PropTypes from "prop-types";

function InfoPage({ name, object }) {
  return (
    <Paper shadow="xl" p="xl">
      <Text>This page describes {name}!</Text>
      <Text>
        You have found the {name} info page. There are currently {object.length}{" "}
        {name}s in the system.
      </Text>
    </Paper>
  );
}

InfoPage.propTypes = {
  name: PropTypes.string,
  object: PropTypes.array,
};

export default InfoPage;
