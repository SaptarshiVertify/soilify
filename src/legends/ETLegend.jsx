import { useState, Fragment } from "react";
import {
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Link,
} from "@chakra-ui/react";

import { InfoOutlineIcon } from "@chakra-ui/icons";

import opacityIcon from "../assets/contrast-01.png";

import etImage from "../assets/legendImages/et.png";

function ETLegend({ setLayerOpacity }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const numbers = Array.from({ length: 10 }, (_, i) => i);
  // States to control slider value and tooltup label
  const [sliderValue, setSliderValue] = useState(75);
  const [showTooltip, setShowTooltip] = useState(false);
  // State to assign visibility of opacity slider section
  const [isOpacityOpen, setOpacityOpen] = useState(false);

  // Function to open and close the opacity slider section
  function handleOpacitySection() {
    setOpacityOpen((prev) => !prev);
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
          w={isOpacityOpen ? "40%" : "0%"}
          visibility={isOpacityOpen ? "visible" : "hidden"}
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
        {/* Modal Button */}
        <InfoOutlineIcon onClick={onOpen} />
      </Flex>
      <Text fontWeight={400} fontSize={10} ml={4} mb={1}>
        Evapotranspiration in mm/day:
      </Text>
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
      {/* Modal contenet */}
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Evapotranspiration</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"justify"}>
            <Flex>
              <Text fontWeight={600} mr={1}>
                Description:
              </Text>
              <Text>
                An Evapotranspiration map illustrates the spatial distribution
                of water loss from land surfaces through evaporation and plant
                transpiration. This map is crucial for managing water resources
                and assessing agricultural water needs.
              </Text>
            </Flex>
            <Flex>
              <Text fontWeight={600} mr={1}>
                Source:
              </Text>
              <Text>
                {/* <Link
                  href="https://esa-worldcover.org/en"
                  color={"green"}
                  isExternal
                > */}
                  Calculated from Sentinel-2 imagery
                {/* </Link> */}
              </Text>
            </Flex>
            <Flex>
              <Text fontWeight={600} mr={1}>
                Resolution:
              </Text>
              <Text>10 meter</Text>
            </Flex>
            <Flex alignContent={"center"}>
              <Spacer />
              <Image src={etImage} h={"30%"} w={"70%"} borderRadius={10} />
              <Spacer />
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default ETLegend;
