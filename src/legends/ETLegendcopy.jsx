import { useState, Fragment } from "react";
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
  Center,
} from "@chakra-ui/react";

import { InfoOutlineIcon } from "@chakra-ui/icons";

import opacityIcon from "../assets/contrast-01.png";

function ETLegend({ setLayerOpacity }) {
  const numbers = Array.from({ length: 10 }, (_, i) => i);
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
        <Text fontSize={16}>Evapotranspiration</Text>
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
              onChange={(v) => handleOpacityChange("evapotranspiration", v)}
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
      <Text fontWeight={400} fontSize={10} ml={4} mb={1}>Evapotranspiration in mm/day:</Text>
      <Flex alignItems={"center"}>
        <Spacer />
        <Box
          bg="#e0eaff"
          w={8}
          h={3}
          borderTopLeftRadius="md"
          borderBottomLeftRadius="md"
        />
        <Box bg="#c7d7fe" w={8} h={3} />
        <Box bg="#a4bcfd" w={8} h={3} />
        <Box bg="#8098f9" w={8} h={3} />
        <Box bg="#6172f3" w={8} h={3} />
        <Box bg="#444ce7" w={8} h={3} />
        <Box bg="#3538cd" w={8} h={3} />
        <Box bg="#2d31a6" w={8} h={3} />
        <Box bg="#2d2382" w={8} h={3} />
        <Box
          bg="#1f235b"
          w={8}
          h={3}
          borderTopRightRadius="md"
          borderBottomRightRadius="md"
        />
        <Spacer />
      </Flex>
      <Flex alignItems={"center"}>
        <Spacer />
        {numbers.map((number, index) => (
          <Fragment key={number}>
            <Text fontWeight={400} fontSize={10}>
              {number}
            </Text>
            {index < numbers.length - 1 && <Spacer />}
          </Fragment>
        ))}
        <Spacer />
      </Flex>
    </Box>
  );
}

export default ETLegend;
