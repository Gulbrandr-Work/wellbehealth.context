import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const Debug = () => {
  const { bCrumbName, breadcrumbs, path, isDebug } = useContext(GlobalContext);

  return (
    <div className="w-7/12 absolute bg-red-300 absolute -bottom-0 text-white right-0 p-4">
      <div>
        <h1 className="border-b pb-2">
          Path is <strong>{path}</strong> | Breadcrumb is{" "}
          <strong>{breadcrumbs}</strong>
        </h1>
      </div>
    </div>
  );
};

export default Debug;
