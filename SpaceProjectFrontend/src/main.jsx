import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ReactFlowProvider } from "reactflow";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <MantineProvider defaultColorScheme="light">
        <BrowserRouter>
          <Notifications />
          <App />
        </BrowserRouter>
      </MantineProvider>
    </ReactFlowProvider>
  </React.StrictMode>
);
