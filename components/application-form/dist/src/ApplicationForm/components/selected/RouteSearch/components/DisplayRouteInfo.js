import Layout from "../../../../../Layout";
import Icons from "../../../../../Icons";
import Text from "../../../../../Text";
import * as React from "react";
import withErrorBoundary from "../../../../../../utils/withErrorBoundary";
const DisplayRouteInfo = withErrorBoundary(({ points, routeInfo }) => {
    return points && points.length >= 2 ? (React.createElement(Layout, { row: true },
        React.createElement(Layout, { flex: 1, gap: 5 },
            React.createElement(Icons, { name: "location", size: 30 }),
            React.createElement(Text, { h6: true },
                `${Math.round(routeInfo.distance / 10) * 10} км`,
                " ")),
        React.createElement(Layout, { flex: 1, gap: 5 },
            React.createElement(Icons, { name: "clock", size: 30 }),
            React.createElement(Text, { h6: true },
                `${Math.round((routeInfo.duration * 10) / 60) / 10} часов`,
                " ")))) : null;
});
export default DisplayRouteInfo;
//# sourceMappingURL=DisplayRouteInfo.js.map