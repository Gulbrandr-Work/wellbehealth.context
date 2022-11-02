import newAppointment from "../../data/newAppointment.json";
import PatientCases from "../../data/patientCases.json";
import tList from "../../data/triggerListData.json";
import EndStep from "../../data/endSteps.json";

export const newAppt = (path) => {
  const state = {
    source: { ...newAppointment.newAppointment },
    prevSource: null,
    triggers: [...tList.tList],
    isTriggers: false,
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
    case "newAppointment":
      return {
        script: state.source.script,
        questionAlt: state.source.questionAlt,
        buttons: [
          {
            pathID: "yesMedComplaint",
            ...state.baseYesBtn,
          },
          {
            pathID: "noMedComplaint",
            ...state.baseNoBtn,
          },
        ],
      };
    case "isRecent":
      return {
        script: state.source[path].title,
        question: state.source[path].question,
        buttons: [
          {
            pathID: "yesTriggerList",
            ...state.baseYesBtn,
          },
          {
            pathID: "isEmergency",
            ...state.baseNoBtn,
          },
        ],
      };
    case "isEmergency":
      return {
        script: state.source[path].title,
        question: state.source[path].question,
        buttons: [
          {
            pathID: "call911",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesNotListed",
            ...state.baseNoBtn,
          },
        ],
      };
    case "call911":
      return {
        script: state.source[path].script,
        questionAlt: state.source[path].questionAlt,
        questionCase: state.source[path].questionCase,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    // YES MED COMPLAINT
    case "yesMedComplaint":
      return {
        questionAlt: state.source[path].screenQuestion,
        question: state.source[path].question,
        list: state.triggers,
        isTriggers: true,
        buttons: [
          {
            pathID: "yesTriggerList",
            ...state.baseYesBtn,
          },
          {
            pathID: "isRecent",
            ...state.baseNoBtn,
          },
        ],
      };
    // YES TRIGGER LIST
    case "yesTriggerList":
      return {
        script: state.source.yesMedComplaint[path].nurseOTD.script,
        questionAlt: state.source.yesMedComplaint[path].nurseOTD.questionAlt,
        question: state.source.yesMedComplaint[path].nurseOTD.screenQuestion,
        isTriggers: false,
        externalLink: {
          url: link,
          name: "Nurse of the day",
        },
        buttons: [
          {
            pathID: "yesNurse",
            ...state.baseYesBtn,
          },
          {
            pathID: "providerOTD",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesNurse":
      return {
        questionAlt: state.source[path].questionAlt,
        list: state.source[path].list,
        question: state.source[path].question,
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
        questionAlt: state.source.yesNurse.questionAlt,
        list: state.source.yesNurse.list,
        question: state.source.yesNurse.question,
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
    case "yesNurseConfirm":
      return {
        title: "Please document patient case in Athena",
        script: state.cases.yesNurse.title,
        list: state.cases.yesNurse.list,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "providerOTD":
      return {
        script:
          state.source.yesMedComplaint.yesTriggerList.nurseOTD[path].script,
        questionAlt:
          state.source.yesMedComplaint.yesTriggerList.nurseOTD[path]
            .questionAlt,
        question:
          state.source.yesMedComplaint.yesTriggerList.nurseOTD[path]
            .screenQuestion,
        externalLink: {
          url: link,
          name: "Provider of the day",
        },
        buttons: [
          {
            pathID: "yesPOTD",
            ...state.baseYesBtn,
          },
          {
            pathID: "pcpOTD",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesPOTD":
      return {
        questionAlt: state.source[path].questionAlt,
        list: state.source[path].list,
        question: "Was patient case completed in Athena? ",
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
        questionAlt: state.source.yesPOTD.questionAlt,
        list: state.source.yesPOTD.list,
        question: "Was patient case completed in Athena? ",
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

    case "yesPOTDConfirm":
      return {
        title: "Please document patient case in Athena",
        script: state.cases.yesPOTD.title,
        list: state.cases.yesPOTD.list,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "pcpOTD":
      return {
        script:
          state.source.yesMedComplaint.yesTriggerList.nurseOTD.providerOTD[path]
            .script,
        questionAlt:
          state.source.yesMedComplaint.yesTriggerList.nurseOTD.providerOTD[path]
            .questionAlt,

        question:
          state.source.yesMedComplaint.yesTriggerList.nurseOTD.providerOTD[path]
            .question,

        buttons: [
          {
            pathID: "yesPCPOTD",
            ...state.baseYesBtn,
          },
          {
            pathID: "noOTD",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesPCPOTD":
      return {
        questionAlt: state.source[path].questionAlt,
        list: state.source[path].list,
        question: "Was patient case completed in Athena? ",
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesPCPOTDAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesPCPOTDAlert":
      return {
        questionAlt: state.source.yesPCPOTD.questionAlt,
        list: state.source.yesPCPOTD.list,
        question: "Was patient case completed in Athena? ",
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesPCPOTD",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noOTD":
      return {
        script: state.source[path].script,
        questionAlt: state.source[path].questionAlt,
        list: state.source[path].list,
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
        script: state.source.noOTD.script,
        questionAlt: state.source.noOTD.questionAlt,
        list: state.source.noOTD.list,
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
    case "yesPCPOTDConfirm":
      return {
        title: "Please document patient case in Athena",
        script: state.cases.noOTD.title,
        list: state.cases.noOTD.list,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };

    // NO TRIGGER LIST
    case "noTriggerList":
      return {
        title: state.source.yesMedComplaint[path].screenQuestion,
        buttons: [
          {
            pathID: "yesNotListed",
            ...state.baseYesBtn,
          },
          {
            pathID: "noNotlisted",
            ...state.baseNoBtn,
          },
        ],
      };

    case "noNotlisted":
      return {
        script: state.source.yesMedComplaint.noTriggerList[path].title,
        question:
          state.source.yesMedComplaint.noTriggerList[path].screenQuestion,
        isTriggers: true,
        buttons: [
          {
            pathID: "yesRedPurplexf",
            ...state.baseYesBtn,
          },
          {
            pathID: "noRedPurplexf",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesRedPurplexf":
      return {
        questionAlt:
          state.source.yesMedComplaint.noTriggerList.yesRedPurple.questionAlt,

        questionCase:
          state.source.yesMedComplaint.noTriggerList.yesRedPurple.questionCase,

        extraQ: state.source.yesMedComplaint.noTriggerList.yesRedPurple.extraQ,

        question:
          state.source.yesMedComplaint.noTriggerList.yesRedPurple.question,
        buttons: [
          {
            pathID: "rpAvail48",
            ...state.baseYesBtn,
          },
          {
            pathID: "rpNoAvail48",
            ...state.baseNoBtn,
          },
        ],
      };
    case "rpAvail48":
      return {
        script: state.source.yesMedComplaint.noTriggerList.rpAvail48.script,
        questionCase:
          state.source.yesMedComplaint.noTriggerList.rpAvail48.title,
        list: state.source.yesMedComplaint.noTriggerList.rpAvail48.list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "rpAvail48Alert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "rpAvail48Alert":
      return {
        script: state.source.yesMedComplaint.noTriggerList.rpAvail48.script,
        questionCase:
          state.source.yesMedComplaint.noTriggerList.rpAvail48.title,
        list: state.source.yesMedComplaint.noTriggerList.rpAvail48.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "rpAvail48",
            ...state.baseNoBtn,
          },
        ],
      };
    case "rpNoAvail48":
      return {
        script: state.source.yesMedComplaint.noTriggerList.rpNoAvail48.title,
        questionCase:
          state.source.yesMedComplaint.noTriggerList.rpNoAvail48.questionCase,
        list: state.source.yesMedComplaint.noTriggerList.rpNoAvail48.list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "rpNoAvail48Alert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "rpNoAvail48Alert":
      return {
        script: state.source.yesMedComplaint.noTriggerList.rpNoAvail48.title,
        questionCase:
          state.source.yesMedComplaint.noTriggerList.rpNoAvail48.questionCase,
        list: state.source.yesMedComplaint.noTriggerList.rpNoAvail48.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "rpNoAvail48",
            ...state.baseNoBtn,
          },
        ],
      };

    case "noRedPurplexf":
      return {
        questionAlt:
          state.source.yesMedComplaint.noTriggerList.noRedPurple.questionAlt,
        questionCase:
          state.source.yesMedComplaint.noTriggerList.noRedPurple.questionCase,
        questionAdds:
          state.source.yesMedComplaint.noTriggerList.noRedPurple.questionAdds,
        question:
          state.source.yesMedComplaint.noTriggerList.noRedPurple.screenQuestion,
        buttons: [
          {
            pathID: "rpWeekAvail",
            ...state.baseYesBtn,
          },
          {
            pathID: "rpWeekNoAvail",
            ...state.baseNoBtn,
          },
        ],
      };
    case "rpWeekAvail":
      return {
        script: state.source.yesMedComplaint.noTriggerList.rpWeekAvail.title,
        list: state.source.yesMedComplaint.noTriggerList.rpWeekAvail.list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "rpWeekAvailAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "rpWeekAvailAlert":
      return {
        script: state.source.yesMedComplaint.noTriggerList.rpWeekAvail.title,
        list: state.source.yesMedComplaint.noTriggerList.rpWeekAvail.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "rpWeekAvail",
            ...state.baseNoBtn,
          },
        ],
      };
    case "rpWeekNoAvail":
      return {
        script: state.source.yesMedComplaint.noTriggerList.rpWeekNoAvail.title,
        questionCase:
          state.source.yesMedComplaint.noTriggerList.rpWeekNoAvail.questionCase,
        list: state.source.yesMedComplaint.noTriggerList.rpWeekNoAvail.list,

        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "rpWeekNoAvailAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "rpWeekNoAvailAlert":
      return {
        script: state.source.yesMedComplaint.noTriggerList.rpWeekNoAvail.title,
        questionCase:
          state.source.yesMedComplaint.noTriggerList.rpWeekNoAvail.questionCase,
        list: state.source.yesMedComplaint.noTriggerList.rpWeekNoAvail.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "rpWeekNoAvail",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesNotListed":
      return {
        question:
          state.source.yesMedComplaint.noTriggerList[path].screenQuestion,
        script: state.source.yesMedComplaint.noTriggerList[path].script,
        buttons: [
          {
            pathID: "yesSameDay",
            ...state.baseYesBtn,
          },
          {
            pathID: "noNotlisted",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesSameDay":
      return {
        questionAlt:
          state.source.yesMedComplaint.noTriggerList.yesNotListed[path]
            .questionAlt,
        questionCase:
          state.source.yesMedComplaint.noTriggerList.yesNotListed[path]
            .questionCase,
        extraQ:
          state.source.yesMedComplaint.noTriggerList.yesNotListed[path].extraQ,
        anotherQ:
          state.source.yesMedComplaint.noTriggerList.yesNotListed[path]
            .anotherQ,
        question:
          state.source.yesMedComplaint.noTriggerList.yesNotListed[path]
            .question,
        externalLink: {
          url: link,
          name: "Provider of the day",
        },
        buttons: [
          {
            pathID: "podAvailNA",
            ...state.baseYesBtn,
          },
          {
            pathID: "ispcpAvailable",
            ...state.baseNoBtn,
          },
        ],
      };
    case "podAvailNA":
      return {
        script: state.source[path].script,
        question: state.source[path].question,
        list: state.source[path].list,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "podAvailableAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "podAvailableAlert":
      return {
        script: state.source.podAvailNA.script,
        question: state.source.podAvailNA.question,
        list: state.source.podAvailNA.list,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "podAvailNA",
            ...state.baseNoBtn,
          },
        ],
      };

    case "ispcpAvailable":
      return {
        questionAlt:
          state.source.yesMedComplaint.noTriggerList.yesNotListed.yesSameDay[
            path
          ].questionAlt,
        extraQ:
          state.source.yesMedComplaint.noTriggerList.yesNotListed.yesSameDay[
            path
          ].extraQ,
        anotherQ:
          state.source.yesMedComplaint.noTriggerList.yesNotListed.yesSameDay[
            path
          ].anotherQ,
        question:
          state.source.yesMedComplaint.noTriggerList.yesNotListed.yesSameDay[
            path
          ].question,
        externalLink: {
          url: link,
          name: "See PCP of the day",
        },
        buttons: [
          {
            pathID: "pcpAvailable",
            ...state.baseYesBtn,
          },
          {
            pathID: "pcpUnavailable",
            ...state.baseNoBtn,
          },
        ],
      };
    case "pcpAvailable":
      return {
        script: state.cases[path].title,
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
        script: state.cases.pcpAvailable.title,
        list: state.cases.pcpAvailable.list,
        question: state.cases.pcpAvailable.question,
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

    case "pcpUnavailable":
      return {
        script:
          state.source.yesMedComplaint.noTriggerList.yesNotListed.yesSameDay
            .ispcpAvailable[path].script,
        questionAlt:
          state.source.yesMedComplaint.noTriggerList.yesNotListed.yesSameDay
            .ispcpAvailable[path].questionAlt,
        questionCase:
          state.source.yesMedComplaint.noTriggerList.yesNotListed.yesSameDay
            .ispcpAvailable[path].questionCase,
        question:
          state.source.yesMedComplaint.noTriggerList.yesNotListed.yesSameDay
            .ispcpAvailable[path].question,
        buttons: [
          {
            pathID: "podAvailNA",
            ...state.baseYesBtn,
          },
          {
            pathID: "pcpUnavailableCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "pcpUnavailableCase":
      return {
        questionAlt: state.source[path].questionAlt,
        questionCase: state.source[path].questionCase,
        list: state.source[path].list,
        question: state.source[path].question,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "pcpUnavailableCaseAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "pcpUnavailableCaseAlert":
      return {
        questionAlt: state.source.pcpUnavailableCase.questionAlt,
        questionCase: state.source.pcpUnavailableCase.questionCase,
        list: state.source.pcpUnavailableCase.list,
        question: state.source.pcpUnavailableCase.question,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "pcpUnavailableCase",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noSameDay":
      return {
        title:
          state.source.yesMedComplaint.noTriggerList.yesNotListed[path].title,
        list: state.source.yesMedComplaint.noTriggerList.yesNotListed[path]
          .list,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };

    // NO MED COMPLAINT
    case "noMedComplaint":
      return {
        script: state.source[path].script,
        question: state.source[path].endQ,
        buttons: [
          {
            pathID: "yesConsultation",
            ...state.baseYesBtn,
          },
          {
            pathID: "noConsultation",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesConsultation":
      return {
        script: state.source.noMedComplaint[path].script,
        questionCase: state.source.noMedComplaint[path].questionCase,
        question: state.endStep.finalQ,
        list: state.source.noMedComplaint[path].list,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesConsultationAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesConsultationAlert":
      return {
        script: state.source.noMedComplaint.yesConsultation.script,
        questionCase: state.source.noMedComplaint.yesConsultation.questionCase,
        question: state.endStep.finalQ,
        list: state.source.noMedComplaint.yesConsultation.list,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "yesConsultation",
            ...state.baseNoBtn,
          },
        ],
      };
    case "yesConsulConfirm":
      return {
        title: "Please document patient case in Athena",
        list: state.source.noMedComplaint.yesConsultation.list,
        buttons: [
          {
            pathID: "reset",
            label: "Finish",
            cName: "blue",
            bType: "question",
          },
        ],
      };
    case "noConsultation":
      return {
        question: state.source.noMedComplaint[path].screenQuestion,
        buttons: [
          {
            pathID: "noCpcpOption",
            label: "PCP",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "noCexternalOption",
            label:
              "External Specialty including Onsite Podiatry, Dental, Audiology, Optometry etc.",
            cName: "options",
            bType: "question",
          },
          {
            pathID: "noCadditionalOption",
            label:
              "Additional In clinic including IDT providers: RD, PT, OT, Engagement, Lab etc.",
            cName: "options",
            bType: "question",
          },
        ],
      };
    case "noCpcpOption":
      return {
        script: state.source.noMedComplaint[path].script,
        questionAlt: state.source.noMedComplaint[path].questionAlt,
        questionCase: state.source.noMedComplaint[path].questionCase,
        questionAdds: state.source.noMedComplaint[path].questionAdds,
        question: state.source.noMedComplaint[path].endQ,
        stratData: true,
        buttons: [
          {
            pathID: "noCpcpOptionYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCpcpOptionNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCpcpOptionYes":
      return {
        script: state.source.noMedComplaint[path].script,
        questionCase: state.source.noMedComplaint[path].questionCase,
        list: state.source.noMedComplaint[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCpcpOptionYesAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCpcpOptionYesAlert":
      return {
        script: state.source.noMedComplaint.noCpcpOptionYes.script,
        questionCase: state.source.noMedComplaint.noCpcpOptionYes.questionCase,
        list: state.source.noMedComplaint.noCpcpOptionYes.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCpcpOptionYes",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCpcpOptionNo":
      return {
        script: state.source.noMedComplaint[path].script,
        questionCase: state.source.noMedComplaint[path].questionCase,
        list: state.source.noMedComplaint[path].list,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCpcpOptionNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCpcpOptionNoAlert":
      return {
        script: state.source.noMedComplaint.noCpcpOptionNo.script,
        questionCase: state.source.noMedComplaint.noCpcpOptionNo.questionCase,
        list: state.source.noMedComplaint.noCpcpOptionNo.list,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCpcpOptionNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCexternalOption":
      return {
        script: state.source.noMedComplaint[path].script,
        questionAlt: state.source.noMedComplaint[path].questionAlt,
        question: state.source.noMedComplaint[path].question,
        buttons: [
          {
            pathID: "noCexternalOptionYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCexternalOptionNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCexternalOptionYes":
      return {
        script: state.source.noMedComplaint[path].script,
        questionAlt: state.source.noMedComplaint[path].questionAlt,
        question: state.source.noMedComplaint[path].endQ,
        buttons: [
          {
            pathID: "noCexternalscheduled",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCexternalNoscheduled",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCexternalscheduled":
      return {
        title: state.source.noMedComplaint[path].title,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCexternalscheduledAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCexternalscheduledAlert":
      return {
        title: state.source.noMedComplaint.noCexternalscheduled.title,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCexternalscheduled",
            ...state.baseNoBtn,
          },
        ],
      };

    case "noCexternalNoscheduled":
      return {
        script: state.source.noMedComplaint[path].script,
        question: state.source.noMedComplaint[path].questionAlt,
        externalLink: {
          url: "https://welbepace.sharepoint.com/:x:/r/sites/COSATeamSite/Resources/Schedule/Order%20Scheduling%20Turnaround%20Time%20%285.6.21%29.xlsx?d=w4cc6e05874c64dfa9b065cbb235f38f2&csf=1&web=1&e=kXKW3J",
          name: "Order Turnaround Times",
        },
        buttons: [
          {
            pathID: "noCextrnComplianceYes",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextrnComplianceNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCextrnComplianceYes":
      return {
        script: state.source.noMedComplaint[path].script,
        questionAlt: state.source.noMedComplaint[path].questionAlt,
        question: state.source.noMedComplaint[path].endQ,
        buttons: [
          {
            pathID: "noCextCompYesEscalate",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextCompNoEscalate",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCextCompNoEscalate":
      return {
        questionAlt: state.source.noMedComplaint[path].questionAlt,
        question: state.source.noMedComplaint[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextCompNoEscalateAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCextCompNoEscalateAlert":
      return {
        questionAlt:
          state.source.noMedComplaint.noCextCompNoEscalate.questionAlt,
        question: state.source.noMedComplaint.noCextCompNoEscalate.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextCompNoEscalate",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCextCompYesEscalate":
      return {
        script: state.source.noMedComplaint[path].script,
        questionAlt: state.source.noMedComplaint[path].questionAlt,
        questionCase: state.source.noMedComplaint[path].questionCase,
        questionAdds: state.source.noMedComplaint[path].questionAdds,
        list: state.source.noMedComplaint[path].list,
        question: state.source.noMedComplaint[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextCompYesEscalateAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCextCompYesEscalateAlert":
      return {
        script: state.source.noMedComplaint.noCextCompYesEscalate.script,
        questionAlt:
          state.source.noMedComplaint.noCextCompYesEscalate.questionAlt,
        questionCase:
          state.source.noMedComplaint.noCextCompYesEscalate.questionCase,
        questionAdds:
          state.source.noMedComplaint.noCextCompYesEscalate.questionAdds,
        list: state.source.noMedComplaint.noCextCompYesEscalate.list,
        question: state.source.noMedComplaint.noCextCompYesEscalate.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextCompYesEscalate",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCextrnComplianceNo":
      return {
        script: state.source.noMedComplaint[path].script,
        questionAlt: state.source.noMedComplaint[path].questionAlt,
        questionCase: state.source.noMedComplaint[path].questionCase,
        questionAdds: state.source.noMedComplaint[path].questionAdds,
        list: state.source.noMedComplaint[path].list,
        question: state.source.noMedComplaint[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextrnComplianceNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCextrnComplianceNoAlert":
      return {
        script: state.source.noMedComplaint.noCextrnComplianceNo.script,
        questionAlt:
          state.source.noMedComplaint.noCextrnComplianceNo.questionAlt,
        questionCase:
          state.source.noMedComplaint.noCextrnComplianceNo.questionCase,
        questionAdds:
          state.source.noMedComplaint.noCextrnComplianceNo.questionAdds,
        list: state.source.noMedComplaint.noCextrnComplianceNo.list,
        question: state.source.noMedComplaint.noCextrnComplianceNo.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextrnComplianceNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCextrnEscalateYes":
      return {
        title: state.source.noMedComplaint[path].title,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextrnEscalateYesAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCextrnEscalateYesAlert":
      return {
        title: state.source.noMedComplaint.noCextrnEscalateYes.title,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextrnEscalateYes",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCextrnEscalateNo":
      return {
        title: state.source.noMedComplaint[path].title,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextrnEscalateNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCextrnEscalateNoAlert":
      return {
        title: state.source.noMedComplaint.noCextrnEscalateNo.title,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCextrnEscalateNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCexternalOptionNo":
      return {
        script: state.source.noMedComplaint[path].script,
        questionAlt: state.source.noMedComplaint[path].questionAlt,
        list: state.source.noMedComplaint[path].list,
        extraQ: state.source.noMedComplaint[path].endQ,
        question: state.endStep.finalQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCexternalOptionNoAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCexternalOptionNoAlert":
      return {
        script: state.source.noMedComplaint.noCexternalOptionNo.script,
        questionAlt:
          state.source.noMedComplaint.noCexternalOptionNo.questionAlt,
        list: state.source.noMedComplaint.noCexternalOptionNo.list,
        extraQ: state.source.noMedComplaint.noCexternalOptionNo.endQ,
        question: state.endStep.finalQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCexternalOptionNo",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCadditionalOption":
      return {
        questionAlt: state.source.noMedComplaint[path].questionAlt,
        altScript: state.source.noMedComplaint[path].altScript,
        questionCase: state.source.noMedComplaint[path].questionCase,
        list: state.source.noMedComplaint[path].list,
        question: state.source.noMedComplaint[path].endQ,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCadditionalOptionAlert",
            ...state.baseNoBtn,
          },
        ],
      };
    case "noCadditionalOptionAlert":
      return {
        questionAlt:
          state.source.noMedComplaint.noCadditionalOption.questionAlt,
        altScript: state.source.noMedComplaint.noCadditionalOption.altScript,
        questionCase:
          state.source.noMedComplaint.noCadditionalOption.questionCase,
        list: state.source.noMedComplaint.noCadditionalOption.list,
        question: state.source.noMedComplaint.noCadditionalOption.endQ,
        alert: true,
        buttons: [
          {
            pathID: "anythingElse",
            ...state.baseYesBtn,
          },
          {
            pathID: "noCadditionalOption",
            ...state.baseNoBtn,
          },
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
        title: `Could not find ${path}, please check case`,
      };
  }
};
