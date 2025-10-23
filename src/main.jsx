import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

// https://vitejs.dev/guide/build.html#load-error-handling
// window.addEventListener("vite:preloadError", (event) => {
// 	console.warn("Failed to load dynamic imports, reload page");
// });
