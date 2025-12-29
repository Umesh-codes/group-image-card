import React from "react";
import {
  BackgroundImage,
  Grid,
  Text,
  ThemeContextProvider,
  KText,
} from "@koadz/core";
import GroupImageCards from "./ImageCards";
// import GroupImageCards from "./GroupImageCards";

function Brik({ data, theme }) {
  let imageObj, headlineText, cardGroup;

  data?.data.map((ele) => {
    if (ele?.content?.for === "background") imageObj = ele;
    if (ele?.content?.for === "cardGroup") cardGroup = ele;
    if (ele?.content?.for === "Headline") headlineText = ele;
  });

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

  return (
    <ThemeContextProvider>
      <BackgroundImage
        src={imageObj?.content?.src}
        {...getPadding(imageObj?.style?.padding, "section")}
        id={imageObj?.id}
        styles={{
          root: {
            backgroundColor: getColor(imageObj?.style?.backgroundColor),
          },
        }}
        h={imageObj?.style?.height || "auto"}
        w={imageObj?.style?.width || "100%"}
        overlayColor={getColor(imageObj?.style?.overlay?.color) || theme?.black}
        isOverlay={imageObj?.style?.overlay?.isOverlay}
        overlayOpacity={imageObj?.style?.overlay?.opacity}
        blur={imageObj?.style?.blur}
        opacity={imageObj?.style?.opacity}
        {...imageObj?.content?.props}
      >
        <Grid w="100%">
          {headlineText?.display !== "none" && (
            <Grid.Col span={12}>
              <KText
                id={headlineText?.id}
                value={headlineText?.content?.value}
                order={headlineText?.content?.order}
                {...getMargin(headlineText?.style?.margin)}
                {...getPadding(headlineText?.style?.padding)}
                fz={headlineText?.style?.font?.size}
                c={getColor(headlineText?.style?.font?.color)}
                fw={headlineText?.style?.font?.weight}
                ta={headlineText?.style?.alignment}
                ff={headlineText?.style?.font?.family}
                {...headlineText?.content?.props}
              />
            </Grid.Col>
          )}
          {cardGroup?.display !== "none" && (
            <GroupImageCards data={data} theme={theme} />
          )}
        </Grid>
      </BackgroundImage>
    </ThemeContextProvider>
  );
}

export default Brik;
