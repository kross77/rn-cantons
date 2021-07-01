import { createSelector } from "reselect";
import select from "../../model/actions/select";
const itemSelect = createSelector((_, i) => i, select, (item, select) => () => select(item.formKey));
export default itemSelect;
//# sourceMappingURL=select.js.map