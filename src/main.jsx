import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Analytics } from "@vercel/analytics/react";
import { ChakraProvider, Box, Center, Text } from "@chakra-ui/react";
import { isDesktopOrLaptop } from "./utils/deviceCheck";

const isCompatible = isDesktopOrLaptop();

const CompatibilityMessage = () => (
  <Center h="100vh" bg={"maroon"}>
    <Box textAlign="center" p={5} borderWidth={1} borderRadius="lg">
      <Text fontSize="2xl" color={"white"}>Please use a desktop or laptop to access this application.</Text>
    </Box>
  </Center>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Analytics />
      {isCompatible ? <App /> : <CompatibilityMessage />}
    </ChakraProvider>
  </React.StrictMode>
);
