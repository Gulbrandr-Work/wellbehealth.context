import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const Btns = ({ label, pathID, cName }) => {
  const { isPath, updatePath, updateCrumbs, pathReset } =
    useContext(GlobalContext);

  let btnClasses = "";
  if (cName === "blue") {
    btnClasses = "bg-blue-400 hover:bg-blue-500 focus:ring-blue-300";
  }
  if (cName === "green") {
    btnClasses = "bg-green-400 hover:bg-green-500 focus:ring-green-300";
  }
  if (cName === "red") {
    btnClasses = "bg-red-600 hover:bg-red-500 focus:ring-red-300";
  }
  if (cName === "gray") {
    btnClasses = "cursor-not-allowed opacity-50 bg-gray-400 hover:bg-gray-500";
  }
  if (cName === "options") {
    btnClasses =
      "bg-green-400 hover:bg-green-500 focus:ring-green-300 w-1/2 my-3 p-4";
  }

  const handleClick = (pID) => {
    if (isPath) {
      updatePath(pID);
    }
    if (!isPath) {
      updateCrumbs(pID);
    }
    if (pathID === "reset") {
      pathReset("home");
    }
    if (pathID === "newAppt") {
      pathReset("participant");
    }
  };

  return (
    <button
      className={`px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform rounded mr-4 ${btnClasses}`}
      onClick={() => {
        handleClick(pathID);
      }}
    >
      {label}
    </button>
  );
};

export default Btns;
