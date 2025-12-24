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
  KText,
} from "@koadz/core";

export default function GroupImageCards({ data, theme }) {
  let cardGroup;

  data?.data.forEach((ele) => {
    if (ele?.content?.for === "cardGroup") cardGroup = ele;
  });
  const lastrowfill = data?.settings?.[0]?.value || false;
  const gridOption = data?.settings?.[1]?.value || "4";

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

  const getGridSpan = () => {
    const num = Number(gridOption); // "2", "3", "4"
    const mdSpan = 12 / num; // 6, 4, 3

    return {
      base: 12, // 1 per row on mobile
      sm: 6, // 2 per row on small screens
      md: mdSpan, // dynamic per user choice
    };
  };

  return (
    <Grid
      columns={12}
      w="100%"
      gutter={10}
      styles={{
        inner: {
          display: "flex",
          justifyContent: "center",
        },
      }}
    >
      {groupCards.map((card, index) => {
        const [imgData, titleData, subTitleData] = card || [];

        const itemsPerRow = parseInt(gridOption || "3", 10);
        const isInLastRow =
          index >= Math.floor(groupCards.length / itemsPerRow) * itemsPerRow;
        const remainingItems = groupCards.length % itemsPerRow || itemsPerRow;
        const spanForLastRow =
          lastrowfill && isInLastRow && groupCards.length % itemsPerRow !== 0
            ? 12 / remainingItems
            : getGridSpan();

        return (
          <Grid.Col
            key={index}
            span={spanForLastRow}
            id={`groupTestimonial_${index}`}
          >
            <Box
              {...getMargin(imgStyle?.margin)}
              {...getPadding(imgStyle?.padding)}
              style={{
                flexShrink: 0,
                width: imgStyle?.width || "100%", // always match the column width
                maxWidth: "100%", // prevent overflow
                minHeight: imgStyle?.height || "400px",
                overflow: "hidden", // prevents overflow
                ...getBorderStyles(imgStyle?.border),
              }}
            >
              <BackgroundImage
                id={`groupTestimonial_${index}`}
                overlayColor={getColor(imgStyle?.overlay?.color)}
                isOverlay={imgStyle?.overlay?.isOverlay}
                overlayOpacity={imgStyle?.overlay?.opacity}
                blur={imgStyle?.blur}
                opacity={imgStyle?.opacity}
                fit="cover"
                src={imgData?.src}
                style={{
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                  minHeight: imgStyle?.height || "400px",
                  height: "auto",
                }}
                {...imgData?.props}
              >
                <KText
                  id={`groupTestimonial_${index}`}
                  value={titleData?.value}
                  order={titleData?.order}
                  {...getMargin(titleStyle?.margin)}
                  {...getPadding(titleStyle?.padding)}
                  fz={titleStyle?.font?.size}
                  c={getColor(titleStyle?.font?.color || theme?.black)}
                  style={{
                    zIndex: 3,
                    position: "relative",
                    width: "100%",
                  }}
                  fw={titleStyle?.font?.weight}
                  ff={titleStyle?.font?.family}
                  ta={titleStyle?.alignment}
                  {...titleData?.props}
                />

                <KText
                  id={`groupTestimonial_${index}`}
                  value={subTitleData?.value}
                  order={subTitleData?.order}
                  {...getMargin(subTitleStyle?.margin)}
                  {...getPadding(subTitleStyle?.padding)}
                  fz={subTitleStyle?.font?.size}
                  c={getColor(subTitleStyle?.font?.color)}
                  style={{
                    zIndex: 3,
                    position: "relative",
                    width: "100%",
                  }}
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
