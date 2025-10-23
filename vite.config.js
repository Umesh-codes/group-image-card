import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const BASE_URL = process?.env?.VITE_BASE_URL ?? "";

/** @type {import("vite").UserConfig} */
export default defineConfig({
	base: BASE_URL,
	build: {
		minify: true,
		cssMinify: true,
		target: "esnext",
		// cssCodeSplit: false,
		// modulePreload: false,
		assetsDir: "assets",
		chunkSizeWarningLimit: 1000,
	},
	server: {
		host: "0.0.0.0",
	},
	plugins: [
		react(),
		federation({
			name: "mf_remote_brik",
			filename: "remoteEntry.js",
			shared: ["react", "react-dom", "@koadz/core", "@koadz/brik-wrapper", "@koadz/playground"],
			exposes: {
				// Expose files to other federated modules
				// "example_name": "./path/to/file.jsx", // can be js or jsx
			},
		}),
	],
});
