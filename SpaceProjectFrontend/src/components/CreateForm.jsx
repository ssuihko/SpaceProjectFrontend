import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Radio,
  Group,
  Button,
  NativeSelect,
  Select,
  TextInput,
  Box,
} from "@mantine/core";
import classes from "./CreateForm.module.css";
import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { useForm } from "@mantine/form";

function CreateForm() {
  const context = useContext(AuthContext);

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedForm, setSelectedForm] = useState("people");

  const [submittedValues, setSubmittedValues] = useState("");
  const [realVal, setRealVal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState("");

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      real: realVal,
      image: "",
      usernotes: "",
    },

    transformValues: (values) => ({
      name: `${values.name}`,
      description: values.description,
      real: Boolean(realVal),
      creatorId:
        selectedCreator != "None" && selectedCreator != ""
          ? context.people.find((x) => x.name == selectedCreator).id
          : null,
      image: values.image,
      usernotes: values.usernotes,
    }),
  });

  // API CALL HERE!!
  const onPostRequested = (values) => {
    if (selectedForm == "people") {
      delete values.creatorId;
      delete values.usernotes;
    }

    if (selectedForm == "theories") {
      delete values.creatorId;
    }

    const myHeaders = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${context.authToken}`,
    });

    const postOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(values, null, 2),
    };

    fetch(context.host + selectedForm, postOptions)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error(`Something went wrong! Status: ${res.status}`);
      })
      .then((newItem) => {
        console.log(newItem);
        if (selectedForm == "people")
          context.setPeople([...context.people, newItem]);
        if (selectedForm == "theories")
          context.setConcepts([...context.concepts, newItem]);
        if (selectedForm == "ais") context.setAIs([...context.AIs, newItem]);
        if (selectedForm == "books")
          context.setBooks([...context.books, newItem]);
        if (selectedForm == "spacecrafts")
          context.setSpacecrafts([...context.spacecrafts, newItem]);
      })
      .catch((err) => {
        console.log(err);
      });

    //login(payload.user, payload.authToken);

    form.reset();
  };

  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={close}
        title="Create New Entries to the System"
      >
        <Box maw={340} mx="auto">
          <NativeSelect
            onChange={(event) => setSelectedForm(event.currentTarget.value)}
            data={[
              { label: "Person", value: "people" },
              { label: "Book", value: "books" },
              { label: "AI or Android", value: "ais" },
              { label: "Spacecraft", value: "spacecrafts" },
              { label: "Concept", value: "theories" },
            ]}
          />
          <form onSubmit={form.onSubmit((values) => onPostRequested(values))}>
            <TextInput
              label="Name"
              placeholder="name"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Description"
              placeholder="description"
              mt="md"
              {...form.getInputProps("description")}
            />

            <Radio.Group
              name="Real"
              label="Is the entry real or fictional?"
              withAsterisk
            >
              <Group mt="xs">
                <Radio
                  value="1"
                  label="Real"
                  onChange={() => setRealVal(true)}
                />
                <Radio
                  value="0"
                  label="Fictional"
                  onChange={() => setRealVal(false)}
                />
              </Group>
            </Radio.Group>
            {!["theories", "people"].includes(selectedForm) && (
              <Select
                label="Existing creators"
                defaultValue={"None"}
                placeholder="Pick creator"
                data={[...context.people.map((x) => x.name), "None"]}
                onChange={(value) => setSelectedCreator(value)}
              />
            )}

            <TextInput
              label="Image"
              placeholder={"image"}
              mt="md"
              {...form.getInputProps("image")}
            />

            {selectedForm != "people" && (
              <TextInput
                label="usernotes"
                placeholder={"usernotes"}
                mt="md"
                {...form.getInputProps("usernotes")}
              />
            )}

            <Button type="submit" mt="md">
              Submit
            </Button>
          </form>
        </Box>
      </Drawer>

      <Button className={classes.drawerbutton} onClick={open}>
        Create New Entry
      </Button>
    </>
  );
}

export default CreateForm;
