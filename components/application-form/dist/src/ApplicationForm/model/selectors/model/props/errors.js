import { createSelector } from "reselect";
import items from "./items";
const errors = createSelector(items, items => {
    return items.map(v => (v.required && !v.defaultValue && `Поле ${v.label} не заполненно`) ||
        v.validationError);
});
export default errors;
//# sourceMappingURL=errors.js.map