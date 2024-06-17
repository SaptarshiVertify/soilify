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
  Square,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";

import { InfoOutlineIcon } from "@chakra-ui/icons";

import opacityIcon from "../assets/contrast-01.png";

function CropHealthLegend({ setLayerOpacity }) {
  // States to control slider value and tooltup label
  const [sliderValue, setSliderValue] = useState(75);
  const [showTooltip, setShowTooltip] = useState(false);
  // State to assign visibility of opacity slider section
  const [isOpen, setOpen] = useState(false);

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
  return (
    <Box
      bg="white"
      borderRadius={5}
      p={1}
      boxShadow="0 4px 4px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.1)"
      mb={0.5}
    >
      <Flex alignItems="center" w={"100%"}>
        <Text fontSize={16}>Crop Health</Text>
        <Spacer />
        <Image
          src={opacityIcon}
          h={4}
          onClick={handleOpacitySection}
          alt="Opacity"
        />
        <Box
          w={isOpen ? "40%" : "0%"}
          visibility={isOpen ? "visible" : "hidden"}
          transition={"ease 0.2s"}
          overflow={"hidden"}
          m={1}
          p={1}
        >
          <Flex alignItems={"center"}>
            <Slider
              m={2}
              id="slider"
              defaultValue={75}
              min={0}
              max={100}
              colorScheme="blue"
              onChange={(v) => handleOpacityChange("crop health", v)}
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
        <InfoOutlineIcon />
      </Flex>
      <Wrap alignItems={"center"}>
        <WrapItem>
          <Square bg="#d92d20" size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400} ml={2}>
            Poor Health
          </Text>
        </WrapItem>
        <WrapItem>
          <Square bg="#acdc79" size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400} ml={2}>
            Medium Health
          </Text>
        </WrapItem>
        <WrapItem>
          <Square bg="#085d3a" size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400} ml={2}>
            Good Health
          </Text>
        </WrapItem>
        <WrapItem>
          <Square bg="#fedf89" size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400} ml={2}>
            No crop/bareland
          </Text>
        </WrapItem>
      </Wrap>
    </Box>
  );
}

export default CropHealthLegend;
