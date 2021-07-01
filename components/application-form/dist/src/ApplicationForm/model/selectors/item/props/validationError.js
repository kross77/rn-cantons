import yupConfigTransformer from "../../../../../../utils/validation/yupConfigTransformer";
import validationsConfig from "../../../../configs/validations";
import { createSelector } from "reselect";
import itemValue from "../props/itemValue";
const validations = yupConfigTransformer(validationsConfig);
const validationError = createSelector(itemValue, (p, i) => i.validation ? validations[i.validation] : () => true, (value, validation) => {
    if (value && (value === null || value === void 0 ? void 0 : value.length) > 0) {
        try {
            if (validation.validate) {
                validation.validate(value);
            }
        }
        catch (e) {
            return e.message;
        }
    }
    return null;
});
export default validationError;
//# sourceMappingURL=validationError.js.map