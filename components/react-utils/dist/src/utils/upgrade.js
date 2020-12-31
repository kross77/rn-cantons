import React from 'react';
import isFunction from './isFunction';
const upgrade = (Component, props) => (p) => {
    const mergedProps = isFunction(props)
        ? Object.assign(Object.assign({}, props(p)), p) : Object.assign(Object.assign({}, props), p);
    return React.createElement(Component, Object.assign({}, mergedProps));
};
export default upgrade;
//# sourceMappingURL=upgrade.js.map