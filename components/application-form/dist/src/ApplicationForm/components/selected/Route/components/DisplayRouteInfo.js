import Layout from "../../../../../Layout";
import Icons from "../../../../../Icons";
import Text from "../../../../../Text";
import * as React from "react";
import withErrorBoundary from "../../../../../../utils/withErrorBoundary";
export const distanceToLabel = (v) => `${Math.round(v / 10) * 10} км`;
export const durationToLabel = (num) => {
    const hours = (num / 60);
    const rhours = Math.floor(hours);
    const minutes = (hours - rhours) * 60;
    const rminutes = Math.round(minutes);
    return `${rhours} ч. ${rminutes} мин.`;
};
const DisplayRouteInfo = withErrorBoundary(({ points, routeInfo }) => {
    return points && points.length >= 2 ? (React.createElement(Layout, { row: true },
        React.createElement(Layout, { flex: 1, gap: 5 },
            React.createElement(Icons, { name: "location", size: 30 }),
            React.createElement(Text, { h6: true },
                distanceToLabel(routeInfo.distance),
                " ")),
        React.createElement(Layout, { flex: 1, gap: 5 },
            React.createElement(Icons, { name: "clock", size: 30 }),
            React.createElement(Text, { h6: true }, durationToLabel(routeInfo.duration))))) : null;
});
export default DisplayRouteInfo;
//# sourceMappingURL=DisplayRouteInfo.js.map