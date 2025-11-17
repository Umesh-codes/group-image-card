import React from "react";
import { Box, Card, Flex, Grid, Image, Overlay, Text, KText } from "@koadz/core";

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
              style={{
                position: "relative",
                // overflow: "hidden",
                height: imgStyle?.height || "400px",
                ...getBorderStyles(imgStyle?.border),
              }}
              {...getMargin(imgStyle?.margin)}
              {...getPadding(imgStyle?.padding)}
              zIndex={isOverlay ? 1 : 0}
            >
              {/* Overlay layer */}
              {/* {isOverlay && (
                <Box
                  style={{
                    position: "absolute",
                    inset: 0, // shorthand for top, right, bottom, left = 0
                    borderRadius: imgStyle?.border?.radius,
                    zIndex: 1,
                    backgroundColor: "#00000055",
                    ...getPadding(imgStyle?.padding),
                  }}
                />
              )} */}

              {isOverlay && (
                <Overlay
                  color="#000"
                  opacity={0.93} // semi-transparent
                  zIndex={1}
                  style={{
                    ...getPadding(imgStyle?.padding),
                    ...getBorderStyles(imgStyle?.border),
                    ...getMargin(imgStyle?.margin),
                  }}
                />
              )}
              {/* Background Image */}
              <Image
                src={imgData?.src}
                alt={titleData?.value}
                fit="cover"
                w="100%"
                h="100%"
                style={{
                  display: "block",
                  objectFit: "cover",
                }}
              />

              {/* Overlay Text */}
              <Box
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  color: theme?.white,
                  zIndex: 2,
                }}
              >
                <KText
                  m={titleStyle?.margin}
                  p={titleStyle?.padding}
                  value={titleData?.value}
                  order={titleData?.order}
                  fz={titleStyle?.font?.size}
                  c={getColor(titleStyle?.font?.color)}
                  fw={titleStyle?.font?.weight}
                  ff={titleStyle?.font?.family}
                  ta={titleStyle?.alignment}
                />
                  
                <KText
                  m={subTitleStyle?.margin}
                  p={subTitleStyle?.padding}
                  value={subTitleData?.value}
                  order={subTitleData?.order}
                  fz={subTitleStyle?.font?.size}
                  lh={{ base: "1.6", sm: "1.8" }}
                  c={getColor(subTitleStyle?.font?.color)}
                  fw={subTitleStyle?.font?.weight}
                  ta={subTitleStyle?.alignment}
                  ff={subTitleStyle?.font?.family}
                />
              </Box>
            </Box>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
