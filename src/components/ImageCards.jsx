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
  KText
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

  const getMargin = (margin, spacingType) => {
    if (!margin && spacingType === "section") {
      margin = theme?.other?.margin || "0 0 0 0";
    }
    if (!margin) return {};
    const m = margin
      .split(" ")
      .map((val) => (val?.includes("px") ? parseInt(val) : Number(val) || 0));
    const [top = 30, right = 80, bottom = 30, left = 80] = m;
    return {
      mt: { base: `${top / 2.5}px`, sm: `${top / 1.8}px`, md: `${top}px` },
      mr: { base: `${right / 3}px`, sm: `${right / 2}px`, md: `${right}px` },
      mb: {
        base: `${bottom / 2.5}px`,
        sm: `${bottom / 1.8}px`,
        md: `${bottom}px`,
      },
      ml: { base: `${left / 3}px`, sm: `${left / 2}px`, md: `${left}px` },
    };
  };

  const getPadding = (padding, spacingType) => {
    if (!padding && spacingType === "section") {
      padding = theme?.other?.padding || "0 0 0 0";
    }
    if (!padding) return {};
    const p = padding
      .split(" ")
      .map((val) => (val?.includes("px") ? parseInt(val) : Number(val) || 0));
    const [top = 30, right = 80, bottom = 30, left = 80] = p;
    return {
      pt: { base: `${top / 2.5}px`, sm: `${top / 1.8}px`, md: `${top}px` },
      pr: { base: `${right / 3}px`, sm: `${right / 2}px`, md: `${right}px` },
      pb: {
        base: `${bottom / 2.5}px`,
        sm: `${bottom / 1.8}px`,
        md: `${bottom}px`,
      },
      pl: { base: `${left / 3}px`, sm: `${left / 2}px`, md: `${left}px` },
    };
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
          <Grid.Col
            key={index}
            span={{ base: 12, sm: 6, md: 3 }}
            id={`groupTestimonial_${index}`}
          >
            <Box
              {...getMargin(imgStyle?.margin)}
              {...getPadding(imgStyle?.padding)}
              style={{
                // ...getBorderStyles(imgStyle?.border),
                // ...getMargin(imgStyle?.margin),
                // ...getPadding(imgStyle?.padding),
                h: imgStyle?.height || "400px",
                w: imgStyle?.width || "100%",
              }}
            >
              <BackgroundImage
                id={`groupTestimonial_${index}`}
                src={imgData?.src}
                styles={{
                  root: {
                    backgroundColor: getColor(imgStyle?.backgroundColor),
                    ...getBorderStyles(imgStyle?.border),
                    ...getMargin(imgStyle?.margin),
                    ...getPadding(imgStyle?.padding),
                    minHeight: imgStyle?.height || "400px", 
                    height: imgStyle?.height || "auto",
                    width: imgStyle?.width || "100%",
                    maxWidth: "100%",
                    overflow: "hidden", 
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  },
                }}
                pos={"relative"}
                {...imgData?.props}
              >
                {isOverlay && (
                  <Overlay
                    color="#000"
                    opacity={0.33} // semi-transparent
                    zIndex={1}
                    style={{
                      ...getBorderStyles(imgStyle?.border),
                      ...getMargin(imgStyle?.margin),
                      ...getPadding(imgStyle?.padding),
                      maxWidth: "100%",
                    }}
                    w={imgStyle?.width || "100%"}
                    h={imgStyle?.height || "400px"}
                  />
                )}

                <KText
                  id={`groupTestimonial_${index}`}
                  value={titleData?.value}
                  order={titleData?.order}
                  m={titleStyle?.margin}
                  p={titleStyle?.padding}
                  fz={
                    titleStyle?.font?.size}
                  c={getColor(titleStyle?.font?.color || theme?.black)}
                  bg={getColor(titleStyle?.backgroundColor || "transparent")}
                  // style={{
                  //   ...getBorderStyles(titleStyle?.border),
                  // }}
                  fw={titleStyle?.font?.weight}
                  ff={titleStyle?.font?.family}
                  ta={titleStyle?.alignment}
                  {...titleData?.props}
                />

                <KText
                  id={`groupTestimonial_${index}`}
                  value={subTitleData?.value}
                  order={subTitleData?.order}
                  m={subTitleStyle?.margin}
                  p={subTitleStyle?.padding}
                  fz={
                    subTitleStyle?.font?.size
                  }
                  lh={{ base: "1.6", sm: "1.8" }}
                  c={getColor(subTitleStyle?.font?.color)}
                  bg={getColor(subTitleStyle?.backgroundColor || "transparent")}
                  // style={{
                  //   ...getBorderStyles(subTitleStyle?.border),
                  // }}
                  fw={subTitleStyle?.font?.weight}
                  ta={subTitleStyle?.alignment}
                  ff={subTitleStyle?.font?.family}
                  {...subTitleData?.props}
                />
              
              </BackgroundImage>
            </Box>
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
