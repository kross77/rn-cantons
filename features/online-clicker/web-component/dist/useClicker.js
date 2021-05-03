"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = __importDefault(require("firebase"));
const react_link_1 = require("@rn-cantons/react-link");
require("firebase/firestore");
const react_1 = require("react");
const useAdminConfig_1 = __importDefault(require("./useAdminConfig"));
const useAnonymousAuth = () => {
    const userLink = react_link_1.useSingleLink(null);
    react_1.useEffect(() => {
        firebase_1.default.auth().signInAnonymously();
        return firebase_1.default.auth().onAuthStateChanged((user) => {
            if (user) {
                userLink.set(user);
            }
            else {
                userLink.set(undefined);
            }
        });
    }, []);
    return userLink.value;
};
const useClicker = (params) => {
    var _a;
    const totalClicksLink = react_link_1.useSingleLink(0);
    const clicksLink = react_link_1.useSingleLink([]);
    const auth = useAnonymousAuth();
    const config = useAdminConfig_1.default();
    react_1.useEffect(() => {
        console.log({ config });
        if (config) {
            firebase_1.default
                .firestore()
                .collection(params.settingsTableName)
                .doc(params.clicksPropertyName)
                .onSnapshot((s) => {
                var _a;
                if (s.exists) {
                    totalClicksLink.set((_a = s.data()) === null || _a === void 0 ? void 0 : _a.value);
                }
            });
        }
    }, [config]);
    return {
        total: totalClicksLink.value,
        couldClick: (_a = auth === null || auth === void 0 ? void 0 : auth.user) === null || _a === void 0 ? void 0 : _a.uid,
        click: () => {
            var _a;
            clicksLink.value.push({
                user: (_a = auth === null || auth === void 0 ? void 0 : auth.user) === null || _a === void 0 ? void 0 : _a.uid,
                date: new Date(),
            });
        },
    };
};
exports.default = useClicker;
//# sourceMappingURL=useClicker.js.map