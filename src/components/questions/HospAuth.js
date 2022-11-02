import providerData from "../../data/providerData.json";
import tList from "../../data/triggerListData.json";
import PatientCases from "../../data/patientCases.json";

export const HospAuth = (path) => {
  const state = {
    source: { ...providerData.provider },
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
    varData: {
      title: "",
      list: [],
    },
  };

  let link =
    "https://welbepace.sharepoint.com/sites/COSATeamSite/Resources/Forms/AllItems.aspx?id=%2Fsites%2FCOSATeamSite%2FResources%2FMarket%20Profiles&viewid=1c778ef2%2D8703%2D44cb%2D9663%2Dec2105d0af94";

  switch (path) {
    case "authChoice":
      return {
        title: state.source.authChoice.title,
        varData: true,
        varDataSet: {
          title: "var set title",
        },
        buttons: [
          {
            pathID: "hospitalAuthorization",
            ...state.baseYesBtn,
            label: "Hospital",
            cName: "blue",
          },
          {
            pathID: "specialist",
            ...state.baseYesBtn,
            label: "Specialist",
            cName: "blue",
          },
        ],
      };
    case "specialist":
      return {
        script: state.source.specialist.script,
        question: state.source.specialist.question,
        endQuestion: state.source.specialist.endQuestion,
        buttons: [
          {
            pathID: "specialAuth",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPre",
            ...state.baseNoBtn,
          },
        ],
      };
    case "specialAuth":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].questionAlt,
        buttons: [
          {
            pathID: "specialAuthYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "specialAuthPreNo",
            ...state.baseNoBtn,
          },
        ],
      };

    case "specialAuthPreNoUpdated":
      return {
        script: state.source.specialist[path].script,
        buttons: [
          {
            pathID: "specialAuthNo",
            ...state.baseYesBtn,
          },
          {
            pathID: "specialAuthPreNoCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "specialAuthPreNoCase":
      return {
        title: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "specialAuthPreNoCaseFin",
            ...state.baseYesBtn,
          },
          {
            pathID: "specialAuthPreNoCaseAlert",
            ...state.baseNoBtn,
          },
        ],
      };

    case "specialAuthPreNoCaseAlert":
      return {
        title: state.source.specialist.specialAuthPreNoCase.title,
        list: state.source.specialist.specialAuthPreNoCase.list,
        endQuestion: state.source.specialist.specialAuthPreNoCase.endQ,
        alert: true,
        buttons: [
          {
            pathID: "specialAuthPreNoCaseFin",
            ...state.baseYesBtn,
          },
          {
            pathID: "specialAuthPreNoCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "specialAuthPreNoCaseFin":
      return {
        script: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "specialAuthPreNo":
      return {
        script: state.source.specialist[path].script,
        phoneN: state.source.specialist[path].phoneN,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        questionThird: state.source.specialist[path].questionThird,
        externalLink: {
          url: "https://welbehealth.com/partner/",
          name: "welbehealth.com/partner",
        },
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "specialAuthPreNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "specialAuthPreNoAlert":
      return {
        script: state.source.specialist.specialAuthPreNo.script,
        phoneN: state.source.specialist.specialAuthPreNo.phoneN,
        list: state.source.specialist.specialAuthPreNo.list,
        endQuestion: state.source.specialist.specialAuthPreNo.endQ,
        questionThird: state.source.specialist.specialAuthPreNo.questionThird,
        alert: true,
        externalLink: {
          url: "https://welbehealth.com/partner/",
          name: "welbehealth.com/partner",
        },
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "specialAuthPreNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saPre":
      return {
        script: state.source.specialist[path].title,
        questionAlt: state.source.specialist[path].question,
        buttons: [
          {
            pathID: "saPreYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreNoCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saPreNoCase":
      return {
        title: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saPreNo",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreNoCaseAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saPreNoCaseAlert":
      return {
        title: state.source.specialist.saPreNoCase.title,
        list: state.source.specialist.saPreNoCase.list,
        endQuestion: state.source.specialist.saPreNoCase.endQ,
        alert: true,
        buttons: [
          {
            pathID: "saPreNo",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreNoCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saPreYes":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].questionAlt,
        buttons: [
          {
            pathID: "saPreYesUpdate",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreYesUpdate",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saPreYesUpdate":
      return {
        question: state.source.specialist[path].title,
        endQuestion: state.source.specialist[path].endQuestion,
        buttons: [
          {
            pathID: "saPreAptYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "preAptNoNoAvail",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saPreAptYes":
      return {
        script: state.source.specialist[path].title,
        questionAlt: state.source.specialist[path].endQuestion,
        buttons: [
          {
            pathID: "saPreAptConfirmYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreAptConfirmNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saPreAptConfirmYes":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].questionAlt,
        extraQ: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreAptConfirmYesAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saPreAptConfirmYesAlert":
      return {
        script: state.source.specialist.saPreAptConfirmYes.script,
        questionAlt: state.source.specialist.saPreAptConfirmYes.questionAlt,
        extraQ: state.source.specialist.saPreAptConfirmYes.title,
        list: state.source.specialist.saPreAptConfirmYes.list,
        endQuestion: state.source.specialist.saPreAptConfirmYes.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreAptConfirmYes",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saPreAptConfirmNo":
      return {
        title: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "saAptConf",
            ...state.baseYesBtn,
          },
          {
            pathID: "saAptUnconf",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saAptConf":
      return {
        question: state.source.specialist[path].title,
        script: state.source.finishCopy.title,
        scriptFin: state.source.finishCopy.noAssist,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "saAptUnconf":
      return {
        title: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "saAptUnconfAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saAptUnconfAlert":
      return {
        title: state.source.specialist.saAptUnconf.title,
        list: state.source.specialist.saAptUnconf.list,
        endQuestion: state.source.specialist.saAptUnconf.endQ,
        alert: true,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "saAptUnconf",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saPreAptNo":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].questionAlt,
        extraQ: state.source.specialist[path].extraQ,
        questionThird: state.source.specialist[path].questionThird,
        questionFourth: state.source.specialist[path].questionFourth,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "preAptNoAvail",
            ...state.baseYesBtn,
          },
          {
            pathID: "preAptNoNoAvail",
            ...state.baseNoBtn,
          },
        ],
      };
    case "preAptNoAvail":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "preAptNoAvailAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "preAptNoAvailAlert":
      return {
        script: state.source.specialist.preAptNoAvail.script,
        questionAlt: state.source.specialist.preAptNoAvail.title,
        list: state.source.specialist.preAptNoAvail.list,
        endQuestion: state.source.specialist.preAptNoAvail.endQ,
        alert: true,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "preAptNoAvail",
            ...state.baseNoBtn,
          },
        ],
      };

    case "preAptNoAvailConf":
      return {
        script: state.source.specialist[path].script,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "preAptNoNoAvail":
      return {
        script: state.source.specialist[path].script,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "preAptNoNoAvailYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "preAptNoNoAvailNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "preAptNoNoAvailYes":
      return {
        title: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "preAptNoAvail",
            ...state.baseYesBtn,
          },
          {
            pathID: "preReschNoAvail",
            ...state.baseNoBtn,
          },
        ],
      };
    case "preReschNoAvail":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].questionAlt,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "preReschNoAvailAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "preReschNoAvailAlert":
      return {
        script: state.source.specialist.preReschNoAvail.script,
        questionAlt: state.source.specialist.preReschNoAvail.questionAlt,
        list: state.source.specialist.preReschNoAvail.list,
        endQuestion: state.source.specialist.preReschNoAvail.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "preReschNoAvail",
            ...state.baseNoBtn,
          },
        ],
      };
    case "preAptNoNoAvailNo":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].questionAlt,
        extraQ: state.source.specialist[path].extraQ,
        questionThird: state.source.specialist[path].questionThird,
        questionFourth: state.source.specialist[path].questionFourth,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "preAptNoNoAvailNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "preAptNoNoAvailNoAlert":
      return {
        script: state.source.specialist.preAptNoNoAvailNo.script,
        questionAlt: state.source.specialist.preAptNoNoAvailNo.questionAlt,
        extraQ: state.source.specialist.preAptNoNoAvailNo.extraQ,
        questionThird: state.source.specialist.preAptNoNoAvailNo.questionThird,
        questionFourth:
          state.source.specialist.preAptNoNoAvailNo.questionFourth,
        endQuestion: state.source.specialist.preAptNoNoAvailNo.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "preAptNoNoAvailNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saPreNo":
      return {
        script: state.source.specialist[path].script,
        scriptFin: state.source.specialist[path].scriptFin,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "specialAuthYes":
      return {
        title: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "specialAuthOptions",
            ...state.baseYesBtn,
          },
          {
            pathID: "specialAuthPreNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "specialAuthOptions":
      return {
        title: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "saoApproved",
            label: "Approved",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "saoPended",
            label: "Pended/Requested/To Medical Director",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "saoDenied",
            label: "Denied",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "saoNoAuthYesConfirm",
            label: "No Authorization Needed",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "saoCanceled",
            label: "Cancelled",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "saoModified",
            label: "Modified",
            cName: "options",
            bType: "question",
          },
        ],
      };
    case "saoApproved":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].question,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saoApprovedYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoApprovedNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoApprovedYes":
      return {
        question: state.source.specialist[path].question,
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].questionAlt,
        scriptAlt: state.source.specialist[path].scriptAlt,

        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoApprovedYesAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoApprovedNo":
      return {
        question: state.source.specialist[path].question,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoApprovedNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoApprovedNoAlert":
      return {
        question: state.source.specialist.saoApprovedNo.question,
        list: state.source.specialist.saoApprovedNo.list,
        endQuestion: state.source.specialist.saoApprovedNo.endQ,
        alert: true,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoApprovedNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoApprovedYesAlert":
      return {
        question: state.source.specialist.saoApprovedYes.question,
        script: state.source.specialist.saoApprovedYes.script,
        questionAlt: state.source.specialist.saoApprovedYes.questionAlt,
        scriptAlt: state.source.specialist.saoApprovedYes.scriptAlt,
        list: state.source.specialist.saoApprovedYes.list,
        endQuestion: state.source.specialist.saoApprovedYes.endQ,
        alert: true,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoApprovedYes",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoApprovedAnythingElse":
      return {
        scriptFin: state.source.finishCopy.noAssist,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "saoPended":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].title,
        questionNoAC: state.source.specialist[path].qNoAction,
        questionNoAcAlt: state.source.specialist[path].qNoActionAlt,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saoPendedCase",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoPendedNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoPendedCase":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].question,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saoPendedYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoPendedCaseAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoPendedCaseAlert":
      return {
        script: state.source.specialist.saoPendedCase.script,
        questionAlt: state.source.specialist.saoPendedCase.question,
        list: state.source.specialist.saoPendedCase.list,
        endQuestion: state.source.specialist.saoPendedCase.endQ,
        alert: true,
        buttons: [
          {
            pathID: "saoPendedYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoPendedCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoPendedYes":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].question,
        buttons: [
          {
            pathID: "saPreYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoPendedYesConfirm":
      return {
        title: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCaseComplete",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoPendedNoConfirm":
      return {
        title: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "saoPendedNo":
      return {
        script: state.source.specialist[path].title,
        questionAlt: state.source.specialist[path].question,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoPendedNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoPendedNoAlert":
      return {
        script: state.source.specialist.saoPendedNo.title,
        questionAlt: state.source.specialist.saoPendedNo.question,
        list: state.source.specialist.saoPendedNo.list,
        endQuestion: state.source.specialist.saoPendedNo.endQ,
        alert: true,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoPendedNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDenied":
      return {
        script: state.source.specialist[path].title,
        questionAlt: state.source.specialist[path].question,
        buttons: [
          {
            pathID: "saoDeniedYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedYes":
      return {
        script: state.source.specialist[path].title,
        endQuestion: state.source.specialist[path].endQ,
        list: state.source.specialist[path].list,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedYesAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedYesAlert":
      return {
        script: state.source.specialist.saoDeniedYes.title,
        endQuestion: state.source.specialist.saoDeniedYes.endQ,
        list: state.source.specialist.saoDeniedYes.list,
        alert: true,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedYes",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedYesYes":
      return {
        title: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saoDeniedYesConfirm",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedNoConfirm",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedYesConfirm":
      return {
        script: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "saoDeniedNoConfirm":
      return {
        title: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedNoConfirmAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedNoConfirmAlert":
      return {
        title: state.source.specialist.saoDeniedNoConfirm.title,
        list: state.source.specialist.saoDeniedNoConfirm.list,
        endQuestion: state.source.specialist.saoDeniedNoConfirm.endQ,
        alert: true,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedNoConfirm",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedNo":
      return {
        title: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "deniedSaPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "deniedSaPre":
      return {
        script: state.source.specialist[path].title,
        questionAlt: state.source.specialist[path].question,
        buttons: [
          {
            pathID: "saoDeniedYesUpdated",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreYes",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedNoAlert":
      return {
        title: state.source.specialist.saoDeniedNo.title,
        list: state.source.specialist.saoDeniedNo.list,
        endQuestion: state.source.specialist.saoDeniedNo.endQ,
        alert: true,
        buttons: [
          {
            pathID: "saoDeniedYesUpdated",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedYesUpdated":
      return {
        script: state.source.specialist[path].script,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saoDeniedYesNew",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreYes",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedYesNew":
      return {
        question: state.source.specialist[path].question,
        buttons: [
          {
            pathID: "saoDeniedYNewYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedYNewNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedYNewYes":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].questionAlt,
        extraQ: state.source.specialist[path].extraQ,
        questionThird: state.source.specialist[path].questionThird,
        questionFourth: state.source.specialist[path].questionFourth,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedYNewYesAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedYNewYesAlert":
      return {
        script: state.source.specialist.saoDeniedYNewYes.script,
        questionAlt: state.source.specialist.saoDeniedYNewYes.questionAlt,
        extraQ: state.source.specialist.saoDeniedYNewYes.extraQ,
        questionThird: state.source.specialist.saoDeniedYNewYes.questionThird,
        questionFourth: state.source.specialist.saoDeniedYNewYes.questionFourth,
        endQuestion: state.source.specialist.saoDeniedYNewYes.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedYNewYes",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoDeniedYNewNo":
      return {
        script: state.source.specialist[path].script,
        scriptAlt: state.source.finishCopy.title,
        scriptFin: state.source.finishCopy.noAssist,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "saoNoAuth":
      return {
        script: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "saoNoAuthYesConfirm",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoNoAuthNoConfirm",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoNoAuthYesConfirm":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoNoAuthYesConfirmAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoNoAuthYesConfirmAlert":
      return {
        script: state.source.specialist.saoNoAuthYesConfirm.script,
        questionAlt: state.source.specialist.saoNoAuthYesConfirm.title,
        list: state.source.specialist.saoNoAuthYesConfirm.list,
        endQuestion: state.source.specialist.saoNoAuthYesConfirm.endQ,
        alert: true,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoNoAuthYesConfirm",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoNoAuthNoConfirm":
      return {
        title: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoNoAuthNoConfirmAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoNoAuthNoConfirmAlert":
      return {
        title: state.source.specialist.saoNoAuthNoConfirm.title,
        list: state.source.specialist.saoNoAuthNoConfirm.list,
        endQuestion: state.source.specialist.saoNoAuthNoConfirm.endQ,
        alert: true,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoNoAuthNoConfirm",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoCanceled":
      return {
        script: state.source.specialist[path].title,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saoCanceledYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoCanceledNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoCanceledYes":
      return {
        title: state.source.specialist[path].title,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saoCanceledYesConfirm",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoDeniedNoConfirm",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoCanceledYesConfirm":
      return {
        script: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoCanceledYesConfirmAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoCanceledYesConfirmAlert":
      return {
        script: state.source.specialist.saoCanceledYesConfirm.title,
        list: state.source.specialist.saoCanceledYesConfirm.list,
        endQuestion: state.source.specialist.saoCanceledYesConfirm.endQ,
        alert: true,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoCanceledYesConfirm",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoCanceledYesFinal":
      return {
        title: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "saoCanceledNo":
      return {
        title: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "cancelledSaPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoCanceledNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoCanceledNoAlert":
      return {
        title: state.source.specialist.saoCanceledNo.title,
        list: state.source.specialist.saoCanceledNo.list,
        endQuestion: state.source.specialist.saoCanceledNo.endQ,
        alert: true,
        buttons: [
          {
            pathID: "cancelledSaPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoCanceledNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "cancelledSaPre":
      return {
        script: state.source.specialist[path].title,
        questionAlt: state.source.specialist[path].question,
        buttons: [
          {
            pathID: "cancelledSaPreYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreYes",
            ...state.baseNoBtn,
          },
        ],
      };
    case "cancelledSaPreYes":
      return {
        script: state.source.specialist[path].script,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saoDeniedYesNew",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreYes",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoCanceledNoFinal":
      return {
        title: "Please document patient case in Athena",
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "saoModified":
      return {
        script: state.source.specialist[path].title,
        questionAlt: state.source.specialist[path].questionAlt,
        extraQ: state.source.specialist[path].extraQ,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoModifiedAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoModifiedAlert":
      return {
        script: state.source.specialist.saoModified.title,
        questionAlt: state.source.specialist.saoModified.questionAlt,
        extraQ: state.source.specialist.saoModified.extraQ,
        list: state.source.specialist.saoModified.list,
        endQuestion: state.source.specialist.saoModified.endQ,
        alert: true,
        buttons: [
          {
            pathID: "saPre",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoModified",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoModifiedYesConfirmed":
      return {
        title: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "sModYesConfYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "sModYesConfNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "sModYesConfYes":
      return {
        title: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "sModYesConfYesCase",
            ...state.baseYesBtn,
          },
          {
            pathID: "sModYesConfNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "sModYesConfYesCase":
      return {
        title: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "sModYesConfYesCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "sModYesConfNo":
      return {
        title: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "sModYesConfNoMark",
            ...state.baseYesBtn,
          },
          {
            pathID: "sModYesConfNoCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "sModYesConfNoMark":
      return {
        title: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "sModYesConfNoCase":
      return {
        title: state.source.specialist[path].title,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "sModYesConfYesCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "specialAuthNo":
      return {
        script: state.source.specialist[path].script,
        buttons: [
          {
            pathID: "specialAuthNoConfirm",
            ...state.baseYesBtn,
          },
          {
            pathID: "saPreYesUpdate",
            ...state.baseNoBtn,
          },
        ],
      };
    case "specialAuthNoConfirm":
      return {
        script: state.source.specialist[path].script,
        questionAlt: state.source.specialist[path].question,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "specialAuthNoConfirmAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "specialAuthNoConfirmAlert":
      return {
        script: state.source.specialist.specialAuthNoConfirm.script,
        questionAlt: state.source.specialist.specialAuthNoConfirm.question,
        list: state.source.specialist.specialAuthNoConfirm.list,
        endQuestion: state.source.specialist.specialAuthNoConfirm.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "specialAuthNoConfirm",
            ...state.baseNoBtn,
          },
        ],
      };
    case "specialAuthYesNotSure":
      return {
        title: state.source.specialist[path].title,
        buttons: [
          {
            pathID: "saoModifiedYesConfirmed",
            ...state.baseYesBtn,
          },
          {
            pathID: "saoNotSureNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "saoNotSureNo":
      return {
        title: state.source.specialist[path].title,
        question: state.source.specialist[path].question,
        list: state.source.specialist[path].list,
        endQuestion: state.source.specialist[path].endQ,
        externalLink: {
          url: "https://welbehealth.com/partner/",
          name: "welbehealth.com/partner",
        },
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCaseComplete",
            ...state.baseNoBtn,
          },
        ],
      };
    case "hospitalAuthorization":
      return {
        script: state.source.hospital.script,
        endQuestion: state.source.hospital.endQ,
        buttons: [
          {
            pathID: "isAuthRequest",
            ...state.baseYesBtn,
          },
          {
            pathID: "noAuthRequest",
            ...state.baseNoBtn,
          },
        ],
      };
    case "isAuthRequest":
      return {
        title: state.source.hospital[path].title,
        question: state.source.hospital[path].screenQuestion,
        buttons: [
          {
            pathID: "quickCapOptions",
            ...state.baseYesBtn,
          },
          {
            pathID: "noApprovedQC",
            ...state.baseNoBtn,
          },
        ],
      };
    case "quickCapOptions":
      return {
        title: state.source.hospital[path].title,
        buttons: [
          {
            pathID: "qCApproved",
            label: "Approved",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "qCPended",
            label: "Pended/Requested/To Medical Director",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "qCDenied",
            label: "Denied",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "qCNoAuthorizationNeeded",
            label: "No Authorization Needed",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "qCCanceled",
            label: "Cancelled",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "qCModified",
            label: "Modified",
            cName: "options",
            bType: "question",
          },
        ],
      };
    case "qCApproved":
      return {
        script: state.source.hospital[path].script,
        questionAlt: state.source.hospital[path].title,
        endQuestion: state.source.hospital[path].endQuestion,
        buttons: [
          {
            pathID: "yesQcApp",
            ...state.baseYesBtn,
          },
          {
            pathID: "noQcApp",
            ...state.baseNoBtn,
          },
        ],
      };

    case "yesQcApp":
      return {
        question: state.source.hospital[path].question,
        script: state.source.hospital[path].script,
        questionAlt: state.source.hospital[path].questionAlt,
        scriptThird: state.source.hospital[path].endQuestion,
        list: state.source.hospital[path].list,
        endQuestion: state.source.hospital[path].screenQuestion,
        buttons: [
          {
            pathID: "qCappSucces",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesQcAppAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noQcApp":
      return {
        title: state.source.hospital[path].title,
        list: state.source.hospital[path].list,
        endQuestion: state.source.hospital[path].endQ,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "noQcAppAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noQcAppAlert":
      return {
        title: state.source.hospital.noQcApp.title,
        list: state.source.hospital.noQcApp.list,
        endQuestion: state.source.hospital.noQcApp.endQ,
        alert: true,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "noQcApp",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCappSucces":
      return {
        script: state.source.hospital[path].title,

        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "yesQcAppAlert":
      return {
        question: state.source.hospital.yesQcApp.question,
        script: state.source.hospital.yesQcApp.script,
        questionAlt: state.source.hospital.yesQcApp.questionAlt,
        scriptThird: state.source.hospital.yesQcApp.endQuestion,
        list: state.source.hospital.yesQcApp.list,
        endQuestion: state.source.hospital.yesQcApp.screenQuestion,
        alert: true,
        buttons: [
          {
            pathID: "qCappSucces",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesQcApp",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCappfailed":
      return {
        stepList: state.source.hospital.yesQcApp.steplist,
        list: state.source.hospital.yesQcApp.list,
        endQuestion: state.source.hospital.yesQcApp.screenQuestion,
        alert: true,
        buttons: [
          {
            pathID: "qCappSucces",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesQcApp",
            ...state.baseNoBtn,
          },
        ],
      };

    case "qCappFail":
      return {
        title: state.source.hospital[path].title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };

    case "qCPended":
      return {
        script: state.source.hospital[path].title,
        questionAlt: state.source.hospital[path].screenQuestion,
        endQuestion: state.source.hospital[path].endQ,
        buttons: [
          {
            pathID: "qCPendedYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCappNoAvail",
            ...state.baseNoBtn,
          },
        ],
      };

    case "qCPendedYes":
      return {
        script: state.source.hospital[path].script,
        questionAlt: state.source.hospital[path].question,
        list: state.source.hospital[path].list,
        endQuestion: state.source.finishCopy.endQ,
        buttons: [
          {
            pathID: "qCappSucces",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCPendedYesAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCPendedYesAlert":
      return {
        script: state.source.hospital.qCPendedYes.script,
        questionAlt: state.source.hospital.qCPendedYes.question,
        list: state.source.hospital.qCPendedYes.list,
        endQuestion: state.source.finishCopy.endQ,
        alert: true,
        buttons: [
          {
            pathID: "qCappSucces",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCPendedYes",
            ...state.baseNoBtn,
          },
        ],
      };

    case "qCappNoAvail":
      return {
        script: state.source.hospital[path].title,
        questionAlt: state.source.hospital[path].screenQuestion,
        list: state.source.hospital[path].list,
        endQuestion: state.source.hospital[path].endQ,
        buttons: [
          {
            pathID: "qCappnoAvailFin",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCappNoAvailAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCappnoAvailFin":
      return {
        script: state.source.anythingElse.title,
        scriptFin: state.source.finishCopy.title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "qCappNoAvailAlert":
      return {
        script: state.source.hospital.qCappNoAvail.title,
        questionAlt: state.source.hospital.qCappNoAvail.screenQuestion,
        list: state.source.hospital.qCappNoAvail.list,
        endQuestion: state.source.hospital.qCappNoAvail.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCappNoAvail",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCDenied":
      return {
        questionAlt: state.source.hospital[path].title,
        script: state.source.hospital[path].script,
        endQuestion: state.source.hospital[path].endQ,
        buttons: [
          {
            pathID: "yesQcDenied",
            ...state.baseYesBtn,
          },
          {
            pathID: "noQcDenied",
            ...state.baseNoBtn,
          },
        ],
      };

    case "yesQcDenied":
      return {
        script: state.source.hospital[path].script,
        question: state.source.hospital[path].question,
        endQuestion: state.source.hospital[path].screenQuestion,
        list: state.source.hospital[path].list,
        buttons: [
          {
            pathID: "yesQcDeniedFin",
            label: "Yes",
            cName: "green",
            bType: "question",
          },
          {
            pathID: "yesQcDeniedAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesQcDeniedAlert":
      return {
        title: state.source.hospital.noQcDenied.title,
        script: state.source.hospital.noQcDenied.screenQuestion,
        list: state.source.hospital.noQcDenied.list,
        endQuestion: state.source.hospital.noQcDenied.endQ,
        alert: true,
        buttons: [
          {
            pathID: "yesQcDeniedFin",
            label: "Yes",
            cName: "green",
            bType: "question",
          },
          {
            pathID: "yesQcDenied",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesQcDeniedFin":
      return {
        scriptFin: state.source.hospital[path].script,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "noQcDenied":
      return {
        questionAlt: state.source.hospital[path].title,
        script: state.source.hospital[path].screenQuestion,
        list: state.source.hospital[path].list,
        endQuestion: state.source.hospital[path].endQ,
        buttons: [
          {
            pathID: "yesQcDeniedFin",
            label: "Yes",
            cName: "green",
            bType: "question",
          },
          {
            pathID: "yesQcDeniedAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCNoAuthorizationNeeded":
      return {
        script: state.source.hospital[path].title,
        buttons: [
          {
            pathID: "qCNoAuthYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCNoAuthNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCNoAuthYes":
      return {
        title: state.source.hospital[path].title,
        list: state.source.hospital[path].list,
        endQuestion: state.source.hospital[path].endQ,
        buttons: [
          {
            pathID: "qCNoAuthYesFinal",
            label: "Yes",
            cName: "green",
            bType: "question",
          },
          {
            pathID: "noCaseComplete",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCNoAuthYesFinal":
      return {
        script: state.source.hospital[path].title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "qCNoAuthNo":
      return {
        title: state.source.hospital[path].title,
        list: state.source.hospital[path].list,
        endQuestion: state.source.hospital[path].endQ,
        buttons: [
          {
            pathID: "qCNoAuthNoFinal",
            label: "Yes",
            cName: "green",
            bType: "question",
          },
          {
            pathID: "qCNoAuthNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCNoAuthNoAlert":
      return {
        title: state.source.hospital.qCNoAuthNo.title,
        list: state.source.hospital.qCNoAuthNo.list,
        endQuestion: state.source.hospital.qCNoAuthNo.endQ,
        alert: true,
        buttons: [
          {
            pathID: "qCNoAuthNoFinal",
            label: "Yes",
            cName: "green",
            bType: "question",
          },
          {
            pathID: "qCNoAuthNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCNoAuthNoFinal":
      return {
        script: state.source.hospital[path].title,
        scriptFin: state.source.finishCopy.noAssist,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "qCCanceled":
      return {
        script: state.source.hospital[path].title,
        questionAlt: state.source.hospital[path].question,
        endQuestion: state.source.hospital[path].endQ,
        buttons: [
          {
            pathID: "qCCanceledYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCCanceledNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCCanceledYes":
      return {
        script: state.source.hospital[path].script,
        questionAlt: state.source.hospital[path].question,
        list: state.source.hospital[path].list,
        endQuestion: state.source.hospital[path].endQ,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCCanceledYesAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCCanceledYesAlert":
      return {
        script: state.source.hospital.qCCanceledYes.script,
        questionAlt: state.source.hospital.qCCanceledYes.question,
        list: state.source.hospital.qCCanceledYes.list,
        endQuestion: state.source.hospital.qCCanceledYes.endQ,
        alert: true,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCCanceledYes",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCCanceledNo":
      return {
        script: state.source.hospital[path].title,
        questionAlt: state.source.hospital[path].question,
        list: state.source.hospital[path].list,
        endQuestion: state.source.hospital[path].endQ,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCCanceledNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCCanceledNoAlert":
      return {
        script: state.source.hospital.qCCanceledNo.title,
        questionAlt: state.source.hospital.qCCanceledNo.question,
        list: state.source.hospital.qCCanceledNo.list,
        endQuestion: state.source.hospital.qCCanceledNo.endQ,
        alert: true,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCCanceledNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCModified":
      return {
        script: state.source.hospital[path].title,
        extraQ: state.source.hospital[path].extraQ,
        list: state.source.hospital[path].list,
        endQuestion: state.source.hospital[path].endQ,
        buttons: [
          {
            pathID: "qCModifiedYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCModifiedAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCModifiedAlert":
      return {
        script: state.source.hospital.qCModified.title,
        extraQ: state.source.hospital.qCModified.extraQ,
        list: state.source.hospital.qCModified.list,
        endQuestion: state.source.hospital.qCModified.endQ,
        alert: true,
        buttons: [
          {
            pathID: "qCModifiedYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "qCModified",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qCModifiedYes":
      return {
        script: state.source.hospital[path].title,
        scriptFin: state.source.finishCopy.noAssist,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "isApproved":
      return {
        title: state.source.hospital.yesAuthRequest[path].title,
        list: state.source.hospital.yesAuthRequest[path].list,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "noApprovedQC":
      return {
        script: state.source.hospital.yesAuthRequest[path].title,
        phoneN: state.source.hospital.yesAuthRequest[path].question,
        endQuestion: state.source.hospital.yesAuthRequest[path].secondQ,
        externalLink: {
          url: "https://welbehealth.com/partner/",
          name: "welbehealth.com/partner",
        },
        list: state.source.hospital.yesAuthRequest[path].list,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "noApprovedQCAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "qcFinish":
      return {
        script: state.source.finishCopy.title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "noApprovedQCAlert":
      return {
        script: state.source.hospital.yesAuthRequest.noApprovedQC.title,
        phoneN: state.source.hospital.yesAuthRequest.noApprovedQC.question,
        endQuestion: state.source.hospital.yesAuthRequest.noApprovedQC.secondQ,
        externalLink: {
          url: "https://welbehealth.com/partner/",
          name: "welbehealth.com/partner",
        },
        alert: true,
        list: state.source.hospital.yesAuthRequest.noApprovedQC.list,
        buttons: [
          {
            pathID: "finishCopy",
            ...state.baseYesBtn,
          },
          {
            pathID: "noApprovedQCAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesQuickCap":
      return {
        title:
          state.source.hospital.yesAuthRequest.noApproved.isQuickCap[path].tile,
        question:
          state.source.hospital.yesAuthRequest.noApproved.isQuickCap[path]
            .screenQuestion,
        buttons: [
          {
            pathID: "yesApproved",
            ...state.baseYesBtn,
          },
          {
            pathID: "noApproved",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesApproved":
      return {
        title:
          state.source.hospital.yesAuthRequest.noApproved.isQuickCap
            .yesQuickCap[path].tile,
        list: state.source.hospital.yesAuthRequest.noApproved.isQuickCap
          .yesQuickCap[path].list,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "noApproved":
      return {
        title:
          state.source.hospital.yesAuthRequest.noApproved.isQuickCap
            .yesQuickCap[path].title,
        question:
          state.source.hospital.yesAuthRequest.noApproved.isQuickCap
            .yesQuickCap[path].screenQuestion,
        buttons: [
          {
            pathID: "yesRep",
            ...state.baseYesBtn,
          },
          {
            pathID: "noRep",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesRep":
      return {
        title:
          state.source.hospital.yesAuthRequest.noApproved.isQuickCap.yesQuickCap
            .noApproved[path].title,
        list: state.source.hospital.yesAuthRequest.noApproved.isQuickCap
          .yesQuickCap.noApproved[path].list,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "noRep":
      return {
        title:
          state.source.hospital.yesAuthRequest.noApproved.isQuickCap.yesQuickCap
            .noApproved[path].title,
        list: state.source.hospital.yesAuthRequest.noApproved.isQuickCap
          .yesQuickCap.noApproved[path].list,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "noQuickCap":
      return {
        title:
          state.source.hospital.yesAuthRequest.noApproved.isQuickCap[path].tile,
        question:
          state.source.hospital.yesAuthRequest.noApproved.isQuickCap[path]
            .screenQuestion,
        buttons: [],
      };
    // noAuthRequest
    case "noAuthRequest":
      return {
        script: state.source.hospital[path].title,
        phoneN: state.source.hospital[path].question,
        endQuestion: state.source.hospital[path].secondQ,
        externalLink: {
          url: "https://welbehealth.com/partner/",
          name: "welbehealth.com/partner",
        },
        list: state.source.hospital[path].list,
        buttons: [
          {
            pathID: "yesCaseComplete",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCaseComplete",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesCaseComplete":
      return {
        script: state.source.hospital[path].title,
        scriptAlt: state.source.finishCopy.title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "noCaseComplete":
      return {
        script: state.source.hospital.noAuthRequest.title,
        phoneN: state.source.hospital.noAuthRequest.question,
        endQuestion: state.source.hospital.noAuthRequest.secondQ,
        externalLink: {
          url: "https://welbehealth.com/partner/",
          name: "welbehealth.com/partner",
        },
        list: state.source.hospital.noAuthRequest.list,
        alert: true,
        buttons: [
          {
            pathID: "yesCaseComplete",
            ...state.baseYesBtn,
          },
          {
            pathID: "noAuthRequest",
            ...state.baseNoBtn,
          },
        ],
      };
    case "anythingElse":
      return {
        script: state.source.anythingElse.title,
        scriptFin: state.source.finishCopy.noAssist,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "finishCopy":
      return {
        script: state.source.finishCopy.title,
        scriptFin: state.source.finishCopy.noAssist,
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
        title: `${path} case not found`,
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
