import { Text, Paper, Table, Container } from "@mantine/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";

function InfoPage({ name, object }) {
  const context = useContext(AuthContext);

  const rows = object.map((element) => (
    <Table.Tr key={element.name}>
      <Table.Td>{element.name}</Table.Td>
      <Table.Td>{String(element.real)}</Table.Td>
      <Table.Td>
        <Link to={element.image}>Link</Link>
      </Table.Td>

      <Table.Td>
        {element.creatorId != null
          ? context.people.find((x) => x.id === element.creatorId).name
          : "-"}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container>
      <Paper shadow="xl" p="xl">
        <Text>This page describes {name}!</Text>
        <Text>
          You have found the {name} info page. There are currently{" "}
          {object.length} {name}s in the system.
        </Text>
      </Paper>
      <Paper style={{ marginTop: "10px" }}>
        <Table striped horizontalSpacing="sm" verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Real</Table.Th>
              <Table.Th>Image</Table.Th>
              {object.creatorId ?? <Table.Th>Creator</Table.Th>}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Container>
  );
}

InfoPage.propTypes = {
  name: PropTypes.string,
  object: PropTypes.array,
};

export default InfoPage;
