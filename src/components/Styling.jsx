import { useState } from "react";
import { Box, Flex, Spacer, Text, Button } from "@chakra-ui/react";
import CropTypeKharifLegend from "../legends/CropTypeKharifLegend";
import CoverCropLegend from "../legends/CoverCropLegend";
import SocLegend from "../legends/SocLegend";

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
    <Flex><Spacer/>
      <Button
        onClick={handleMinimize}
        size={"xs"}
        display={totalTrue > 0 && drawing == "no" ? "block" : "none"}
      >
        Min
      </Button></Flex>
      <Box
      display={totalTrue > 0 && drawing == "no" && !minimized? "block" : "none"}
        bg={"white"}
        p={2}
        color={"black"}
        w={"100%"}
        overflow={"hidden"}
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
