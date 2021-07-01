import { ApplicationFormItem, ApplicationFormParams } from "../../../index";

const itemValue = (p: ApplicationFormParams, item: ApplicationFormItem) => {
  return p.dataLink.value && p.dataLink.value[item.formKey];
};

export default itemValue;
