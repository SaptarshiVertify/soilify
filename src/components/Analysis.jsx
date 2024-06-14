import { Box, Button, Flex, Text, Image } from "@chakra-ui/react";
import { LiaVectorSquareSolid } from "react-icons/lia";
import { BsFillFileBarGraphFill } from "react-icons/bs";

import polyIcon from '../assets/Poly.png'

function Analysis({ toggleDisability, isDisabled, drawing, setDrawing }) {
  function handleGraph() {
    setDrawing('no');
  }
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
      <Text fontWeight={600}>Analysing</Text>
      {/* Buttons block */}
      <Box>
        <Button
          color={"white"}
          bg={"black"}
          w={"25%"}
          h={"10%"}
          alignContent={"center"}
          onClick={toggleDisability}
          isDisabled={isDisabled}
          _hover={{
            bg: isDisabled ? "black" : "green",
            transition: "ease 0.25",
          }}
          m={3}
        >
          <Flex align={"center"}>
            <Box>
              <LiaVectorSquareSolid />
            </Box>
            Draw
          </Flex>
        </Button>
        <Button
          color={"white"}
          bg={"black"}
          w={"fit-content"}
          h={"10%"}
          alignContent={"center"}
          onClick={toggleDisability}
          _hover={{ bg: "green", transition: "ease 0.25" }}
          isDisabled={!isDisabled}
          _disabled={{ display: "none" }}
          m={3}
        >
          <Box>{drawing == 'drawn' ? <BsFillFileBarGraphFill /> : null}</Box>
          {drawing == 'drawn' ? "Analyse" : "Cancel"}
        </Button>
      </Box>
      {/* Graph section */}
      <Box display={drawing == 'ready to analyse' ? "visible" : "none"} p={20} bg={"red"}>
        <Button onClick={handleGraph}>
          Delete polygon
        </Button>
      </Box>
    </>
  );
}

export default Analysis;
