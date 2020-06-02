import { ApplicationFormItem, ApplicationFormParams } from "../../../index";

const setState = (p: ApplicationFormParams, item: ApplicationFormItem) => (
  updated: any
) => {
    const current = p.stateLink.value.items[item.formKey]
    p.stateLink?.update({ items: {...p.stateLink.value.items, [item.formKey]: [{...current, ...updated}]} });
}

export default setState;
