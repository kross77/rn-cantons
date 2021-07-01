"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderOnly = void 0;
const firebase_1 = __importDefault(require("firebase"));
const react_link_1 = require("@rn-cantons/react-link");
require("firebase/firestore");
const react_1 = require("react");
const RenderOnly = ({ condition, children, preloader = null, }) => {
    return condition ? children : preloader;
};
exports.RenderOnly = RenderOnly;
const useAnonymousAuth = () => {
    const userLink = react_link_1.useSingleLink(null);
    react_1.useEffect(() => {
        firebase_1.default.auth().signInAnonymously();
        return firebase_1.default.auth().onAuthStateChanged((user) => {
            console.log('useAnonymousAuth', { user });
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
    const totalClicksLink = react_link_1.useSingleLink(0);
    const timerId = react_link_1.useSingleLink(null);
    const clicksLink = react_link_1.useArrayLink([]);
    const user = useAnonymousAuth();
    react_1.useEffect(() => {
        if (user === null || user === void 0 ? void 0 : user.uid) {
            return firebase_1.default
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
    }, [user === null || user === void 0 ? void 0 : user.uid]);
    react_1.useEffect(() => {
        timerId.set({});
    }, [clicksLink.value]);
    return {
        total: totalClicksLink.value + clicksLink.value.length,
        couldClick: user === null || user === void 0 ? void 0 : user.uid,
        click: () => {
            clicksLink.add({
                user: user === null || user === void 0 ? void 0 : user.uid,
                date: new Date(),
            });
        },
    };
};
exports.default = useClicker;
//# sourceMappingURL=useClicker.js.map