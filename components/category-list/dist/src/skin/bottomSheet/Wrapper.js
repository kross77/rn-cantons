import React from "react";
import Layout from "@rn-cantons/layout";
const Wrapper = ({ fade, bottomSheet, }) => (React.createElement(React.Fragment, null,
    fade,
    React.createElement(Layout, { absolute: true, zIndex: 1, wh: true, ph: 20, ac: true, pointerEvents: 'box-none' }, bottomSheet)));
export default Wrapper;
//# sourceMappingURL=Wrapper.js.map
