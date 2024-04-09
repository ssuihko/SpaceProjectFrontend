import {
  Box,
  Text,
  Paper,
  Button,
  Input,
  InputBase,
  Container,
  Grid,
  Combobox,
  useCombobox,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import { useContext, useState, useCallback } from "react";
import { AuthContext } from "../App";
import ReactFlow, {
  Controls,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./CustomNode";
import classes from "./Mindmap.module.css";
import cx from "clsx";

const nodeTypes = { custom: CustomNode };
// const nodeTypes = { textUpdater: TextUpdaterNode };

function MindMap() {
  const context = useContext(AuthContext);

  const [value, setValue] = useState(null);
  const [search, setSearch] = useState("");
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onNodeRemove = (elementsToRemove) => {
    setNodes([...nodes.filter((x) => x != elementsToRemove)]);
  };

  const combobox = useCombobox({
    onDropdownClose: () => {
      combobox.resetSelectedOption();
      combobox.focusTarget();
      setSearch("");
    },

    onDropdownOpen: () => {
      combobox.focusSearchInput();
    },
  });

  const getType = (item) => {
    if (context.people.includes(item)) return "people";
    if (context.books.includes(item)) return "books";
    if (context.spacecrafts.includes(item)) return "spacecrafts";
    if (context.people.includes(item)) return "people";
    if (context.concepts.includes(item)) return "concepts";
    if (context.AIs.includes(item)) return "ais";
  };

  const theme = createTheme({
    components: {
      Container: Container.extend({
        classNames: (_, { size }) => ({
          root: cx({ [classes.responsiveContainer]: size === "responsive" }),
        }),
      }),
    },
  });

  const addNode = (val) => {
    var allItems = [
      ...context.people,
      ...context.AIs,
      ...context.spacecrafts,
      ...context.books,
      ...context.concepts,
    ];

    var item = allItems.find((x) => x.name == val);

    var linkType = getType(item);

    var newNode = {
      id: item.id,
      type: "custom",
      height: 40,
      width: 150,
      position: { x: 1, y: 1 },
      data: {
        label: item.name,
        image: item.image,
        id: item.id,
        linktype: linkType,
        onNodeRemove: onNodeRemove,
      },
    };

    if (nodes.map((x) => x.id).includes(item.id) == false) {
      setNodes([...nodes, newNode]);
    } else {
      context.showNotification();
    }
  };

  return (
    <MantineProvider theme={theme}>
      <Container>
        <Paper shadow="xl" p="xl">
          <Grid>
            <Grid.Col span={9}>
              <Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                  setValue(val);
                  combobox.closeDropdown();
                }}
              >
                <Combobox.Target>
                  <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    rightSectionPointerEvents="none"
                    onClick={() => combobox.toggleDropdown()}
                  >
                    {value || <Input.Placeholder>Pick value</Input.Placeholder>}
                  </InputBase>
                </Combobox.Target>

                <Combobox.Dropdown mah={300} style={{ overflowY: "auto" }}>
                  <Combobox.Search
                    value={search}
                    onChange={(event) => setSearch(event.currentTarget.value)}
                    placeholder="Search entries"
                  />
                  <Combobox.Options>
                    <Combobox.Group label="People">
                      {context.people.map((x, ind) => (
                        <Combobox.Option key={ind} value={x.name}>
                          {x.name}
                        </Combobox.Option>
                      ))}
                    </Combobox.Group>
                    <Combobox.Group label="Books">
                      {context.books.map((x, ind) => (
                        <Combobox.Option key={ind} value={x.name}>
                          {x.name}
                        </Combobox.Option>
                      ))}
                    </Combobox.Group>
                    <Combobox.Group label="Spacecrafts">
                      {context.spacecrafts.map((x, ind) => (
                        <Combobox.Option key={ind} value={x.name}>
                          {x.name}
                        </Combobox.Option>
                      ))}
                    </Combobox.Group>
                  </Combobox.Options>
                  <Combobox.Group label="Concepts">
                    {context.concepts.map((x, ind) => (
                      <Combobox.Option key={ind} value={x.name}>
                        {x.name}
                      </Combobox.Option>
                    ))}
                  </Combobox.Group>
                  <Combobox.Group label="AIs">
                    {context.AIs.map((x, ind) => (
                      <Combobox.Option key={ind} value={x.name}>
                        {x.name}
                      </Combobox.Option>
                    ))}
                  </Combobox.Group>
                </Combobox.Dropdown>
              </Combobox>
            </Grid.Col>
            <Grid.Col span={3}>
              <Button color="green" onClick={() => addNode(value)}>
                Add Node
              </Button>
            </Grid.Col>
          </Grid>
          <Text>
            <Box>
              <div style={{ height: 450 }}>
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  nodeTypes={nodeTypes}
                  onConnect={onConnect}
                  fitView
                >
                  <Controls showInteractive={false} />
                  <Panel position="top-left">React Flow Mind Map</Panel>
                </ReactFlow>
              </div>
            </Box>
          </Text>
        </Paper>
      </Container>
    </MantineProvider>
  );
}

export default MindMap;
