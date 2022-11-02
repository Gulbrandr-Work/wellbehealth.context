import cancelData from "../../data/cancelAppointment.json";
import tList from "../../data/triggerListData.json";
import PatientCases from "../../data/patientCases.json";
import EndStep from "../../data/endSteps.json";

export const CancelReq = (path) => {
  const state = {
    source: { ...cancelData.newCancel },
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
          { pathID: "notSick", ...state.baseNoBtn },
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
    case "noSick":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          { pathID: "yesTriggerList", ...state.baseYesBtn },
          { pathID: "noNotlisted", ...state.baseNoBtn },
        ],
      };
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

    // NO TRIGGER LIST
    case "noTriggerList":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          { pathID: "yesNotListed", ...state.baseYesBtn },
          { pathID: "noNotlisted", ...state.baseNoBtn },
        ],
      };
    case "yesNotListed":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          { pathID: "yesSameDay", ...state.baseYesBtn },
          { pathID: "noNotlisted", ...state.baseNoBtn },
        ],
      };
    case "yesSameDay":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          { pathID: "pcpAvailable", ...state.baseYesBtn },
          { pathID: "ispcpAvailable", ...state.baseNoBtn },
        ],
      };
    case "pcpAvailable":
      return {
        title: state.cases[path].title,
        list: state.cases[path].list,
        question: state.cases[path].question,
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
        title: state.cases.pcpAvailable.title,
        list: state.cases.pcpAvailable.list,
        question: state.cases.pcpAvailable.question,
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
    case "ispcpAvailable":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          { pathID: "pcpAvailable", ...state.baseYesBtn },
          { pathID: "pcpUnavailable", ...state.baseNoBtn },
        ],
      };

    case "pcpUnavailable":
      return {
        title: state.source[path].title,
        question: state.source[path].screenQuestion,
        buttons: [
          { pathID: "twoDayAvailable", ...state.baseYesBtn },
          { pathID: "noTwoDayAvail", ...state.baseNoBtn },
        ],
      };
    case "twoDayAvailable":
      return {
        title: state.source[path].title,
        list: state.source[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "twoDayAvailableAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "twoDayAvailableAlert":
      return {
        title: state.source.twoDayAvailable.title,
        list: state.source.twoDayAvailable.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "twoDayAvailable",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noTwoDayAvail":
      return {
        title: state.source[path].title,
        list: state.source[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noTwoDayAvailAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noTwoDayAvailAlert":
      return {
        title: state.source.noTwoDayAvail.title,
        list: state.source.noTwoDayAvail.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noTwoDayAvail",
            ...state.baseNoBtn,
          },
        ],
      };
    case "brokenLogic":
      return {
        title: "broken logic, need clarification",
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };

    // no same day
    case "noSameDay":
      return {
        title: state.source[path].title,
        list: state.source[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noSameDayAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noSameDayAlert":
      return {
        title: state.source.noSameDay.title,
        list: state.source.noSameDay.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noSameDay",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noNotlisted":
      return {
        title: state.source[path].title,
        question: state.source[path].screenQuestion,
        buttons: [
          { pathID: "yesRedPurple", ...state.baseYesBtn },
          { pathID: "noRedPurple", ...state.baseNoBtn },
        ],
      };
    case "yesRedPurple":
      return {
        title: state.source[path].title,
        question: state.source[path].screenQuestion,
        buttons: [
          { pathID: "twoDayAvailable", ...state.baseYesBtn },
          { pathID: "noSameDay", ...state.baseNoBtn },
        ],
      };
    case "noRedPurple":
      return {
        title: state.source[path].title,
        question: state.source[path].screenQuestion,
        buttons: [
          { pathID: "oneWeekAvailable", ...state.baseYesBtn },
          { pathID: "oneWeekUnavailable", ...state.baseNoBtn },
        ],
      };
    case "oneWeekAvailable":
      return {
        title: state.cases[path].title,
        list: state.cases[path].list,
        question: state.endStep.finalQ,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "oneWeekAvailableAlert", ...state.baseNoBtn },
        ],
      };
    case "oneWeekAvailableAlert":
      return {
        title: state.cases.oneWeekAvailable.title,
        list: state.cases.oneWeekAvailable.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "oneWeekAvailable", ...state.baseNoBtn },
        ],
      };
    case "oneWeekUnavailable":
      return {
        title: state.cases[path].title,
        list: state.cases[path].list,
        question: state.endStep.finalQ,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "oneWeekUnavailableAlert", ...state.baseNoBtn },
        ],
      };
    case "oneWeekUnavailableAlert":
      return {
        title: state.cases.oneWeekUnavailable.title,
        list: state.cases.oneWeekUnavailable.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "oneWeekUnavailable", ...state.baseNoBtn },
        ],
      };
    case "notSick":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          {
            pathID: "isInternal",
            label:
              "Internal clinic Appointment (RD, PT, OT, Engagement, Labs etc.).",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "isExternal",
            label:
              "External Specialty Appointment (Onsite Podiatry, Dental, Audiology, Optometry etc.)",
            cName: "options",
            bType: "question",
          },
        ],
      };
    case "isInternal":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          { pathID: "yesScheduled", ...state.baseYesBtn },
          {
            pathID: "newAppt",
            label: "no",
            cName: "red",
            bType: "question",
          },
        ],
      };
    case "yesScheduled":
      return {
        title: state.source[path].title,
        buttons: [
          {
            pathID: "providerAptQ",
            label: "Provider Appointment",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "clinicAptQ",
            label: "Clinic Appointment (RD, PT, OT, Engagement, Labs etc.)",
            cName: "options",
            bType: "question",
          },
        ],
      };
    case "providerAptQ":
      return {
        title: state.source[path].title,
        question: state.source[path].question,
        buttons: [
          { pathID: "providerApt", ...state.baseYesBtn },
          { pathID: "providerApt", ...state.baseNoBtn },
        ],
      };
    case "providerApt":
      return {
        title: state.source[path].title,
        list: state.source[path].list,
        question: state.endStep.finalQ,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "providerAptAlert", ...state.baseNoBtn },
        ],
      };
    case "providerAptAlert":
      return {
        title: state.source.providerApt.title,
        list: state.source.providerApt.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "providerApt", ...state.baseNoBtn },
        ],
      };
    case "clinicAptQ":
      return {
        title: state.source[path].title,
        question: state.source[path].question,
        buttons: [
          { pathID: "clinicApt", ...state.baseYesBtn },
          { pathID: "clinicApt", ...state.baseNoBtn },
        ],
      };
    case "clinicApt":
      return {
        title: state.source[path].title,
        list: state.source[path].list,
        question: state.endStep.finalQ,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "clinicAptAlert", ...state.baseNoBtn },
        ],
      };
    case "clinicAptAlert":
      return {
        title: state.source.clinicApt.title,
        list: state.source.clinicApt.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "clinicApt", ...state.baseNoBtn },
        ],
      };
    case "isExternal":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          { pathID: "nurseOTDUrg", ...state.baseYesBtn },
          { pathID: "oneWeekUnavailable", ...state.baseNoBtn },
        ],
      };
    case "nurseOTDUrg":
      return {
        title: state.source[path].title,
        question: state.source[path].screenQuestion,
        externalLink: {
          url: link,
          name: "See Nurse of the day",
        },
        buttons: [
          { pathID: "yesNurse", ...state.baseYesBtn },
          { pathID: "providerOTDUrg", ...state.baseNoBtn },
        ],
      };
    case "providerOTDUrg":
      return {
        title: state.source[path].title,
        question: state.source[path].screenQuestion,
        externalLink: {
          url: link,
          name: "See Nurse of the day",
        },
        buttons: [
          { pathID: "yesPOTD", ...state.baseYesBtn },
          { pathID: "pcpOTDUrg", ...state.baseNoBtn },
        ],
      };
    case "pcpOTDUrg":
      return {
        title: state.source[path].title,
        question: state.source[path].screenQuestion,
        externalLink: {
          url: link,
          name: "See Nurse of the day",
        },
        buttons: [
          { pathID: "pcpAvailable", ...state.baseYesBtn },
          { pathID: "noResked", ...state.baseNoBtn },
        ],
      };
    // NO RESKED
    case "noResked":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          { pathID: "isOneHour", ...state.baseYesBtn },
          { pathID: "notOneHour", ...state.baseNoBtn },
        ],
      };
    case "isOneHour":
      return {
        title: state.source[path].title,
        list: state.source[path].list,
        question: state.endStep.finalQ,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "isOneHourAlert", ...state.baseNoBtn },
        ],
      };
    case "isOneHourAlert":
      return {
        title: state.source.isOneHour.title,
        list: state.source.isOneHour.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "isOneHour", ...state.baseNoBtn },
        ],
      };
    case "notOneHour":
      return {
        title: state.source[path].title,
        list: state.source[path].list,
        question: state.endStep.finalQ,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "notOneHourAlert", ...state.baseNoBtn },
        ],
      };
    case "notOneHourAlert":
      return {
        title: state.source.notOneHour.title,
        list: state.source.notOneHour.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          { pathID: "anythingElse", ...state.baseYesBtn },
          { pathID: "notOneHour", ...state.baseNoBtn },
        ],
      };
    case "anythingElse":
      return {
        script: state.endStep.anythingElse,
        scriptFin: state.endStep.finishCopy,
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
