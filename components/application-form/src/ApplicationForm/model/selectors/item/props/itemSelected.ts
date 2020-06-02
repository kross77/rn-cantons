import { ApplicationFormItem, ApplicationFormParams } from "../../../selector";
import selectedKey from "../../model/props/selectedKey";
import { createSelector } from "reselect";

const itemSelected = createSelector(
  (p: ApplicationFormParams, i: ApplicationFormItem) => i,
  selectedKey,
  (item, selectedKey) => item.formKey === selectedKey
);

export default itemSelected;
