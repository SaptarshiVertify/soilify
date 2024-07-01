import { useState } from "react";
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

function CropTypeRabiLegend({ setLayerOpacity }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        <Text fontSize={16}>Crop type Rabi</Text>
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
              onChange={(v) => handleOpacityChange("crop type rabi", v)}
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
      <Wrap alignItems={"center"}>
        <WrapItem>
          <Square bg={"#fec84b"} size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400}>Maize</Text>
        </WrapItem>
        <WrapItem>
          <Square bg={"#079455"} size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400}>Paddy</Text>
        </WrapItem>
        <WrapItem>
          <Square bg={"#9e77ed"} size={4} m={1} ml={4} borderRadius={5} />
          <Text fontWeight={400}>Cotton</Text>
        </WrapItem>
      </Wrap>
      {/* Modal contenet */}
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crop type map (Rabi)</ModalHeader>
          <ModalCloseButton />
          <ModalBody textAlign={"justify"}>
            <Flex>
              <Text fontWeight={600} mr={1}>
                Description:
              </Text>
              <Text>
                A crop type map shows the distribution of different crop species
                across a landscape. Created from satellite imagery by analyzing
                spectral signatures, it provides essential information for
                agricultural planning and management. In India, crops are
                primarily grown in two seasons: Karif and Rabi. Kharif crops
                are sown with the onset of the monsoon in June and harvested in
                autumn, including crops like rice, maize, and millets. Rabi
                crops are sown in winter, starting in October, and harvested in
                spring, with wheat, barley, and peas being common examples.
              </Text>
            </Flex>
            <Flex>
              <Text fontWeight={600} mr={1}>
                Source:
              </Text>
              <Text>Analysed using Sentinel-2 imagery.</Text>
            </Flex>
            <Flex>
              <Text fontWeight={600} mr={1}>
                Resolution:
              </Text>
              <Text>10 meter</Text>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CropTypeRabiLegend;
