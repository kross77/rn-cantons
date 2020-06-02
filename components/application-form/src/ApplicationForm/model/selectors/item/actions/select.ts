import { createSelector } from "reselect";
import { ApplicationFormItem } from "../../../selector";
import select from "../../model/actions/select";

const itemSelect = createSelector(
  (_: any, i: ApplicationFormItem) => i,
  select,
  (item, select) => () => select(item.formKey)
);

export default itemSelect;
