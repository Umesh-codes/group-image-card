import React from "react";
import { BackgroundImage, Grid, Text, ThemeContextProvider } from "@koadz/core";
import GroupImageCards from "./ImageCards";
// import GroupImageCards from "./GroupImageCards";

function Brik({ data, theme }) {
  let imageObj, headlineText, cardGroup;

  data?.data.map((ele) => {
    if (ele?.content?.for === "background") imageObj = ele;
    if (ele?.content?.for === "cardGroup") cardGroup = ele;
    if (ele?.content?.for === "headlineText") headlineText = ele;
  });

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

  return (
    <ThemeContextProvider>
      <BackgroundImage
        src={imageObj?.content?.src}
        {...getMargin(imageObj?.style?.margin)}
        {...getPadding(imageObj?.style?.padding)}
        id={imageObj?.id}
        styles={{
          root: {
            backgroundColor: getColor(imageObj?.style?.backgroundColor),
          },
        }}
        h={imageObj?.style?.height || "auto"}
      >
        <Grid w="100%">
          <Grid.Col span={12}>
            {headlineText?.display !== "none" && (
              <Text
                id={headlineText?.id}
                m={headlineText?.style?.margin}
                p={headlineText?.style?.padding}
                fz={headlineText?.style?.font?.size}
                c={getColor(
                  headlineText?.style?.font?.color ||
                    imageObj?.style?.font?.color ||
                    theme?.black
                )}
                bg={getColor(
                  headlineText?.style?.backgroundColor || "transparent"
                )}
                fw={headlineText?.style?.font?.weight}
                ta={headlineText?.style?.alignment}
                ff={headlineText?.style?.font?.family}
              >
                {headlineText?.content?.value}
              </Text>
            )}
          </Grid.Col>
          {cardGroup?.display !== "none" && (
            <GroupImageCards data={data} theme={theme} />
          )}
        </Grid>
      </BackgroundImage>
    </ThemeContextProvider>
  );
}

export default Brik;
