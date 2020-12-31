import { createStructuredSelector } from "reselect";
import listen from "./actions/listern";
const authSelector = createStructuredSelector({
    listen,
    authentication: (p) => { var _a; return ((_a = p.value) === null || _a === void 0 ? void 0 : _a.firebaseUser) === null; },
    authenticated: (p) => { var _a; return ((_a = p.value) === null || _a === void 0 ? void 0 : _a.firebaseUser) === null; },
});
export default authSelector;
//# sourceMappingURL=index.js.map