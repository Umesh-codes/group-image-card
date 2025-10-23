import React from "react";
import { BackgroundImage, ThemeContextProvider } from "@koadz/core";

function Brik({ data }) {
	let imageObj;

	data?.data.map((ele) => {
		if (ele?.content?.type === "img" && ele?.content?.for === "background") imageObj = ele;
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

	return (
		<ThemeContextProvider>
			<BackgroundImage
				src={imageObj?.content?.src}
				{...getMargin(imageObj?.style?.margin)}
				{...getPadding(imageObj?.style?.padding)}
				id={imageObj?.id}
				styles={{
					root: {
						backgroundColor: imageObj?.style?.backgroundColor,
					},
				}}>
				Let's start with Brik building
			</BackgroundImage>
		</ThemeContextProvider>
	);
}

export default Brik;
