import { createSelector } from "reselect";
import select from "./select";
const unselect = createSelector(select, select => () => select(null));
export default unselect;
//# sourceMappingURL=unselect.js.map