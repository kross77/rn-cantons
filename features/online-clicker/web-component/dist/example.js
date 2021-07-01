"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const styled_components_1 = __importDefault(require("styled-components"));
const index_1 = __importDefault(require("./index"));
const useClicker_1 = __importStar(require("./useClicker"));
const useConfig_1 = __importDefault(require("./useConfig"));
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
`;
const App = () => {
    const clicker = useClicker_1.default({
        settingsTableName: 'navalny_clicks_settings',
        clickTableName: 'navalny_clicks',
    });
    return (react_1.default.createElement(Wrapper, { className: "clicker-wrapper" },
        react_1.default.createElement(index_1.default, { couldClick: clicker.couldClick, click: clicker.click, total: clicker.total, totalUsers: 1000 })));
};
const Logic = () => {
    const config = useConfig_1.default();
    return (react_1.default.createElement(useClicker_1.RenderOnly, { condition: config !== null, preloader: react_1.default.createElement("div", null,
            react_1.default.createElement("h1", null, "Preloading")) },
        react_1.default.createElement(App, null)));
};
react_dom_1.default.render(react_1.default.createElement(Logic, null), document.getElementById('root'));
//# sourceMappingURL=example.js.map