import {
  Text,
  Paper,
  Image,
  Divider,
  Radio,
  Group,
  Stack,
  Button,
  Select,
  TextInput,
  Textarea,
  Modal,
} from "@mantine/core";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import PropTypes from "prop-types";
import classes from "./TopicView.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

function TopicView({ path, setItemList, itemList }) {
  const { id } = useParams();
  var item = itemList.find((x) => x.id == id);
  const context = useContext(AuthContext);

  if (item.creatorId) {
    var creator = context.people.find((x) => x.id == item.creatorId);
  }

  const [opened, { open, close }] = useDisclosure(false);
  const [checked, setChecked] = useState(item.real); // 1
  const [selectedCreator, setSelectedCreator] = useState(
    creator ? creator.name : ""
  );
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      name: `${item.name}`,
      description: `${item.description}`,
      real: checked,
      image: `${item.image}`,
      usernotes: `${item.usernotes}`,
    },

    transformValues: (values) => ({
      name: `${values.name}`,
      description: values.description,
      real: Boolean(checked),
      creatorId:
        selectedCreator != "None" && selectedCreator != ""
          ? context.people.find((x) => x.name == selectedCreator).id
          : null,
      image: values.image,
      usernotes: values.usernotes,
    }),
  });

  const deleteItem = (obj) => {
    var DEL_URL =
      context.host + `${path[0]}` + "/" + item.id + `?${path[1]}=${obj.id}`;

    const myHeaders = new Headers({
      Authorization: `Bearer ${context.authToken}`,
    });

    const deleteOptions = {
      method: "DELETE",
      headers: myHeaders,
      url: DEL_URL,
    };

    let updatedList = context.books.filter((item) => {
      if (item.id != obj.id) return item;
    });

    fetch(DEL_URL, deleteOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong!");
      })
      .then(() => {
        setItemList([...updatedList]);
      })
      .catch((err) => {
        console.log("error occured: ", err);
      });

    navigate("/");
  };

  const updateItem = (values) => {
    var UPDATE_URL =
      context.host + `${path[0]}` + "/" + item.id + `?${path[1]}=${item.id}`;

    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.authToken}`,
    });

    const updateOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(values, null, 2),
    };

    let updatedList = itemList.map((item) => {
      if (parseInt(item.id) === parseInt(values.id)) {
        return { ...item, ...values };
      }
      return item;
    });

    fetch(UPDATE_URL, updateOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong!");
      })
      .then(() => {
        // this should actually do a whole re-fetch...
        setItemList([...updatedList]);
      })
      .catch((err) => {
        console.log("error occured: ", err);
      });
  };

  return (
    <Paper shadow="xl" p="xl">
      <Modal opened={opened} onClose={close} title="Update Item">
        <form onSubmit={form.onSubmit((value) => updateItem(value))}>
          <TextInput
            label="Name"
            value={item.name}
            {...form.getInputProps("name")}
          />
          <Radio.Group
            value={checked}
            onChange={setChecked}
            name="Real"
            label="Real or fictional?"
          >
            <Group mt="xs">
              <Radio value={true} label="Real" />
              <Radio value={false} label="Fictional" />
            </Group>
          </Radio.Group>
          <Textarea
            label="Description"
            autosize
            minRows={3}
            {...form.getInputProps("description")}
            value={item.description}
          />
          <TextInput
            label="Image"
            value={item.image}
            {...form.getInputProps("image")}
          />
          {!["theories", "people"].includes(path[0]) && (
            <Select
              label="Existing creators"
              defaultValue={creator == null ? "" : creator.name}
              placeholder="Pick creator"
              data={[...context.people.map((x) => x.name), "None"]}
              onChange={(value) => setSelectedCreator(value)}
            />
          )}
          <Button color="orange" type="submit" mt="md">
            Submit
          </Button>
        </form>
      </Modal>
      <Stack
        className={classes.buttongroup}
        h={150}
        w={100}
        bg="var(--mantine-color-body)"
      >
        <Button
          className="delete-button"
          component={Link}
          to="/"
          onClick={(e) => {
            e.preventDefault();
            deleteItem(item);
          }}
          color="red"
          fullWidth
          mt="md"
          radius="md"
        >
          Delete
        </Button>
        <Button onClick={open}>Update</Button>
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
  path: PropTypes.array,
  setItemList: PropTypes.func,
  itemList: PropTypes.array,
};

export default TopicView;
