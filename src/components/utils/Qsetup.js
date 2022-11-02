import { newAppt } from "../questions/NewAppt";
import { MedRequest } from "../questions/MedRequest";
import { OtherRequest } from "../questions/OtherRequest";
import { HospAuth } from "../questions/HospAuth";
import { CancelReq } from "../questions/CacnelReq";

export const qSetup = (path, bCrumbName) => {
  if (path === "") return;

  switch (bCrumbName) {
    case "New Appointment":
      return newAppt(path);
    case "Medication":
      return MedRequest(path);
    case "Other":
      return OtherRequest(path);
    case "Hospital authorization":
      return HospAuth(path);
    case "Choose Authorization":
      return HospAuth(path);
    case "Cancel Appointment":
      return CancelReq(path);
  }
};
