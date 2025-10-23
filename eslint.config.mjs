import json from "@eslint/json";
import react from "eslint-plugin-react";
import globals from "globals";

export default [
	{
		files: ["**/*.json"],
		ignores: ["./*-lock.json", "./tsconfig.json"],
		language: "json/json",
		...json.configs.recommended,
	},
	{
		ignores: ["**/node_modules", "**/dist", "**/build", "**/.cache"],
	},
	{
		plugins: {
			react,
			json,
		},

		languageOptions: {
			globals: {
				...globals.browser,
			},

			ecmaVersion: "latest",
			sourceType: "module",

			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},

		settings: {
			react: {
				version: "detect",
			},
		},

		rules: {
			semi: "warn",
			quotes: ["warn", "double"],
		},
	},
];
