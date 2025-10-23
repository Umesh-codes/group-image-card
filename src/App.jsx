import "./App.css";
import { ProjectProvider, ActiveItemProvider } from "@koadz/playground";
import React from "react";
import BrikLayout from "./components/BrikLayout";
import jsonData from "./data/schema.json";

function App() {
	return (
		<ProjectProvider data={jsonData}>
			<ActiveItemProvider
				data={{
					value: {
						brikId: "",
						isBrik: true,
						isOpen: false,
						selectedElementId: "",
						editorPosition: "right",
					},
				}}>
				<BrikLayout />
			</ActiveItemProvider>
		</ProjectProvider>
	);
}

export default App;
