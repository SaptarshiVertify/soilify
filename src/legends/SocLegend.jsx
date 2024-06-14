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
  };
  return (
    <>
      <Flex alignItems="center" w={"100%"}>
        <Text fontSize={16}>Soil Organic Carbon</Text>
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
        <InfoOutlineIcon />
      </Flex>
      <Divider />
      <Flex>
        <Text fontWeight={300}>Visualize:</Text>
        <Spacer />
        <Select size={"xs"} w={"50%"} onChange={handleSocChange}>
          <option value="soc 23">SOC 2023</option>
          <option value="soc 22">SOC 2022</option>
          <option value="soc change">SOC Change (2022-23)</option>
        </Select>
      </Flex>
    </>
  );
}

export default SocLegend;
