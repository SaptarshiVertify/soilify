import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Flex,
  Spacer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  Switch,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  VStack,
  useDisclosure,
  Divider,
} from "@chakra-ui/react";
import HoverImage from "./HoverImage";
import satellite from "../assets/satelitte.jpg";
import hillshade_image from "../assets/hillshade_image.png";

function Stacking({
  switchState,
  setSwitchState,
  setBasemap,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function handleBasemapChange(str) {
    setBasemap(str);
    onClose();
  }

  const handleSwitchChange = (e) => {
    const { id, checked } = e.target;
    setSwitchState((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const sections = {
    "SOC layers": ["soil organic carbon map"],
    "Crop layers": [
      "crop type kharif",
      "crop type rabi",
      "cover crop",
      "crop health",
    ],

    "Thematic layers": ["evapotranspiration", "lulc"],
    // Add more sections and layers as needed
  };

  const toSentenceCase = (str) => {
    return str
      .toLowerCase()
      .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
  };

  return (
    <>
      {/* Header info block */}
      <Box
        mb={1}
        w={"100%"}
        p={2}
        borderRadius={8}
        bg={"#FFFFFF"}
        boxShadow={"0px 2px 3px rgba(16, 24, 40, 0.10)"}
      >
        <Text fontSize={18} fontWeight={700} wordwrap={"break-word"} mb={2}>
          Soil and Crop Monitor
        </Text>
        <Text fontSize={14} fontWeight={400}>
          District: Medak | State: Telengana
        </Text>
      </Box>

        {/* Basemap */}
        <Flex alignItems={"center"}>
          <Popover
            placement="right-start"
            onClose={onClose}
            isOpen={isOpen}
            onOpen={onOpen}
          >
            <PopoverTrigger>
              <Flex
                role="button"
                w={"fit-content"}
                p={1}
                bg="blue.500"
                alignItems={"center"}
                borderRadius={3}
                onClick={isOpen ? onClose : onOpen}
              >
                <Text fontSize={"xs"} fontWeight={300} color={"white"}>
                  Basemap
                </Text>
              </Flex>
            </PopoverTrigger>
            <PopoverContent bg="whitesmoke" color="black.500" w={"100%"}>
              <PopoverBody>
                <VStack>
                  <Box
                    as="button"
                    onClick={() => handleBasemapChange("mapbox-terrain")}
                  >
                    <HoverImage
                      src={hillshade_image}
                      alt="Hillshade"
                      h={"15vh"}
                      w={"20vh"}
                    />
                  </Box>
                  <Text
                    fontSize={8}
                    fontWeight={500}
                    alignSelf={"center"}
                    p={0}
                  >
                    Hillshade
                  </Text>
                  <Divider />
                  <Box
                    as="button"
                    onClick={() => handleBasemapChange("satellite")}
                  >
                    <HoverImage
                      src={satellite}
                      alt="Satellite Image"
                      h={"15vh"}
                      w={"20vh"}
                    />
                  </Box>
                  <Text
                    fontSize={8}
                    fontWeight={500}
                    alignSelf={"center"}
                    p={0}
                  >
                    Satellite
                  </Text>
                </VStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </Flex>
        {/* Layers start */}
        <Heading size={"md"} left={0} m={1}>
          Layers:
        </Heading>
        {/* Accordions */}
        <Accordion allowMultiple w={"100%"}>
          {Object.entries(sections).map(([section, layers]) => (
            <AccordionItem key={section} mb={2}>
              <AccordionButton
                bg={"white"}
                borderBottom={"1px #98A2B3 solid"}
                borderTopRadius={8}
                _hover={{ bg: "white" }}
                _expanded={{ borderBottom: 0 }}
              >
                <Text w={"100%"} align={"left"}>
                  {section}
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4} bg={"white"}>
                {layers.map((layer) => (
                  <Flex key={layer} alignItems={"center"} mb={2}>
                    <Text fontSize={"small"}>{toSentenceCase(layer)}</Text>
                    <Spacer />
                    <Switch
                      id={layer}
                      size={"sm"}
                      isChecked={switchState[layer]}
                      onChange={handleSwitchChange}
                    />
                  </Flex>
                ))}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
        
        
    </>
  );
}

export default Stacking;
