var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import yupConfigTransformer from "../../../../../../utils/validation/yupConfigTransformer";
import validationsConfig from "../../../../configs/validations";
import { createSelector } from "reselect";
import updateState from "../../model/actions/updateState";
const validations = yupConfigTransformer(validationsConfig);
const validate = createSelector(updateState, (p, i) => i.validation ? validations[i.validation] : () => null, (update, validation) => (value) => __awaiter(void 0, void 0, void 0, function* () {
    if ((value === null || value === void 0 ? void 0 : value.length) > 0) {
        try {
            if (validation.validate) {
                yield validation.validate(value);
            }
        }
        catch (e) {
            return { error: e.message };
        }
    }
    return { error: null };
}));
export default validate;
//# sourceMappingURL=validate.js.map