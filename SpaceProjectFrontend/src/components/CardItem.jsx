import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Spoiler,
} from "@mantine/core";
import PropTypes from "prop-types";
import classes from "./CardItem.module.css";
import { useEffect, useState } from "react";

// perhaps add images to books as well...

function CardItem({ subject }) {
  // change db to contain reality state for people as well
  return (
    <Card height={40} shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section component="a" href="https://mantine.dev/">
        <Image
          className={classes.imagesettings}
          fit="contain"
          src={subject.image}
          fallbackSrc="https://placehold.co/600x400?text=Placeholder"
          height={160}
          alt="img-here"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>
          {subject.name == undefined ? subject.title : subject.name}
        </Text>
        <Badge color="pink">{subject.real ? "real" : "fictional"}</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        <Spoiler
          maxHeight={60}
          showLabel="Show more"
          hideLabel="Hide"
          transitionDuration={0}
        >
          {subject.description == undefined
            ? subject.profile
            : subject.description}
        </Spoiler>
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        View Info
      </Button>
    </Card>
  );
}

CardItem.propTypes = {
  subject: PropTypes.object,
};

export default CardItem;
