import { createSelector } from "reselect";
import select from "../../../model/actions/select";
import selectedKey from "../../../model/props/selectedKey";
import validationError from "../../props/validationError";
import setState from "../setState";
import unselect from "../../../model/actions/unselect";
import modals from "../../props/modals";
import renderModalActions from "../../../../../../modals/renderModalActions";
const paramsItems = p => (p && p.items) || [];
const defaultNext = createSelector(paramsItems, select, selectedKey, validationError, setState, (p) => p.dataLink.value, unselect, modals, p => p.continueLink, p => p.onFormSubmitted, (items, select, key, validationError, setState, data, unselect, modals, continueLink, onFormSubmitted) => () => {
    if (validationError) {
        setState({ error: validationError });
    }
    else {
        const sortedItems = [...items];
        sortedItems.sort((a, b) => Number(b.required || 0) - Number(a.required || 0));
        const nextItem = sortedItems.find(v => v.formKey !== key && !data[v.formKey]);
        console.log('---- next ---> ', { nextItem });
        if (!(nextItem === null || nextItem === void 0 ? void 0 : nextItem.required) && !continueLink.value) {
            modals.add(renderModalActions({
                title: 'Обязательные поля заполенны!',
                buttons: [
                    {
                        children: 'Давайте заполним все!',
                        onPress: () => {
                            continueLink.set(true);
                            select(nextItem.formKey);
                            modals.pop();
                        },
                    },
                    {
                        children: 'Далее',
                        onPress: () => {
                            select(null);
                            modals.pop();
                            modals.pop();
                            onFormSubmitted && onFormSubmitted();
                        },
                    }
                ],
                icon: "check",
            }), modals.pop);
        }
        else {
            if (nextItem) {
                select(nextItem.formKey);
            }
            else {
                unselect();
                modals.pop();
                onFormSubmitted();
            }
        }
    }
});
export default defaultNext;
//# sourceMappingURL=default.js.map