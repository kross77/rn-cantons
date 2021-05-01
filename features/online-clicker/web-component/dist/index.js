"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const styled_components_1 = __importDefault(require("styled-components"));
const Wrapper = styled_components_1.default.div `
  display: flex;
  flex-direction: column;
`;
const TotalTitle = styled_components_1.default.h2 ``;
const TotalUsers = styled_components_1.default.h2 ``;
const ClickButton = styled_components_1.default.button ``;
const OnlineClicker = ({ click, total, totalUsers }) => {
    return (react_1.default.createElement(Wrapper, { className: "clicker-wrapper" },
        react_1.default.createElement(TotalTitle, { className: "clicker-total-count" }, total),
        react_1.default.createElement(TotalUsers, { className: "clicker-total-users" }, totalUsers),
        react_1.default.createElement(ClickButton, { className: "clicker-button", onClick: click }, "Click")));
};
exports.default = OnlineClicker;
//# sourceMappingURL=index.js.map