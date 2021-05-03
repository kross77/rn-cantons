"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const styled_components_1 = __importDefault(require("styled-components"));
const index_1 = __importDefault(require("./index"));
const useClicker_1 = __importDefault(require("./useClicker"));
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
`;
const App = () => {
    const clicker = useClicker_1.default({
        settingsTableName: "navalny_clicks_settings",
        clickTableName: "navalny_clicks",
    });
    return (react_1.default.createElement(Wrapper, { className: "clicker-wrapper" },
        react_1.default.createElement(index_1.default, { click: clicker.click, total: clicker.total, totalUsers: 1000 })));
};
react_dom_1.default.render(react_1.default.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=example.js.map