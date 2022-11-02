import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import PathLogic from "./utils/PathLogic";
import { QuestionLogic } from "./utils/QuestionLogic";

const Screen = () => {
  const { path, breadcrumbs, bCrumbName, isPath, pData } =
    useContext(GlobalContext);
  let paths;
  if (isPath) {
    paths = PathLogic(pData[path]);
  } else {
    paths = QuestionLogic(breadcrumbs, bCrumbName);
  }

  return <div className="flex flex-wrap w-full">{paths}</div>;
};
export default Screen;
