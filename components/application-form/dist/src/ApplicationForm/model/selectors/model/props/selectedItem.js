import { createSelector } from "reselect";
import selectedKey from "./selectedKey";
import items from "./items";
export const selectedItem = createSelector(selectedKey, items, (key, items) => items.find(item => item.formKey === key));
export default selectedItem;
//# sourceMappingURL=selectedItem.js.map