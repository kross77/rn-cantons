import yupConfigTransformer from "../../../../../../utils/validation/yupConfigTransformer";
import validationsConfig from "../../../../configs/validations";
import { createSelector } from "reselect";
import { ApplicationFormParams, ApplicationFormItem } from "../../../index";
import itemValue from "../props/itemValue";
import updateState from "../../model/actions/updateState";

const validations = yupConfigTransformer(validationsConfig);

const validate = createSelector(
  updateState,
  (p: ApplicationFormParams, i: ApplicationFormItem) =>
    i.validation ? validations[i.validation] : () => null,
  (update, validation) => async value => {
    if (value?.length > 0) {
      try {
        if (validation.validate) {
          await validation.validate(value);
        }
      } catch (e) {
        // update({ error: e.message });
        return { error: e.message };
      }
    }
    // update({ error: null });
    return { error: null };
  }
);
export default validate;
