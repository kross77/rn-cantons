import { createSelector } from "reselect";
import itemState from "../../props/itemState";
import validate from "../validate";
import update from "../update";
import setState from "../setState";
import pause from "../../../../../../../utils/pause";

const nextPhone = createSelector(
    itemState,
    validate,
    update,
    setState,
    (state, validate, update, setState) => async value => {

        if (!state?.sentCode) {
            const { error } = await validate(value);
            if (!error) {
                setState({ sendingCode: true });
                await pause(2);
                setState({ sentCode: true, phone: value });
            }
        } else {
            update(state.phone);
        }
    }
);

export default nextPhone;
