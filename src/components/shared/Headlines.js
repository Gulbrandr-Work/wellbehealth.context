import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
const Headlines = () => {
  const { pathName, bCrumbName } = useContext(GlobalContext);

  return (
    <h1 className="text-4xl p-4 capitalize">
      {pathName}
      {bCrumbName !== "" && (
        <span className="text-gray-500"> | {bCrumbName}</span>
      )}
    </h1>
  );
};

export default Headlines;
