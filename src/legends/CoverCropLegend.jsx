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
} from "@chakra-ui/react";

import {InfoOutlineIcon} from "@chakra-ui/icons";

import opacityIcon from "../assets/contrast-01.png";

function CoverCropLegend({ setLayerOpacity}) {
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
      [key]: v/100,
    }));;
  }
  return (
    <>
      <Flex alignItems="center" w={"100%"}>
        <Text fontSize={16}>Cover Crop</Text>
        <Spacer />
          <Image
            src={opacityIcon}
            h={4}
            onClick={handleOpacitySection}
            alt="Opacity"
          />
        <Box
          w={isOpen ? "40%" : "0%"}
          visibility={isOpen?"visible":"hidden"}
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
              onChange={(v) => handleOpacityChange('cover crop',v)}
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
                <SliderThumb bg={"whitesmoke"}/>
              </Tooltip>
            </Slider>
          </Flex>
        </Box>
        <InfoOutlineIcon/>
      </Flex>
      <Divider/>
    </>
  );
}

export default CoverCropLegend;
