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

function LulcLegend({ setLayerOpacity }) {
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
        <Text fontSize={16}>Land Use/Land Cover</Text>
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
              onChange={(v) => handleOpacityChange("lulc", v)}
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
            Built-up
          </Text>
        </WrapItem>
        <WrapItem>
          <Square bg="#acdc79" size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400} ml={2}>
            Bare/Sparse vegetation
          </Text>
        </WrapItem>
        <WrapItem>
          <Square bg="#75e0a7" size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400} ml={2}>
            Cropland
          </Text>
        </WrapItem>
        <WrapItem>
          <Square bg="#fedf89" size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400} ml={2}>
            Grassland
          </Text>
        </WrapItem>
        <WrapItem>
          <Square bg="#669f2a" size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400} ml={2}>
            Shrubland
          </Text>
        </WrapItem>
        <WrapItem>
          <Square bg="#0b7f50" size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400} ml={2}>
            Tree cover
          </Text>
        </WrapItem>
        <WrapItem>
          <Square bg="#7cd4fd" size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400} ml={2}>
            Wetland
          </Text>
        </WrapItem>
        <WrapItem>
          <Square bg="#444ce7" size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400} ml={2}>
            Permanent water bodies
          </Text>
        </WrapItem>
      </Wrap>
    </Box>
  );
}

export default LulcLegend;
