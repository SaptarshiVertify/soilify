import { Box, Button, Flex, Text, Image, Spacer } from "@chakra-ui/react";
import { LiaVectorSquareSolid } from "react-icons/lia";
import { BsFillFileBarGraphFill } from "react-icons/bs";
import { RiDeleteBin5Line } from "react-icons/ri";

import polyIcon from "../assets/Poly.png";
import GraphComponent from "./GraphComponent";

function Analysis({
  toggleDisability,
  isDisabled,
  drawing,
  setDrawing,
  switchState,
  graph,
}) {
  function handleGraph() {
    setDrawing("no");
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
      {/* <Text fontWeight={600}>Analysing</Text> */}
      {/* Buttons block */}
      {switchState["soil organic carbon map"] ? (
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
            <Box>{drawing == "drawn" ? <BsFillFileBarGraphFill /> : null}</Box>
            {drawing == "drawn" ? "Analyse" : "Cancel"}
          </Button>
        </Box>
      ) : (
        <Text
          fontWeight={100}
          fontStyle={"italic"}
          fontSize={18}
          p={5}
          borderWidth={1}
          borderColor={"black"}
          borderRadius={5}
          borderStyle={"dashed"}
        >
          Please turn on SOC map to analyse
        </Text>
      )}

      {/* Graph section */}

      <Box display={drawing == "ready to analyse" ? "visible" : "none"}>
        <Flex alignItems={"center"} m={1} p={1}>
          <Spacer />
          <Text fontSize={14} fontWeight={500}>
            Remove Poygon
          </Text>
          <Box
            ml={1}
            onClick={handleGraph}
            bg={"white"}
            w={"fit-content"}
            borderRadius={5}
            p={0.5}
            right={0}
            _hover={{ color: "red" }}
          >
            <RiDeleteBin5Line />
          </Box>
        </Flex>
        <Box bg={"white"}>
          <GraphComponent graph={graph} size={"sm"} />
        </Box>
      </Box>
    </>
  );
}

export default Analysis;
