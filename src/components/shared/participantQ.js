const participantQ = (qData, btnSetup, backBtn) => {
  console.log(qData);
  let alertClass = "";
  if (qData.alert) {
    alertClass = "alert";
    setTimeout(() => {
      alertClass = "";
    }, 1000);
  }
  let modList, subList;
  if (qData.list.length > 0 && !qData.isTriggers) {
    modList = qData.list.map((li, index) => {
      let str = li.split(":");
      if (str.length <= 2) {
        return (
          <li className="border-b p-2" key={index}>
            <strong>{str[0]}: </strong>
            {str[1]}
          </li>
        );
      } else {
        return (
          <li className="border-b p-2" key={index}>
            <strong>{str[0]}: </strong>
            {str[1]}:{str[2]}
          </li>
        );
      }
    });
  } else if (qData.list.length > 0 && qData.isTriggers) {
    modList = qData.list.map((li, index) => {
      return (
        <li className="border-b p-2" key={index}>
          {li}
        </li>
      );
    });
  }
  if (qData.subList.length > 0) {
    subList = qData.subList.map((item, index) => {
      return (
        <li className="border-b p-2" key={index}>
          {item}
        </li>
      );
    });
  }
  return (
    <div className="flex flex-col w-full border rounded p-4">
      <div className="title-wrap mb-4">
        {backBtn}
        <h2 className="text-2xl w-full">{qData.title}</h2>
      </div>
      {qData.script && (
        <div className="title-wrap mb-4">
          <h3 className="text-xl w-full">
            <strong>Script for agent: </strong>
            <em>{qData.script}</em>
          </h3>
        </div>
      )}
      {qData.questionAlt !== "" && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full q1">
            <strong>Agent Action:</strong> {qData.questionAlt}
          </h3>
        </div>
      )}
      {qData.altScript && (
        <div className="title-wrap mb-4">
          <h3 className="text-xl w-full">
            {" "}
            <strong>Script for agent: </strong>
            <em>{qData.altScript}</em>
          </h3>
        </div>
      )}
      {qData.questionCase && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full q2">
            <strong>Agent Action:</strong> {qData.questionCase}
          </h3>
        </div>
      )}
      {qData.questionAdds && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full q2">
            <strong>Agent Action:</strong> {qData.questionAdds}
          </h3>
        </div>
      )}
      {qData.list.length > 0 && (
        <ul className="m-2 w-full md:w-1/2 ">
          {modList}
          {qData.subList.length > 0 && (
            <ul className="m-2 w-full md:w-2/3 list-disc list-inside">
              {subList}
            </ul>
          )}
        </ul>
      )}
      {qData.stratData && (
        <div className="question-wrap mb-4 flex">
          <div className="strat md:w-1/4 text-center">
            <div className="strat-title border p-2">
              <p className="text-red-600">
                <strong>RED</strong>
              </p>
            </div>
            <div className="strat-copy border-b border-l border-r p-2">
              <p>Offer in person visit first, but ok to schedule telehealth </p>
            </div>
            <div className="strat-duration border-b border-l border-r p-2">
              <p>
                <strong>1-2 weeks</strong>
              </p>
            </div>
            <div className="strat-type border-b border-l border-r p-2">
              <p>
                <strong>Visit Type:</strong> PCP Follow Up (30) or PCP
                Telehealth (30){" "}
              </p>
            </div>
          </div>

          <div className="strat md:w-1/4 text-center">
            <div className="strat-title border p-2">
              <p className="text-purple-500">
                <strong>PURPLE</strong>
              </p>
            </div>
            <div className="strat-copy border-b border-l border-r p-2">
              <p>Offer in person visit first, but ok to schedule telehealth</p>
            </div>
            <div className="strat-duration border-b border-l border-r p-2">
              <p>
                <strong>1-2 weeks</strong>
              </p>
            </div>
            <div className="strat-type border-b border-l border-r p-2">
              <p>
                <strong>Visit Type:</strong> PCP Follow Up (30) or PCP
                Telehealth (30){" "}
              </p>
            </div>
          </div>

          <div className="strat md:w-1/4 text-center">
            <div className="strat-title border p-2">
              <p className="text-yellow-500">
                <strong>YELLOW</strong>
              </p>
            </div>
            <div className="strat-copy border-b border-l border-r p-2">
              <p>Ok to schedule in person or telehealth</p>
            </div>
            <div className="strat-duration border-b border-l border-r p-2">
              <p>
                <strong>2-3 weeks</strong>
              </p>
            </div>
            <div className="strat-type border-b border-l border-r p-2">
              <p>
                <strong>Visit Type:</strong> PCP Follow Up (30) or PCP
                Telehealth (30)
              </p>
            </div>
          </div>

          <div className="strat md:w-1/4 text-center">
            <div className="strat-title border p-2">
              <p className="text-green-600">
                <strong>GREEN</strong>
              </p>
            </div>
            <div className="strat-copy border-b border-l border-r p-2">
              <p>Ok to schedule in person or telehealth</p>
            </div>
            <div className="strat-duration border-b border-l border-r p-2">
              <p>
                <strong>2-3 weeks</strong>
              </p>
            </div>
            <div className="strat-type border-b border-l border-r p-2">
              <p>
                <strong>Visit Type:</strong> PCP Follow Up (30) or PCP
                Telehealth (30)
              </p>
            </div>
          </div>
        </div>
      )}
      {qData.externalLink.name && (
        <div className="question-wrap mb-4">
          <a
            href={qData.externalLink.url}
            target="_blank"
            className="text-xl text-purple-400"
          >
            {qData.externalLink.name}
          </a>
        </div>
      )}
      {qData.extraQ && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full q3">
            <strong>Agent Action: </strong>
            {qData.extraQ}
          </h3>
        </div>
      )}
      {qData.anotherQ && (
        <div className="question-wrap mb-4">
          <h3 className="text-xl w-full q3">
            <strong>Agent Action: </strong>
            {qData.anotherQ}
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
      {qData.question !== "" && (
        <div className="question-wrap mb-4">
          <h2 className={`text-xl w-full mt-5 endQ`}>
            <span className={`${alertClass}`}>{qData.question}</span>
          </h2>
        </div>
      )}
      <div className="btn-wrap flex mt-3">{btnSetup}</div>
    </div>
  );
};

export default participantQ;
