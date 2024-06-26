import { useState } from "react";
import { Box, Flex, Spacer, Text, Button, Divider } from "@chakra-ui/react";
import CropTypeKharifLegend from "../legends/CropTypeKharifLegend";
import CropTypeRabiLegend from "../legends/CropTypeRabiLegend";
import CoverCropLegend from "../legends/CoverCropLegend";
import CropHealthLegend from "../legends/CropHealthLegend";
import SocLegend from "../legends/SocLegend";
import LulcLegend from "../legends/LulcLegend";
import ETLegend from "../legends/ETLegend";

import { GoChevronUp, GoChevronDown } from "react-icons/go";

function Styling({ switchState, drawing, setLayerOpacity, setSocVis }) {
  // State to control minimize
  const [minimized, setMinimized] = useState(false);
  const totalTrue = Object.values(switchState).filter(Boolean).length;

  // Function to control minimization
  function handleMinimize() {
    setMinimized((prev) => !prev);
  }

  return (
    <>
      <Flex
        bg={"white"}
        alignItems={"center"}
        // p={1}
        borderBottomColor={"black"}
        borderBottomWidth={minimized ? 0 : 1}
        borderStyle={"dotted"}
        borderRadius={minimized ? "inherit" : "none"}
        w={minimized ? "30%" : "100%"}
        ml={minimized ? "auto" : "0"}
        display={totalTrue > 0 && (drawing == "no"||drawing == "ready to analyse") ? "flex" : "none"}
      >
        <Text fontSize={16} fontWeight={700} m={1}>
          Legends
        </Text>
        <Spacer />
        <Button
          onClick={handleMinimize}
          size={"xs"}
          display={totalTrue > 0 && (drawing == "no"||drawing == "ready to analyse") ? "block" : "none"}
          bg={"transparent"}
          _hover={{ bg: "transparent" }}
        >
          {minimized ? <GoChevronUp /> : <GoChevronDown />}
        </Button>
      </Flex>
      <Box
        display={
          totalTrue > 0 && (drawing == "no"||drawing == "ready to analyse") && !minimized ? "block" : "none"
        }
        bg={"white"}
        p={1}
        color={"black"}
        w={"100%"}
      >
        {switchState["soil organic carbon map"] ? (
          <SocLegend setLayerOpacity={setLayerOpacity} setSocVis={setSocVis} />
        ) : null}
        {switchState["crop type kharif"] ? (
          <CropTypeKharifLegend setLayerOpacity={setLayerOpacity} />
        ) : null}
        {switchState["crop type rabi"] ? (
          <CropTypeRabiLegend setLayerOpacity={setLayerOpacity} />
        ) : null}
        {switchState["cover crop"] ? (
          <CoverCropLegend setLayerOpacity={setLayerOpacity} />
        ) : null}
        {switchState["crop health"] ? (
          <CropHealthLegend setLayerOpacity={setLayerOpacity} />
        ) : null}
        {switchState["flood map"] ? (
          <FloodMapLegend setLayerOpacity={setLayerOpacity} />
        ) : null}
        {switchState["flood risk"] ? (
          <FloodRiskLegend setLayerOpacity={setLayerOpacity} />
        ) : null}
        {switchState["lulc"] ? (
          <LulcLegend setLayerOpacity={setLayerOpacity} />
        ) : null}
        {switchState["evapotranspiration"] ? (
          <ETLegend setLayerOpacity={setLayerOpacity} setSocVis={setSocVis} />
        ) : null}
      </Box>
    </>
  );
}

export default Styling;
