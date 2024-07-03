import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Analytics } from "@vercel/analytics/react"
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Analytics/>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
