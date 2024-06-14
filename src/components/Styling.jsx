import { useState } from "react";
import { Box, Flex, Spacer, Text, Button, Divider } from "@chakra-ui/react";
import CropTypeKharifLegend from "../legends/CropTypeKharifLegend";
import CoverCropLegend from "../legends/CoverCropLegend";
import SocLegend from "../legends/SocLegend";
import { GoChevronUp, GoChevronDown } from "react-icons/go";

function Styling({ switchState, drawing, setLayerOpacity, setSocVis }) {
  // State to control minimize
  const [minimized, setMinimized] = useState(false);
  const totalTrue = Object.values(switchState).filter(Boolean).length;

  // Function to control minimization
  function handleMinimize() {
    setMinimized((prev) => !prev);
    console.log(minimized);
  }

  return (
    <>
      <Flex
        bg={"white"}
        alignItems={"center"}
        p={1}
        borderBottomColor={"black"}
        borderBottomWidth={minimized ? 0 : 1}
        borderStyle={"dotted"}
        borderRadius={minimized ?"inherit":"none"}
        w={minimized ? "30%" : "100%"}
        ml={minimized ? "auto" : "0"}
        display={totalTrue > 0 && drawing == "no" ? "flex" : "none"}
      >
        <Text fontSize={16} fontWeight={700}>
          Legends
        </Text>
        <Spacer />
        <Button
          onClick={handleMinimize}
          size={"xs"}
          display={totalTrue > 0 && drawing == "no" ? "block" : "none"}
          bg={"transparent"}
          _hover={{bg:"transparent"}}
        >
          {minimized?<GoChevronUp />:<GoChevronDown />}
        </Button>
      </Flex>
      <Box
        display={
          totalTrue > 0 && drawing == "no" && !minimized ? "block" : "none"
        }
        bg={"white"}
        // p={2}
        color={"black"}
        w={"100%"}
        maxH={"100vh"}
      >
        {switchState["crop type kharif"] ? (
          <CropTypeKharifLegend setLayerOpacity={setLayerOpacity} />
        ) : null}
        {switchState["cover crop"] ? (
          <CoverCropLegend setLayerOpacity={setLayerOpacity} />
        ) : null}
        {switchState["soil organic carbon map"] ? (
          <SocLegend setLayerOpacity={setLayerOpacity} setSocVis={setSocVis} />
        ) : null}
      </Box>
    </>
  );
}

export default Styling;
