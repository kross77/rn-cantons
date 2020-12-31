import * as React from 'react';
const wrap = (Parent, Component) => (props) => (React.createElement(Parent, Object.assign({}, props),
    React.createElement(Component, Object.assign({}, props))));
export default wrap;
//# sourceMappingURL=wrap.js.map