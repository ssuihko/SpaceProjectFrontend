import { Text, Paper, Image, Divider, Stack, Button } from "@mantine/core";
import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../App";
import PropTypes from "prop-types";
import classes from "./TopicView.module.css";

function TopicView({ itemList }) {
  const { id } = useParams();

  const context = useContext(AuthContext);

  var item = itemList.find((x) => x.id == id);

  if (item.creatorId) {
    var creator = context.people.find((x) => x.id == item.creatorId);
  }

  return (
    <Paper shadow="xl" p="xl">
      <Stack
        className={classes.buttongroup}
        h={150}
        w={100}
        bg="var(--mantine-color-body)"
      >
        <Button
          className="delete-button"
          component={Link}
          to={"/"}
          color="red"
          fullWidth
          mt="md"
          radius="md"
        >
          Delete
        </Button>
        <Button
          className="update-button"
          color="yellow"
          fullWidth
          mt="md"
          radius="md"
        >
          Update
        </Button>
      </Stack>

      <Text size="xl" fw={700}>
        This page describes {item.name}
      </Text>
      <Image radius="md" h={200} w="auto" fit="contain" src={item.image} />
      <Divider my="sm" />
      <Text fw={700}>Description</Text>
      <Text>{item.description}</Text>
      {item.creatorId && (
        <div>
          <Divider my="sm" />
          <Text fw={700}>Creator</Text>
          <Text size="xl" fw={400}>
            {creator.name}
          </Text>
          <Image
            radius="md"
            h={200}
            w="auto"
            fit="contain"
            src={creator.image}
          />
          <Text>{creator.description}</Text>
        </div>
      )}
      <Divider my="sm" />
      <Text fw={700}>Personal Notes</Text>
      <Text>{item.usernotes}</Text>
    </Paper>
  );
}

TopicView.propTypes = {
  itemList: PropTypes.array,
};

export default TopicView;
