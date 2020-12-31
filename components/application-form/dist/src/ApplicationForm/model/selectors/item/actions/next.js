import { createSelector } from "reselect";
import nextPhone from "./next/next";
import defaultNext from "./next/default";
const next = createSelector((p, item) => {
    return [p, item];
}, (_, i) => i.formKey === "phone", ([params, item = {}], isPhone) => {
    return isPhone ? nextPhone(params, item) : defaultNext(params, item);
});
export default next;
//# sourceMappingURL=next.js.map