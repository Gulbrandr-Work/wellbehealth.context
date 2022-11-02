import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";

const ProvidersQ = (qData, btnSetup, backBtn) => {
  const { setVarData, resetVarData } = useContext(GlobalContext);

  console.log(qData);
  let alertClass = "";
  if (qData.alert) {
    alertClass = "alert";
    setTimeout(() => {
      alertClass = "";
    }, 1000);
  }
  let modList = qData.list.map((li, index) => {
    let str = li.split(":");
    if (str.length <= 2) {
      return (
        <li className="border-b p-2" key={index}>
          <strong>{str[0]}:</strong>
          {str[1]}
        </li>
      );
    } else {
      return (
        <li className="border-b p-2" key={index}>
          <strong>{str[0]}:</strong>
          {str[1]}:{str[2]}
        </li>
      );
    }
  });
  return (
    <div className="flex flex-col w-full border rounded p-4">
      <div className="title-wrap mb-4">
        {backBtn}
        <h2 className="text-2xl w-full">{qData.title}</h2>
        {qData.stepList.length > 0 &&
          qData.stepList.map((step, index) => (
            <p className="text-2xl w-full" key={index}>
              {step}
            </p>
          ))}
      </div>
      {qData.question !== "" && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full">
            <strong>Agent Action:</strong> {qData.question}
          </h3>
        </div>
      )}
      {qData.script && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full">
            <strong>Agent Script: </strong>
            <em> {qData.script}</em>
          </h3>
        </div>
      )}
      {qData.questionAlt !== "" && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full">
            <strong>Agent Action:</strong> {qData.questionAlt}
          </h3>
        </div>
      )}
      {qData.scriptAlt && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full">
            <strong>Agent Script: </strong>
            <em> {qData.scriptAlt}</em>
          </h3>
        </div>
      )}
      {qData.scriptFin && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full">
            <strong>Agent Script (If no further assistance is needed): </strong>
            <em> {qData.scriptFin}</em>
          </h3>
        </div>
      )}
      {qData.extraQ && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full">
            <strong>Agent Action: </strong>
            {qData.extraQ}
          </h3>
        </div>
      )}
      {qData.scriptThird && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full">
            <strong>Agent Script: </strong>
            <em> {qData.scriptThird}</em>
          </h3>
        </div>
      )}
      {qData.externalLink.name && (
        <div className="question-wrap mb-4">
          {qData.phoneN !== "" && (
            <p className="text-xl w-full">{qData.phoneN}</p>
          )}
          <a
            href={qData.externalLink.url}
            target="_blank"
            className="text-xl text-blue-400"
          >
            {qData.externalLink.name}
          </a>
        </div>
      )}
      {!qData.externalLink.name && qData.phoneN !== "" && (
        <div className="question-wrap mb-4">
          <p className="text-xl w-full">{qData.phoneN}</p>
          <br />
        </div>
      )}
      {qData.questionThird && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full">
            <strong>Agent Action: </strong>
            {qData.questionThird}
          </h3>
        </div>
      )}
      {qData.questionFourth && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full">
            <strong>Agent Action: </strong>
            {qData.questionFourth}
          </h3>
        </div>
      )}
      {qData.questionNoAC && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full">
            <strong>Turnaround times:</strong>
            <br />
            {qData.questionNoAC}
          </h3>
        </div>
      )}
      {qData.questionNoAcAlt && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full">{qData.questionNoAcAlt}</h3>
        </div>
      )}
      {qData.list.length > 0 && (
        <ul className="m-2 w-full md:w-1/2 ">{modList}</ul>
      )}
      {qData.endQuestion && (
        <div className="question-wrap mb-4">
          <h2 className={`text-xl w-full mt-5 endQ`}>
            <span className={`${alertClass}`}>{qData.endQuestion}</span>
          </h2>
        </div>
      )}
      <div className="btn-wrap flex flex-wrap ">{btnSetup}</div>
    </div>
  );
};
export default ProvidersQ;
