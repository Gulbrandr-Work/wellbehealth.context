import otherData from "../../data/otherData.json";
import tList from "../../data/triggerListData.json";
import PatientCases from "../../data/patientCases.json";
import EndStep from "../../data/endSteps.json";

export const OtherRequest = (path) => {
  const state = {
    source: { ...otherData.otherData },
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
    case "otherData":
      return {
        title: state.source.screenQuestion,
        buttons: [
          {
            pathID: "yesIDT",
            ...state.baseYesBtn,
          },
          {
            pathID: "noIDT",
            ...state.baseNoBtn,
          },
        ],
      };

    case "yesIDT":
      return {
        title: state.source[path].screenQuestion,
        buttons: [
          {
            pathID: "newAppt",
            ...state.baseYesBtn,
          },
          {
            pathID: "noSpecialty",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesSpecialty":
      return {
        title: state.source.yesIDT[path].title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "noSpecialty":
      return {
        title: state.source.yesIDT[path].screenQuestion,
        buttons: [
          {
            pathID: "yesOrder",
            ...state.baseYesBtn,
          },
          {
            pathID: "noOrder",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesOrder":
      return {
        title: state.source.yesIDT.noSpecialty[path].title,
        list: state.source.yesIDT.noSpecialty[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesOrderAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesOrderAlert":
      return {
        title: state.source.yesIDT.noSpecialty.yesOrder.title,
        list: state.source.yesIDT.noSpecialty.yesOrder.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesOrder",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noOrder":
      return {
        title: state.source.yesIDT.noSpecialty[path].title,
        list: state.source.yesIDT.noSpecialty[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noOrderAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noOrderAlert":
      return {
        title: state.source.yesIDT.noSpecialty.noOrder.title,
        list: state.source.yesIDT.noSpecialty.noOrder.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noOrderAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noIDT":
      return {
        title: state.source[path].title,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
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
  }
};
