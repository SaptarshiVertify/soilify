import React from "react";
import { Box, Image } from "@chakra-ui/react";

const HoverImage = ({ src, alt, h, w }) => {
  return (
    <Box
      maxH={h}
      maxW={w}
      overflow={"hidden"}
      boxShadow={"1 1 1 1"}
      borderRadius={10}
      transition="all 0.3s ease-in-out"
      cursor={"pointer"}
      _hover={{
        img: {
          transform: "scale(1.15)",
        },
      }}
    >
      <Image
        maxH={"100%"}
        maxW={"100%"}
        src={src}
        alt={alt}
        transition="all 0.3s ease-in-out"
        opacity={0.65}
        _hover={{
          opacity: 1,
        }}
      />
    </Box>
  );
};

export default HoverImage;
