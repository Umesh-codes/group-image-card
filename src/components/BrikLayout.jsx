/* eslint-disable react/prop-types */
import { BrikWrapper } from "@koadz/brik-wrapper";
import { ThemeContextProvider } from "@koadz/core";
import { useContext } from "react";
import {
  AppWrapper,
  useProjectJSON,
  ActiveItemContext,
} from "@koadz/playground";
import Brik from "./Brik";

function BrikLayout() {
  const projectData = useProjectJSON();
  const activeItems = useContext(ActiveItemContext);

  const handleClick = (brikId, selectedElementId) => {
    if (brikId) {
      activeItems.setValue({
        ...activeItems.value,
        brikId,
        selectedElementId: selectedElementId || "",
        activeToolbar: "editor",
      });
    }
  };

  return (
    <ThemeContextProvider>
      <AppWrapper>
        <BrikWrapper
          handleClick={handleClick}
          data={
            projectData?.project?.pages?.[0]?.data[0]?.cols[0]?.colData?.[0]
          }
        >
          <Brik
            data={
              projectData?.project?.pages?.[0]?.data[0]?.cols[0]?.colData?.[0]
            }
            theme={projectData?.project?.config?.theme}
          />
        </BrikWrapper>
      </AppWrapper>
    </ThemeContextProvider>
  );
}

export default BrikLayout;
