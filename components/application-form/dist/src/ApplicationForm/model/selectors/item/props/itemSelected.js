import selectedKey from "../../model/props/selectedKey";
import { createSelector } from "reselect";
const itemSelected = createSelector((p, i) => i, selectedKey, (item, selectedKey) => item.formKey === selectedKey);
export default itemSelected;
//# sourceMappingURL=itemSelected.js.map