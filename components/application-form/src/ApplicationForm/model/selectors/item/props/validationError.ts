import yupConfigTransformer from "../../../../../../utils/validation/yupConfigTransformer";
import validationsConfig from "../../../../configs/validations";
import { createSelector } from "reselect";
import { ApplicationFormParams, ApplicationFormItem } from "../../../index";
import itemValue from "../props/itemValue";
import updateState from "../../model/actions/updateState";

const validations = yupConfigTransformer(validationsConfig);

const validationError = createSelector(
  itemValue,
  (p: ApplicationFormParams, i: ApplicationFormItem) =>
    i.validation ? validations[i.validation] : () => true,
  (value, validation) => {
    if (value && value?.length > 0) {
      try {
        if(validation.validate) {
            validation.validate(value);
        }
      } catch (e) {
        return e.message;
      }
    }
    return null;
  }
);
export default validationError;
