import cancelData from "../../data/newCancelAppt.json";
import tList from "../../data/triggerListData.json";
import PatientCases from "../../data/patientCases.json";
import EndStep from "../../data/endSteps.json";

export const CancelNew = (path) => {
  const state = {
    source: { ...cancelData.cancel },
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
    endStep: EndStep,
  };

  let link =
    "https://welbepace.sharepoint.com/sites/COSATeamSite/Resources/Forms/AllItems.aspx?id=%2Fsites%2FCOSATeamSite%2FResources%2FMarket%20Profiles&viewid=1c778ef2%2D8703%2D44cb%2D9663%2Dec2105d0af94";
  switch (path) {
    case "cancelAppointment":
      return {
        title: state.source.screenQuestion,
        buttons: [
          { pathID: "isSick", ...state.baseYesBtn },
          { pathID: "isSick", ...state.baseNoBtn },
        ],
      };
    case "isSick":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          { pathID: "yesSick", ...state.baseYesBtn },
          { pathID: "noSick", ...state.baseNoBtn },
        ],
      };
    case "yesSick":
      return {
        title: state.source[path].screenQuestion,
        list: state.triggers,
        buttons: [
          { pathID: "nurseOTD", ...state.baseYesBtn },
          { pathID: "noTriggerList", ...state.baseNoBtn },
        ],
      };
    // NURSE PATH YES TRIGGER LIST
    case "nurseOTD":
      return {
        title: state.source[path].title,
        question: state.source[path].screenQuestion,
        externalLink: {
          url: link,
          name: "See Nurse of the day",
        },
        buttons: [
          { pathID: "yesNurse", ...state.baseYesBtn },
          { pathID: "providerOTD", ...state.baseNoBtn },
        ],
      };
    case "yesNurse":
      return {
        title: state.cases[path].title,
        list: state.cases[path].list,
        question: state.endStep.finalQ,
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
        title: state.cases.yesNurse.title,
        list: state.cases.yesNurse.list,
        question: state.endStep.finalQ,
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
    // ProviderOTD path
    case "providerOTD":
      return {
        title: state.source[path].title,
        question: state.source[path].screenQuestion,
        externalLink: {
          url: link,
          name: "See Provider of the day",
        },
        buttons: [
          { pathID: "yesPOTD", ...state.baseYesBtn },
          { pathID: "pcpOTD", ...state.baseNoBtn },
        ],
      };
    case "yesPOTD":
      return {
        title: state.cases[path].title,
        list: state.cases[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesPOTDAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesPOTDAlert":
      return {
        title: state.cases.yesPOTD.title,
        list: state.cases.yesPOTD.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesPOTD",
            ...state.baseNoBtn,
          },
        ],
      };
    // PCP Path
    case "pcpOTD":
      return {
        title: state.source[path].title,
        question: state.source[path].screenQuestion,
        externalLink: {
          url: link,
          name: "See PCP of the day",
        },
        buttons: [
          { pathID: "pcpAvailable", ...state.baseYesBtn },
          {
            pathID: "noPCPavail",
            ...state.baseNoBtn,
          },
        ],
      };
    case "pcpAvailable":
      return {
        title: state.source[path].title,
        list: state.cases[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "pcpAvailableAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "pcpAvailableAlert":
      return {
        title: state.source.pcpAvailable.title,
        list: state.cases.pcpAvailable.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "pcpAvailable",
            ...state.baseNoBtn,
          },
        ],
      };

    case "noPCPavail":
      return {
        title: state.cases[path].title,
        list: state.cases[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noPCPavailAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noPCPavailAlert":
      return {
        title: state.cases.noPCPavail.title,
        list: state.cases.noPCPavail.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noPCPavail",
            ...state.baseNoBtn,
          },
        ],
      };
    case "anythingElse":
      return {
        script: state.endStep.anythingElse,
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
        title: `${path} not found!!!`,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
  }
};
