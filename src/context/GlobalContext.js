import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import PathData from "../data/PathsData.json";

const initialState = {
  path: "Home",
  prevPath: "",
  breadcrumbs: "",
  bCrumbName: "",
  prevBc: [],
  pathName: "Home",
  isPath: true,
  isVarData: false,
  varData: {},
  pData: { ...PathData },
};

//Create Context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const pathTerms = ["Home", "Participants", "Providers"];
  const pathCheck = pathTerms.includes(state.path);
  const crumbList = [
    "newAppointment",
    "cancelAppointment",
    "medicationData",
    "otherData",
    "hospitalAuthorization",
    "otherProvider",
    "authChoice",
  ];
  const cNames = [
    "New Appointment",
    "Cancel Appointment",
    "Medication",
    "Other",
    "Hospital authorization",
    "Provider - Other",
    "Choose Authorization",
  ];
  const crumbCheck = crumbList.includes(state.breadcrumbs);

  const updatePath = (path) => {
    dispatch({
      type: "UPDATE_PATH",
      payload: path,
    });
  };

  const updateCrumbs = (breadcrumb) => {
    dispatch({
      type: "UPDATE_CRUMBS",
      payload: breadcrumb,
    });
  };
  const updateBack = (breadcrumb) => {
    let pl = state.prevBc.slice(0, -1);
    dispatch({
      type: "HANDLE_BACK",
      payload: pl,
    });
  };
  const screenToggle = (toggle) => {
    dispatch({
      type: "SCREEN_TOGGLE",
      payload: toggle,
    });
  };
  const setBcName = (bcName) => {
    dispatch({
      type: "SET_BREADCRUMB_NAME",
      payload: bcName,
    });
  };
  const setPathName = (pathName) => {
    dispatch({
      type: "SET_PATH_NAME",
      payload: pathName,
    });
  };
  const pathReset = (reset) => {
    if (reset === "home") {
      dispatch({
        type: "HOME_RESET",
        payload: initialState,
      });
    }
    if (reset === "participant") {
      dispatch({
        type: "HOME_RESET",
        payload: {
          path: "Participants",
          pathName: "Home",
          isPath: true,
        },
      });
    }
    if (reset === "Provider") {
      dispatch({
        type: "HOME_RESET",
        payload: {
          path: "Providers",
          pathName: "Home",
          isPath: true,
        },
      });
    }
  };
  const setVarData = (varData) => {
    dispatch({
      type: "SET_VAR_DATA",
      payload: varData,
    });
  };
  const resetVarData = (varData) => {
    dispatch({
      type: "RESET_VAR_DATA",
      payload: "",
    });
  };

  if (pathCheck && state.isPath) {
  } else if (!pathCheck && state.isPath) {
    screenToggle({
      isPath: false,
      prevPath: state.path,
      breadcrumbs: state.path,
    });
  }
  if (crumbCheck && !cNames.includes(state.bCrumbName)) {
    switch (state.breadcrumbs) {
      case "newAppointment":
        return setBcName("New Appointment");
      case "cancelAppointment":
        return setBcName("Cancel Appointment");
      case "medicationData":
        return setBcName("Medication");
      case "otherData":
        return setBcName("Other");
      case "hospitalAuthorization":
        return setBcName("Hospital authorization");
      case "authChoice":
        return setBcName("Choose Authorization");
    }
  }
  return (
    <GlobalContext.Provider
      value={{
        path: state.path,
        breadcrumbs: state.breadcrumbs,
        isPath: state.isPath,
        pData: state.pData,
        bCrumbName: state.bCrumbName,
        prevBc: state.prevBc,
        pathName: state.pathName,
        isVarData: state.isVarData,
        varData: state.varData,
        updatePath,
        updateCrumbs,
        screenToggle,
        pathReset,
        updateBack,
        setVarData,
        resetVarData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
