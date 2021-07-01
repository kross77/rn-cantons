import { ApplicationFormItem, ApplicationFormParams } from "../../../selector";

const itemUpdate = (p: ApplicationFormParams, item: ApplicationFormItem) => (
  value: any
) => {
    p.dataLink?.update({ [item.formKey]: value });
}

export default itemUpdate;
