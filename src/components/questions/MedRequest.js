import medReqData from "../../data/medicationData.json";
import tList from "../../data/triggerListData.json";
import PatientCases from "../../data/patientCases.json";
import EndStep from "../../data/endSteps.json";

export const MedRequest = (path) => {
  const state = {
    source: { ...medReqData.medicationData },
    prevSource: null,
    triggers: [...tList.tList],
    trigUpdate: [...tList.medList],
    trigSubList: [...tList.medSubList],
    secondL: [...tList.secondList],
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
    endStep: EndStep,
  };
  let link =
    "https://welbepace.sharepoint.com/sites/COSATeamSite/Resources/Forms/AllItems.aspx?id=%2Fsites%2FCOSATeamSite%2FResources%2FMarket%20Profiles&viewid=1c778ef2%2D8703%2D44cb%2D9663%2Dec2105d0af94";

  switch (path) {
    case "medicationData":
      return {
        script: state.source.title,
        questionAlt: state.source.questionAlt,
        question: state.source.screenQuestion,
        list: state.trigUpdate,
        subList: state.trigSubList,
        isTriggers: true,
        buttons: [
          {
            pathID: "yesTriggerList",
            ...state.baseYesBtn,
          },
          {
            pathID: "medQuestion",
            ...state.baseNoBtn,
          },
        ],
      };
    case "medQuestion":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          {
            pathID: "noTriggerList",
            label: "Medication Question ",
            cName: "green",
            bType: "question",
          },
          {
            pathID: "medStatus",
            label: "Medication Status",
            cName: "green",
            bType: "question",
          },
        ],
      };
    case "yesTriggerList":
      return {
        title: state.source.medQuestion[path].nurseOTD.title,
        script: state.source.medQuestion[path].nurseOTD.script,
        question: state.source.medQuestion[path].nurseOTD.screenQuestion,
        externalLink: {
          url: link,
          name: "See center nurse",
        },
        buttons: [
          {
            pathID: "yesNurse",
            ...state.baseYesBtn,
          },
          {
            pathID: "rnSupervisor",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesNurse":
      return {
        questionAlt: state.cases[path].title,
        script: state.cases[path].script,
        list: state.cases[path].list,
        question: "Was patient case completed in Athena? ",
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesNurseAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesNurseAlert":
      return {
        questionAlt: state.cases.yesNurse.title,
        script: state.cases.yesNurse.script,
        list: state.cases.yesNurse.list,
        question: "Was patient case completed in Athena? ",
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesNurse",
            ...state.baseNoBtn,
          },
        ],
      };

    case "rnSupervisor":
      return {
        title: state.source.medQuestion.yesTriggerList.nurseOTD[path].title,
        script: state.source.medQuestion.yesTriggerList.nurseOTD[path].script,
        question:
          state.source.medQuestion.yesTriggerList.nurseOTD[path].screenQuestion,
        buttons: [
          {
            pathID: "yesRnSupervisor",
            ...state.baseYesBtn,
          },
          {
            pathID: "rnManager",
            ...state.baseNoBtn,
          },
        ],
        externalLink: {
          url: link,
          name: "See RN Supervisor of the day",
        },
      };
    case "yesRnSupervisor":
      return {
        script: state.cases[path].script,
        questionAlt: state.cases[path].title,
        question: state.cases[path].question,
        list: state.cases[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesRnSupervisorAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesRnSupervisorAlert":
      return {
        script: state.cases.yesRnSupervisor.script,
        questionAlt: state.cases.yesRnSupervisor.title,
        question: state.cases.yesRnSupervisor.question,
        list: state.cases.yesRnSupervisor.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesRnSupervisor",
            ...state.baseNoBtn,
          },
        ],
      };

    case "rnManager":
      return {
        title:
          state.source.medQuestion.yesTriggerList.nurseOTD.rnSupervisor[path]
            .title,
        script:
          state.source.medQuestion.yesTriggerList.nurseOTD.rnSupervisor[path]
            .script,
        question:
          state.source.medQuestion.yesTriggerList.nurseOTD.rnSupervisor[path]
            .screenQuestion,
        buttons: [
          {
            pathID: "yesRnManager",
            ...state.baseYesBtn,
          },
          {
            pathID: "pcpOTD",
            ...state.baseNoBtn,
          },
        ],
        externalLink: {
          url: link,
          name: "See RN Case Manager of the day",
        },
      };
    case "yesRnManager":
      return {
        questionAlt: state.cases[path].title,
        script: state.cases[path].script,
        question: state.cases[path].question,
        list: state.cases[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesRnManagerAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesRnManagerAlert":
      return {
        questionAlt: state.cases.yesRnManager.title,
        script: state.cases.yesRnManager.script,
        question: state.cases.yesRnManager.question,
        list: state.cases.yesRnManager.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesRnManager",
            ...state.baseNoBtn,
          },
        ],
      };

    case "pcpOTD":
      return {
        title:
          state.source.medQuestion.yesTriggerList.nurseOTD.rnSupervisor
            .rnManager[path].title,
        script:
          state.source.medQuestion.yesTriggerList.nurseOTD.rnSupervisor
            .rnManager[path].script,
        question:
          state.source.medQuestion.yesTriggerList.nurseOTD.rnSupervisor
            .rnManager[path].screenQuestion,
        buttons: [
          {
            pathID: "yesPCPOTDMed",
            ...state.baseYesBtn,
          },
          {
            pathID: "noOTD",
            ...state.baseNoBtn,
          },
        ],
        externalLink: {
          url: link,
          name: "See PCP of the day",
        },
      };
    case "yesPCPOTDMed":
      return {
        script: state.cases[path].script,
        questionAlt: state.cases[path].title,
        question: state.cases[path].question,
        list: state.cases[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesPCPOTDMedAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesPCPOTDMedAlert":
      return {
        script: state.cases.yesPCPOTDMed.script,
        questionAlt: state.cases.yesPCPOTDMed.title,
        question: state.cases.yesPCPOTDMed.question,
        list: state.cases.yesPCPOTDMed.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesPCPOTDMed",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noOTD":
      return {
        questionAlt: state.cases[path].title,
        script: state.cases[path].script,
        list: state.cases[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noOTDAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noOTDAlert":
      return {
        questionAlt: state.cases.noOTD.title,
        script: state.cases.noOTD.script,
        list: state.cases.noOTD.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noOTD",
            ...state.baseNoBtn,
          },
        ],
      };

    case "noTriggerList":
      return {
        title: state.source.medQuestion[path].title,
        script: state.source.medQuestion[path].script,
        questionAlt: state.source.medQuestion[path].questionAlt,
        question: state.source.medQuestion[path].endQ,
        list: state.source.medQuestion[path].list,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noTriggerListConfirm",
            ...state.baseNoBtn,
          },
        ],
      };

    case "noTriggerListConfirm":
      return {
        title: state.source.medQuestion.noTriggerList.title,
        script: state.source.medQuestion.noTriggerList.script,
        questionAlt: state.source.medQuestion.noTriggerList.questionAlt,
        question: state.source.medQuestion.noTriggerList.endQ,
        list: state.source.medQuestion.noTriggerList.list,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noTriggerList",
            ...state.baseNoBtn,
          },
        ],
      };
    case "medStatus":
      return {
        title: state.source[path].screenQuestion,
        question: state.source[path].question,
        buttons: [
          {
            pathID: "yesMedName",
            ...state.baseYesBtn,
          },
          {
            pathID: "noMedName",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesMedName":
      return {
        title: state.source.medStatus[path].screenQuestion,
        question: state.source.medStatus[path].question,
        buttons: [
          {
            pathID: "medStatusCheck",
            ...state.baseYesBtn,
          },
          {
            pathID: "noMedHistory",
            ...state.baseNoBtn,
          },
        ],
      };
    case "medStatusCheck":
      return {
        title: state.source.medStatus.yesMedName[path].screenQuestion,
        question: state.source.medStatus.yesMedName[path].question,
        buttons: [
          {
            pathID: "medStatusCheckYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "medStatusCheckNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "medStatusCheckYes":
      return {
        title: state.source.medStatus.yesMedName[path].title,
        buttons: [
          {
            pathID: "medStatusCheckYesCase",
            ...state.baseYesBtn,
          },
          {
            pathID: "medStatusCheckNoCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "medStatusCheckYesCase":
      return {
        script: state.source.medStatus.yesMedName[path].script,
        questionAlt: state.source.medStatus.yesMedName[path].title,
        list: state.source.medStatus.yesMedName[path].list,
        question: state.source.medStatus.yesMedName[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "medStatusCheckYesCaseAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "medStatusCheckYesCaseAlert":
      return {
        script: state.source.medStatus.yesMedName.medStatusCheckYesCase.script,
        questionAlt:
          state.source.medStatus.yesMedName.medStatusCheckYesCase.title,
        list: state.source.medStatus.yesMedName.medStatusCheckYesCase.list,
        question: state.source.medStatus.yesMedName.medStatusCheckYesCase.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "medStatusCheckYesCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "medStatusCheckNoCase":
      return {
        script: state.source.medStatus.yesMedName[path].script,
        questionAlt: state.source.medStatus.yesMedName[path].title,
        list: state.source.medStatus.yesMedName[path].list,
        question: state.source.medStatus.yesMedName[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "medStatusCheckNoCaseAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "medStatusCheckNoCaseAlert":
      return {
        script: state.source.medStatus.yesMedName.medStatusCheckNoCase.script,
        questionAlt:
          state.source.medStatus.yesMedName.medStatusCheckNoCase.title,
        list: state.source.medStatus.yesMedName.medStatusCheckNoCase.list,
        question: state.source.medStatus.yesMedName.medStatusCheckNoCase.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "medStatusCheckNoCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "medStatusCheckNo":
      return {
        script: state.source.medStatus.yesMedName[path].script,
        questionAlt: state.source.medStatus.yesMedName[path].title,
        list: state.source.medStatus.yesMedName[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "medStatusCheckNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "medStatusCheckNoAlert":
      return {
        script: state.source.medStatus.yesMedName.medStatusCheckNo.script,
        questionAlt: state.source.medStatus.yesMedName.medStatusCheckNo.title,
        list: state.source.medStatus.yesMedName.medStatusCheckNo.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "medStatusCheckNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesMedHistory":
      return {
        title: state.source.medStatus.yesMedName[path].title,
        list: state.source.medStatus.yesMedName[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesMedHistoryAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesMedHistoryAlert":
      return {
        title: state.source.medStatus.yesMedName.yesMedHistory.title,
        list: state.source.medStatus.yesMedName.yesMedHistory.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesMedHistory",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noMedHistory":
      return {
        script: state.source.medStatus.yesMedName[path].script,
        questionAlt: state.source.medStatus.yesMedName[path].title,
        list: state.source.medStatus.yesMedName[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noMedHistoryAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noMedHistoryAlert":
      return {
        script: state.source.medStatus.yesMedName.noMedHistory.script,
        questionAlt: state.source.medStatus.yesMedName.noMedHistory.title,
        list: state.source.medStatus.yesMedName.noMedHistory.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noMedHistory",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noMedName":
      return {
        script: state.source.medStatus[path].script,
        questionAlt: state.source.medStatus[path].title,
        list: state.source.medStatus[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noMedNameAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noMedNameAlert":
      return {
        script: state.source.medStatus.noMedName.script,
        questionAlt: state.source.medStatus.noMedName.title,
        list: state.source.medStatus.noMedName.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noMedName",
            ...state.baseNoBtn,
          },
        ],
      };
    case "anythingElse":
      return {
        script: state.endStep.anythingElse,
        scriptFin:
          "Thank you for calling WelbeHealth. It has been a pleasure assisting you. Please call us back if you need any further assistance.",
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    default:
      return {
        title: `Could not find ${path}, please check case`,
      };
  }
};
