import { useState } from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Button,
  Flex,
  Spacer,
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
  Icon,
  Image,
  Divider,
  Select,
} from "@chakra-ui/react";

import { InfoOutlineIcon } from "@chakra-ui/icons";

import opacityIcon from "../assets/contrast-01.png";

function SocLegend({ setLayerOpacity, setSocVis }) {
  // States to control slider value and tooltup label
  const [sliderValue, setSliderValue] = useState(75);
  const [showTooltip, setShowTooltip] = useState(false);
  // State to assign visibility of opacity slider section
  const [isOpen, setOpen] = useState(false);
  // State to control selected visualisation
  const [selectedVis, setSelectedVis] = useState("soc 23");

  // Function to open and close the opacity slider section
  function handleOpacitySection() {
    setOpen((prev) => !prev);
  }
  // Function to handle opacity change
  function handleOpacityChange(key, v) {
    setSliderValue(v);
    setLayerOpacity((prevState) => ({
      ...prevState,
      [key]: v / 100,
    }));
  }
  // Function to handle selected SOC visualisation change
  const handleSocChange = (event) => {
    const selectedValue = event.target.value;
    setSocVis(selectedValue);
    setSelectedVis(selectedValue);
  };
  console.log(selectedVis);
  return (
    <Box
    bg="white"
    borderRadius={5}
    p={1}
    boxShadow="0 4px 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)"
    mb={0.5}>
      {/* Legend header */}
      <Flex alignItems="center" w={"100%"}>
        <Text fontSize={15}>Soil Organic Carbon</Text>
        <Spacer />
        <Image
          src={opacityIcon}
          h={4}
          onClick={handleOpacitySection}
          alt="Opacity"
        />
        {/* Opacity section */}
        <Box
          w={isOpen ? "40%" : "0%"}
          visibility={isOpen ? "visible" : "hidden"}
          transition={"ease 0.2s"}
          overflow={"hidden"}
          m={1}
          // p={1}
        >
          <Flex alignItems={"center"}>
            <Slider
              m={2}
              id="slider"
              defaultValue={75}
              min={0}
              max={100}
              colorScheme="blue"
              onChange={(v) =>
                handleOpacityChange("soil organic carbon map", v)
              }
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              size={"md"}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <Tooltip
                hasArrow
                bg="blue.500"
                color="white"
                placement="top"
                isOpen={showTooltip}
                label={`${sliderValue}%`}
              >
                <SliderThumb bg={"whitesmoke"} />
              </Tooltip>
            </Slider>
          </Flex>
        </Box>
        {/* Info section */}
        <InfoOutlineIcon />
      </Flex>
      {/* Visualization options */}
      <Flex alignItems={"center"} m={1}>
        <Text fontWeight={300}>Visualize:</Text>
        <Spacer />
        <Select
          size={"xs"}
          w={"70%"}
          onChange={handleSocChange}
          borderRadius={5}
          fontWeight={500}
        >
          <option value="soc 23">SOC amount in 2023</option>
          <option value="soc 22">SOC amount in 2022</option>
          <option value="soc change">SOC Change from 2022 to 2023</option>
        </Select>
      </Flex>
      {/* Legends section */}
      <Box p={1}>
        <Text fontSize={10} fontWeight={450} mt={2}>
          SOC amount (ton/ha):
        </Text>
        {/* SOC 22 and SOC 2023 gradient */}
        <Box
          w="100%"
          p={2}
          display={selectedVis != "soc change" ? "block" : "none"}
        >
          <Box
            h={"1vh"}
            borderRadius={5}
            bg="linear-gradient(to right, #f04438, #fec84b, #17b26a)"
            mb={2}
          />
          <Flex justify="space-between">
            <Text fontSize={10} fontWeight={450}>
              9
            </Text>
            <Text fontSize={10} fontWeight={450}>
              10.25
            </Text>
            <Text fontSize={10} fontWeight={450}>
              11.5
            </Text>
            <Text fontSize={10} fontWeight={450}>
              13.25
            </Text>
            <Text fontSize={10} fontWeight={450}>
              15
            </Text>
          </Flex>
        </Box>
        {/* SOC change gradient */}
        <Box
          w="100%"
          p={2}
          display={selectedVis == "soc change" ? "block" : "none"}
        >
          <Box
            h={"1vh"}
            borderRadius={5}
            bg="linear-gradient(to right, #DF4A4A, #F1F0DE, #3F8B85)"
            mb={2}
          />
          <Flex justify="space-between">
            <Text fontSize={10} fontWeight={450}>
              -1
            </Text>
            <Text fontSize={10} fontWeight={450}>
              -0.5
            </Text>
            <Text fontSize={10} fontWeight={450}>
              0
            </Text>
            <Text fontSize={10} fontWeight={450}>
              0.75
            </Text>
            <Text fontSize={10} fontWeight={450}>
              1.5
            </Text>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default SocLegend;
