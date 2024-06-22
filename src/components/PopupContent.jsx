import { useState } from "react";
import { Text, Box, Flex, Spacer, Divider } from "@chakra-ui/react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

function PopupContent({ feature }) {
  return (
    <Box fontSize={12} fontWeight={500} fontFamily={"open sans"} w={180}>
      <Text fontWeight={750} fontSize={16}>Soil sample point</Text>
      <Flex borderBottom={1} borderStyle={"dashed"} borderColor={"gray"}>
        <Text>SOC 22 (ton/ha):</Text>
        <Spacer />
        <Text>{feature.properties["soc_22"].toFixed(3)}</Text>
      </Flex>
      <Flex borderBottom={1} borderStyle={"dashed"} borderColor={"gray"}>
        <Text>SOC 23 (ton/ha):</Text>
        <Spacer />
        <Text>{feature.properties["soc_23"].toFixed(3)}</Text>
      </Flex>
      <Flex borderBottom={1} borderStyle={"dashed"} borderColor={"gray"}>
        <Text>Absolute Change (ton/ha):</Text>
        <Spacer />
        <Text>{feature.properties["chn"].toFixed(3)}</Text>
      </Flex>
      <Flex alignItems={"center"}>
        <Spacer />
        {feature.properties["soc_23"] > feature.properties["soc_22"] ? (
          <FaArrowTrendUp style={{ color: "green" }} />
        ) : (
          <FaArrowTrendDown style={{ color: "red" }} />
        )}
        <Text ml={3}>
          {(
            (feature.properties["chn"] / feature.properties["soc_22"]) *
            100
          ).toFixed(2)}
          % Change in the last year
        </Text>
        <Spacer />
      </Flex>
    </Box>
  );
}

export default PopupContent;
