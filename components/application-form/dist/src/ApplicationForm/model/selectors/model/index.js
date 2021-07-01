import { createStructuredSelector } from "reselect";
import selectedKey from "./props/selectedKey";
import items from "./props/items";
import submitted from "./props/submitted";
import selectedItem from "./props/selectedItem";
import select from "./actions/select";
import unselect from "./actions/unselect";
import save from "./actions/save";
import errors from "./props/errors";
const model = createStructuredSelector({
    selectedKey,
    selectedItem,
    items,
    submitted,
    select,
    save,
    unselect,
    errors
});
export default model;
//# sourceMappingURL=index.js.map