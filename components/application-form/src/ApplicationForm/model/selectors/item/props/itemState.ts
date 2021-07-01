import { ApplicationFormItem, ApplicationFormParams } from "../../../index";

const itemState = (p: ApplicationFormParams, item: ApplicationFormItem) => {
  return p.stateLink.value && p.stateLink.value.items[item.formKey];
};

export default itemState;
