import { createSelector } from "reselect";
import items from "../props/items";
import updateItems from "./updateItems";
const pop = createSelector(items, updateItems, (items, updateItems) => () => {
    items.pop();
    updateItems({ items });
});
export default pop;
//# sourceMappingURL=pop.js.map