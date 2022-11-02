import React, { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";

import Btns from "./Buttons";
import participantQ from "./participantQ";
import ProvidersQ from "./providersQ";

const Question = ({ data }) => {
  const {
    path,
    breadcrumbs,
    bCrumbName,
    isPath,
    prevBc,
    updateCrumbs,
    pathReset,
    updateBack,
    isVarData,
    varData,
    setVarData,
    resetVarData,
  } = useContext(GlobalContext);
  let qData = {
    title: "",
    question: "",
    questionAlt: "",
    phoneN: "",
    list: [],
    subList: [],
    stepList: [],
    externalLink: {},
    buttons: [],
    alert: false,
    ...data,
  };
  let backBtn;
  if (prevBc.length <= 0) {
    backBtn = (
      <p
        className="flex cursor-pointer justify-end"
        onClick={() => {
          pathReset("home");
        }}
      >
        Home
      </p>
    );
  } else {
    backBtn = (
      <p
        className="flex cursor-pointer justify-end"
        onClick={() => {
          updateBack(prevBc);
        }}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
        </span>
        Back
      </p>
    );
  }
  let btnSetup = qData.buttons.map((btn, index) => {
    return (
      <Btns
        label={btn.label}
        pathID={btn.pathID}
        cName={btn.cName}
        key={index}
      />
    );
  });
  if (path === "authChoice") {
    return ProvidersQ(qData, btnSetup, backBtn);
  } else {
    return participantQ(qData, btnSetup, backBtn);
  }
};

export default Question;
