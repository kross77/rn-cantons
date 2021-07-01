import { createSelector } from "reselect";
import unselect from "./unselect";
const save = createSelector(({ saveAction }) => saveAction, ({ dataLink }) => dataLink.value, unselect, (save, data, unselect) => save
    ? () => {
        save(data);
        unselect();
    }
    : null);
export default save;
//# sourceMappingURL=save.js.map