import { Box, Text, Paper, Select, Group, Button } from "@mantine/core";
import PropTypes from "prop-types";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AuthContext } from "../App";
import ReactFlow, {
  Controls,
  Panel,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";

function MindMap() {
  const context = useContext(AuthContext);

  const nodeStart = [
    {
      id: "1",
      position: { x: 0, y: 0 },
      data: { label: "Hello" },
      type: "input",
    },
    {
      id: "2",
      position: { x: 100, y: 100 },
      data: { label: "World" },
    },
  ];

  const initialEdges = [];

  const [nodes, setNodes] = useState(nodeStart);
  const [edges, setEdges] = useState(initialEdges);

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

  return (
    <Paper shadow="xl" p="xl">
      <Text>
        Mindmapping fun!
        <Box>
          <div style={{ height: 450 }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
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
  );
}

export default MindMap;
