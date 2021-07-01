import { createSelector } from "reselect";
import { ApplicationFormItem, ApplicationFormParams } from "../../../index";
import nextPhone from "./next/next";
import defaultNext from "./next/default";

const next = createSelector(
  (p: ApplicationFormParams, item) => {
    return [p, item];
  },
  (_, i: ApplicationFormItem) => i.formKey === "phone",
  ([params, item = {}], isPhone) => {
    return isPhone ? nextPhone(params, item) : defaultNext(params, item);
  }
);

export default next;
