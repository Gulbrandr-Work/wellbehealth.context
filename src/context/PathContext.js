import React, { createContext } from "react";
import PathData from "../data/PathsData.json";

const initalState = {
  ...PathData,
};

export const PathContext = createContext(initalState);

export const PathProvider = ({ children }) => {
  return (
    <PathContext.Provider value={initalState}>{children}</PathContext.Provider>
  );
};
