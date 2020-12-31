import { createSelector, createStructuredSelector } from "reselect";
import listen from "./actions/listen";
const user = p => { var _a; return (_a = p.value) === null || _a === void 0 ? void 0 : _a.firebaseUser; };
const authSelector = createStructuredSelector({
    listen,
    authentication: createSelector(user, (user) => user === null),
    authenticated: createSelector(user, (user) => !!user),
    userId: createSelector(user, (user) => { var _a; return (_a = user) === null || _a === void 0 ? void 0 : _a.id; }),
    displayName: createSelector(user, (user) => { var _a; return (_a = user) === null || _a === void 0 ? void 0 : _a.displayName; }),
    email: createSelector(user, (user) => { var _a; return (_a = user) === null || _a === void 0 ? void 0 : _a.email; }),
    emailVerified: createSelector(user, (user) => { var _a; return (_a = user) === null || _a === void 0 ? void 0 : _a.emailVerified; }),
    photoURL: createSelector(user, (user) => { var _a; return (_a = user) === null || _a === void 0 ? void 0 : _a.photoURL; }),
    id: createSelector(user, (user) => { var _a; return (_a = user) === null || _a === void 0 ? void 0 : _a.uid; }),
});
export default authSelector;
//# sourceMappingURL=index.js.map