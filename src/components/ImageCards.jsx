import React from "react";
import {
  BackgroundImage,
  Box,
  Card,
  Flex,
  Grid,
  Image,
  Overlay,
  Text,
} from "@koadz/core";

export default function GroupImageCards({ data, theme }) {
  let cardGroup;

  data?.data.forEach((ele) => {
    if (ele?.content?.for === "cardGroup") cardGroup = ele;
  });
  const isOverlay = data?.settings?.[0]?.value || false;

  const groupCards = cardGroup?.content?.value || [];
  const imgStyle = cardGroup?.groupStyles?.[0];
  const titleStyle = cardGroup?.groupStyles?.[1];
  const subTitleStyle = cardGroup?.groupStyles?.[2];

  const getMargin = (margin) => {
    if (!margin) return {};
    let m = margin.split(" ");
    return { mt: m[0], mr: m[1], mb: m[2], ml: m[3] };
  };

  const getPadding = (padding) => {
    if (!padding) return {};
    let p = padding.split(" ");
    return { pt: p[0], pr: p[1], pb: p[2], pl: p[3] };
  };

  const getColor = (color) => {
    if (["primary", "secondary", "tertiary"].includes(color))
      return theme?.colors?.[color]?.[9];
    if (color === "white" || color === "black") return theme?.[color];
    return color;
  };

  const getBorderStyles = (bdrObj) => {
    const values = Object.values(bdrObj);
    if (values.every((v) => v === "" || v === null || v === undefined)) {
      return {};
    }
    return {
      border: `solid ${getColor(bdrObj?.color)}`,
      borderWidth: bdrObj?.size?.replace(/\b\d+\b/g, "$&px"),
      borderRadius: bdrObj?.radius?.replace(/\b\d+\b/g, "$&px"),
    };
  };

  return (
    <Grid
      columns={12}
      w="100%"
      gutter={0}
      styles={{
        inner: {
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      {groupCards.map((card, index) => {
        const [imgData, titleData, subTitleData] = card || [];

        return (
          <Grid.Col key={index} span={{ base: 12, sm: 6, md: 3 }}>
            <Box
              {...getMargin(imgStyle?.margin)}
              {...getPadding(imgStyle?.padding)}
            >
              <BackgroundImage
                src={imgData?.src}
                styles={{
                  root: {
                    backgroundColor: getColor(imgStyle?.backgroundColor),
                  },
                }}
                h={imgStyle?.height || "400px"}
                pos={"relative"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end", // pushes children to bottom
                }}
              >
                {isOverlay && (
                  <Overlay
                    color="#000"
                    opacity={0.33} // semi-transparent
                    zIndex={1}
                  />
                )}

                <Text
                  m={titleStyle?.margin}
                  p={titleStyle?.padding}
                  fz={{
                    base: "18px",
                    sm: titleStyle?.font?.size || "20px",
                  }}
                  c={getColor(titleStyle?.font?.color || theme?.black)}
                  bg={getColor(titleStyle?.backgroundColor || "transparent")}
                  fw={titleStyle?.font?.weight}
                  ff={titleStyle?.font?.family}
                  ta={titleStyle?.alignment}
                >
                  {titleData?.value}
                </Text>
                <Text
                  m={subTitleStyle?.margin}
                  p={subTitleStyle?.padding}
                  fz={{
                    base: "14px",
                    sm: subTitleStyle?.font?.size || "16px",
                  }}
                  lh={{ base: "1.6", sm: "1.8" }}
                  c={getColor(subTitleStyle?.font?.color || theme?.black)}
                  bg={getColor(subTitleStyle?.backgroundColor || "transparent")}
                  fw={subTitleStyle?.font?.weight}
                  ta={subTitleStyle?.alignment}
                  ff={subTitleStyle?.font?.family}
                >
                  {subTitleData?.value}
                </Text>
              </BackgroundImage>
            </Box>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
