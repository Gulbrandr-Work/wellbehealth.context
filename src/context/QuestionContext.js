import React, { createContext, useReducer } from "react";
import QuestionReducer from "./QuestionReducer";
import AppointmentData from "../data/appointmentData.json";
import PatientCases from "../data/patientCases.json";
import tList from "../data/triggerListData.json";

const initialState = {
  source: AppointmentData,
  prevSource: null,
  triggers: [...tList.tList],
  baseYesBtn: {
    label: "yes",
    cName: "green",
    bType: "question",
  },
  baseNoBtn: {
    label: "no",
    cName: "red",
    bType: "question",
  },
  cases: PatientCases,
};

export const QuestionContext = createContext(initialState);

export const QuestionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(QuestionReducer, initialState);

  const updateSource = (source) => {
    dispatch({
      type: "UPDATE_SOURCE",
      payload: source,
    });
  };
  return (
    <QuestionContext.Provider
      value={{
        source: state.source,
        prevSource: state.prevSource,
        triggers: state.triggers,
        baseYesBtn: state.baseYesBtn,
        baseNoBtn: state.baseNoBtn,
        cases: state.cases,
        updateSource,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
