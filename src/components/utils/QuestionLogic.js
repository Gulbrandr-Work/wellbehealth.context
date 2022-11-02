import { qSetup } from "../utils/Qsetup";
import Question from "../shared/Question";

export const QuestionLogic = (path, bCrumbName) => {
  let qData = qSetup(path, bCrumbName);
  return <Question data={qData} />;
};
