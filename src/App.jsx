import { useState } from "react";

import Stacking from "./components/Stacking";
import Analysis from "./components/Analysis";
import MapComponent from "./components/MapComponent";
import Styling from "./components/Styling";

import vertifyLogo from "./assets/Vertify_Logo_RGB.png";
import soilifyLogo from "./assets/Soilify-Logo.png";

import { FiBarChart2 } from "react-icons/fi";
import { PiStackLight } from "react-icons/pi";
import { FaGithub } from "react-icons/fa";

import {
  Grid,
  GridItem,
  Box,
  Divider,
  Text,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  useDisclosure,
  Spacer,
  Icon,
  Image,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import { HiRefresh } from "react-icons/hi";

function App() {
  // State to control Stacking/Analysis tab
  const [selectedComponent, setSelectedComponent] = useState("Stacking");

  // State to control basemap style
  const [basemap, setBasemap] = useState("satellite");

  // State to control disabling buttons during analysis
  const [isDisabled, setIsDisabled] = useState(false);

  // State to control if Stacking/Analysis tab is open
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State to control cursor coordinates
  const [cursorCoordinates, setCursorCoordinates] = useState({ lng: 0, lat: 0 });

  // State to control switch states
  const [switchState, setSwitchState] = useState({
    // Crop layers
    "crop type kharif": false,
    "crop type rabi": false,
    "cover crop": false,
    "crop health": false,
    // SOC layers
    "soil organic carbon map": true,
    // Miscellaneous
    lulc: false,
    evapotranspiration: false,
  });

  // State to control opacities of layers
  const [layerOpacity, setLayerOpacity] = useState({
    // Crop layers
    "crop type kharif": 0.75,
    "crop type rabi": 0.75,
    "cover crop": 0.75,
    "crop health": 0.75,
    // SOC layers
    "soc change": 0.75,
    "soc 22": 0.75,
    "soc 23": 0.75,
    // Miscellaneous
    lulc: 0.75,
    evapotranspiration: 0.75,
  });

  // State to control SOC visualization
  const [socVis, setSocVis] = useState("soc 23");

  // State to control drawing
  const [drawing, setDrawing] = useState("no");

  // State to control drawn polygon and rendered soc map for graph component
  const [graph, setGraph] = useState(null);

  // Function to change and open/close Stacking/Analysis tab
  const handleComponentClick = (component) => {
    if (selectedComponent === component && isOpen) {
      onClose();
    } else {
      setSelectedComponent(component);
      if (!isOpen) {
        onOpen();
      }
    }
    if (selectedComponent == "Stacking") {
      setDrawing("no");
    }
  };

  // Function to toggle disability
  const toggleDisability = () => {
    setIsDisabled((prev) => !prev);
    if (drawing == "ready to analyse") {
      setDrawing("no");
    }
  };

  return (
    <>
      {/* Grid template */}
      <Grid
        templateAreas={`"nav main"`}
        gridTemplateColumns={"4% 96%"}
        gridTemplateRows={"100%"}
        h="100vh"
        gap="0"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        {/* Sidebar item */}
        <GridItem p="2" bg="#D0D5DD" area={"nav"}>
          <VStack spacing={5} h={"100%"}>
            <Popover
              returnFocusOnClose={false}
              isOpen={isOpen}
              onClose={onClose}
              placement="right"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                {/* Website logo */}
                <Box w="90%">
                  <Link href="https://soilify.earth/" isExternal>
                    <Image src={soilifyLogo} alt="Vertify" />
                  </Link>
                </Box>
              </PopoverTrigger>
              <VStack spacing={2}>
                {/* Stacking display button */}
                <VStack spacing={0}>
                  <Box
                    onClick={() =>
                      !isDisabled && handleComponentClick("Stacking")
                    }
                    style={{
                      pointerEvents: isDisabled ? "none" : "auto",
                      opacity: isDisabled ? 0.5 : 1,
                    }}
                  >
                    <PiStackLight
                      size={"1.5em"}
                      color={
                        selectedComponent === "Stacking" && isOpen
                          ? "blue"
                          : "black"
                      }
                    />
                  </Box>
                  <Text
                    fontSize={8}
                    fontWeight={90}
                    color={
                      selectedComponent === "Stacking" && isOpen
                        ? "blue"
                        : "black"
                    }
                  >
                    Stacking
                  </Text>
                </VStack>

                {/* Analysis display button */}
                <VStack spacing={0}>
                  <Box
                    onClick={() =>
                      !isDisabled && handleComponentClick("Analysis")
                    }
                    style={{
                      pointerEvents: isDisabled ? "none" : "auto",
                      opacity: isDisabled ? 0.5 : 1,
                    }}
                  >
                    <FiBarChart2
                      size={"1.5em"}
                      color={
                        selectedComponent === "Analysis" && isOpen
                          ? "#0C6EE4"
                          : "black"
                      }
                    />
                  </Box>
                  <Text
                    fontSize={8}
                    fontWeight={90}
                    color={
                      selectedComponent === "Analysis" && isOpen
                        ? "#0C6EE4"
                        : "black"
                    }
                  >
                    Analysing
                  </Text>
                </VStack>
                <PopoverContent
                  border={0}
                  overflow={"auto"}
                  borderRadius={0}
                  bg={"#EAECF0"}
                >
                  {/* Tabs */}
                  <PopoverBody h={"100vh"} p={1}>
                    {selectedComponent === "Stacking" ? (
                      // Stacking tab
                      <Stacking
                        switchState={switchState}
                        setSwitchState={setSwitchState}
                        setBasemap={setBasemap}
                        cursorCoordinates={cursorCoordinates}
                      />
                    ) : (
                      // Analysis tab
                      <Analysis
                        toggleDisability={toggleDisability}
                        isDisabled={isDisabled}
                        drawing={drawing}
                        setDrawing={setDrawing}
                        switchState={switchState}
                        graph={graph}
                        cursorCoordinates={cursorCoordinates}
                      />
                    )}
                  </PopoverBody>
                </PopoverContent>
              </VStack>
            </Popover>

            {/* Extras and links*/}
            <Spacer />
            <VStack>
              <Box w="90%" alignItems={"center"}>
                <Link href="https://vertify.earth/" isExternal>
                  <Image src={vertifyLogo} alt="Vertify" />
                </Link>
              </Box>
              <Box w="90%" alignItems={"center"}>
                <Link
                  href="https://github.com/vertify-earth/Soilify"
                  isExternal
                >
                  <FaGithub size={"90%"}/>
                </Link>
              </Box>
            </VStack>
          </VStack>
        </GridItem>

        {/* Main section */}
        <GridItem bg="green.300" area={"main"}>
          {/* Styling tab */}
          <Box
            bottom={6}
            right={2}
            position={"absolute"}
            zIndex={1}
            maxH={"35vh"}
            w={"30%"}
            overflowY={"auto"}
            borderRadius={5}
          >
            <Styling
              drawing={drawing}
              switchState={switchState}
              setLayerOpacity={setLayerOpacity}
              setSocVis={setSocVis}
            />
          </Box>
          {/* Map */}
          <MapComponent
            position={"absolute"}
            switchState={switchState}
            isDisabled={isDisabled}
            selectedComponent={selectedComponent}
            drawing={drawing}
            setDrawing={setDrawing}
            layerOpacity={layerOpacity}
            basemap={basemap}
            socVis={socVis}
            setGraph={setGraph}
            setCursorCoordinates={setCursorCoordinates}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
