import { createSelector } from "reselect";
import validationError from "./validationError";
const enablesReturnKeyAutomatically = createSelector(validationError, (validationError) => true);
export default enablesReturnKeyAutomatically;
//# sourceMappingURL=enablesReturnKeyAutomatically.js.map