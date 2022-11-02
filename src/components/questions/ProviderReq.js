import otherData from "../../data/otherData.json";
import tList from "../../data/triggerListData.json";
import PatientCases from "../../data/patientCases.json";

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
  };

  let link =
    "https://welbepace.sharepoint.com/sites/COSATeamSite/Resources/Forms/AllItems.aspx?id=%2Fsites%2FCOSATeamSite%2FResources%2FMarket%20Profiles&viewid=1c778ef2%2D8703%2D44cb%2D9663%2Dec2105d0af94";
};
