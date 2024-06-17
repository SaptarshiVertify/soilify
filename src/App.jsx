import { useState } from "react";

import Stacking from "./components/Stacking";
import Analysis from "./components/Analysis";
import MapComponent from "./components/MapComponent";
import Styling from "./components/Styling";

import logo from "./assets/Logo.png";

import { FiBarChart2 } from "react-icons/fi";
import { PiStackLight } from "react-icons/pi";
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
} from "@chakra-ui/react";
import { color } from "framer-motion";

function App() {

  // State to control Stacking/Analysis tab
  const [selectedComponent, setSelectedComponent] = useState("Stacking");

  // State to control basemap style
  const [basemap, setBasemap] = useState("satellite");

  // State to control disabling buttons during analysis
  const [isDisabled, setIsDisabled] = useState(false);

  // State to control if Stacking/Analysis tab is open
  const { isOpen, onOpen, onClose } = useDisclosure();

  // State to control switch states
  const [switchState, setSwitchState] = useState({
    // Crop layers
    "crop type kharif": false,
    "crop type rabi": false,
    "cover crop": false,
    "crop health": false,
    // SOC layers
    "soc change": false,
    "soc 22": false,
    "soc 23": false,
    // Flood layers
    "flood risk": false,
    "flood map": false,
    "stream order": false,
    // Miscellaneous
    "lulc": false,
    "evapotranspiration":false
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
    // Flood layers
    "flood risk": 0.75,
    "flood map": 0.75,
    "stream order": 0.75,
    // Miscellaneous
    "lulc": 0.75,
    "evapotranspiration":0.75
  });

  // State to control SOC visualization
  const [socVis,setSocVis] = useState("soc 23");

  // State to control drawing
  const [drawing, setDrawing] = useState("no");

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
                <Image src={logo} alt="Vertify" />
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
                  <PopoverBody h={"100vh"}>
                    
                    {selectedComponent === "Stacking" ? (
                      // Stacking tab 
                      <Stacking
                        switchState={switchState}
                        setSwitchState={setSwitchState}
                        setBasemap={setBasemap}
                      />
                    ) : (
                      // Analysis tab
                      <Analysis
                        toggleDisability={toggleDisability}
                        isDisabled={isDisabled}
                        drawing={drawing}
                        setDrawing={setDrawing}
                      />
                    )}
                  </PopoverBody>
                </PopoverContent>
              </VStack>
            </Popover>

            {/* Extras and links*/}
            <Spacer />
            <VStack>
              <Box w="20%" bg="blue" p={4}></Box>{" "}
              {/* Github link will be here */}
              <Box w="20%" bg="blue" p={4}></Box>{" "}
              {/* EAI website link will be here */}
              <Box w="20%" bg="blue" p={4}></Box>{" "}
              {/* Soilify i.e project website link will be here */}
            </VStack>
          </VStack>
        </GridItem>

        {/* Main section */}
        <GridItem bg="green.300" area={"main"}>
          {/* Styling tab */}
          <Box
            bottom={2}
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
          />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
