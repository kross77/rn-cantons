var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createSelector } from "reselect";
import itemState from "../../props/itemState";
import validate from "../validate";
import update from "../update";
import setState from "../setState";
import pause from "../../../../../../../utils/pause";
const nextPhone = createSelector(itemState, validate, update, setState, (state, validate, update, setState) => (value) => __awaiter(void 0, void 0, void 0, function* () {
    if (!(state === null || state === void 0 ? void 0 : state.sentCode)) {
        const { error } = yield validate(value);
        if (!error) {
            setState({ sendingCode: true });
            yield pause(2);
            setState({ sentCode: true, phone: value });
        }
    }
    else {
        update(state.phone);
    }
}));
export default nextPhone;
//# sourceMappingURL=next.js.map