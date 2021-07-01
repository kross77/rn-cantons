var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { useContext, useEffect } from "react";
import Layout from "../../../../Layout";
import Text from "../../../../Text";
import Block from "@kross77/rn-block/dist";
import useDeviceSize from "../../../../../native/useDeviceSize";
import { ActivityIndicator, Animated, Keyboard, TouchableOpacity } from "react-native";
import SelectAddress from "./components/SelectAddress";
import Button from "../../../../Button";
import useSpringAnimation from "../../../../../native/animation/useSpringAnimation";
import { useArrayLink, useSingleLink } from "../../../../../utils/linkUtils";
import Icons from "../../../../Icons";
import Colors from "../../../../Colors";
import createTypeComponent from "../../../../../utils/createTypeComponent";
import Map from "../../../../Map";
import wrap from "../../../../../utils/wrap";
import upgrade from "../../../../../utils/upgrade";
import { ModalsContext } from "../../../../Animation/components/Modals";
import DisplayRouteInfo from "./components/DisplayRouteInfo";
import { getPointName, toPos, toPoint, useGeolocation } from "./components/utils";
import CenterPoint from "./components/CenterPoint";
import MapPoint from "./components/MapPoint";
const Slides = (_a) => {
    var { children, currentSlide = 0 } = _a, props = __rest(_a, ["children", "currentSlide"]);
    const value = useSpringAnimation(0, currentSlide);
    const size = useDeviceSize();
    return (React.createElement(Animated.View, { height: "100%", style: {
            flex: 1,
            transform: [
                {
                    translateX: value.interpolate({
                        inputRange: [0, 1],
                        outputRange: [size.width / 2, -size.width / 2]
                    })
                }
            ]
        } },
        React.createElement(Layout, { row: true }, children.map((child, i) => (React.createElement(Layout, { width: size.width, key: `item ${i}` }, child))))));
};
const NoPoints = ({ onAddPoint }) => (React.createElement(Layout, null,
    React.createElement(Layout, { pv: 60 },
        React.createElement(Icons, { name: "map", size: 120, color: Colors.B800 }),
        React.createElement(Text, { h5: true }, "\u041C\u0430\u0440\u0448\u0440\u0443\u0442 \u043D\u0435 \u0437\u0430\u0434\u0430\u043D")),
    React.createElement(Button, { onPress: () => onAddPoint() }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0447\u043A\u0443")));
const IconButton = wrap(TouchableOpacity, Icons);
const PointMap = ({ point, onPress }) => {
    var _a, _b, _c;
    return (React.createElement(Layout, { row: true, color: Colors.W100, pv: 10, ph: 10 },
        React.createElement(Layout, { wrapper: upgrade(TouchableOpacity, { onPress }), align: "flex-start", width: "auto", flex: 1 },
            React.createElement(Text, { oversized: true, align: "left" }, ((_a = point === null || point === void 0 ? void 0 : point.GeoObject) === null || _a === void 0 ? void 0 : _a.name) || getPointName((_b = point === null || point === void 0 ? void 0 : point.GeoObject) === null || _b === void 0 ? void 0 : _b.Point.pos)),
            React.createElement(Text, { meta: true, align: "left" }, (_c = point === null || point === void 0 ? void 0 : point.GeoObject) === null || _c === void 0 ? void 0 : _c.description)),
        React.createElement(Layout, { row: true, gap: 15, width: "auto" },
            React.createElement(IconButton, { disabled: !point.up, onPress: point.up, color: Colors.B800, name: "chevron-up", size: 20 }),
            React.createElement(IconButton, { disabled: !point.down, onPress: point.down, color: Colors.B800, name: "chevron-down", size: 20 }),
            React.createElement(IconButton, { disabled: !point.delete, onPress: point.delete, color: Colors.B800, name: "trash", size: 20 }))));
};
const TouchLayout = wrap(upgrade(TouchableOpacity, { style: { width: "100%" } }), Layout);
export const RouteMap = (_a) => {
    var { points, map = {} } = _a, wrapper = __rest(_a, ["points", "map"]);
    const latlnPoints = points &&
        points.map(p => {
            var _a;
            const [longitude, latitude] = ((_a = p.GeoObject) === null || _a === void 0 ? void 0 : _a.Point.pos.split(" ")) || [];
            return { longitude: Number(longitude), latitude: Number(latitude) };
        });
    return points ? (React.createElement(Map, Object.assign({ wrapper: wrapper, delta: 0.05, waypoints: latlnPoints.length > 2 ? latlnPoints.slice(1, -1) : [], origin: latlnPoints[0], destination: latlnPoints[latlnPoints.length - 1] }, map))) : (React.createElement(Layout, { center: true },
        React.createElement(ActivityIndicator, null)));
};
const Points = (_a) => {
    var _b;
    var { pointsLink, routeInfo, onAddPoint, hidden: hiddenProp = false, next } = _a, props = __rest(_a, ["pointsLink", "routeInfo", "onAddPoint", "hidden", "next"]);
    const latlnPoints = pointsLink.value.map(p => {
        var _a;
        const [longitude, latitude] = ((_a = p.GeoObject) === null || _a === void 0 ? void 0 : _a.Point.pos.split(" ")) || [];
        return { longitude: Number(longitude), latitude: Number(latitude) };
    });
    const pointsLive = pointsLink.value.map((p, i) => {
        var _a;
        return (Object.assign(Object.assign({}, p), { delete: () => pointsLink.remove(i), up: i > 0 ? () => pointsLink.move(i, i - 1) : null, down: i < ((_a = pointsLink.value) === null || _a === void 0 ? void 0 : _a.length) - 1 ? () => pointsLink.move(i, i + 1) : null }));
    });
    const layout = useSingleLink({});
    return (React.createElement(Layout, { gap: 15 },
        React.createElement(Layout, { pv: 10 },
            React.createElement(Text, { h5: true }, "\u041C\u0430\u0440\u0448\u0440\u0443\u0442:")),
        React.createElement(Layout, { height: 150 },
            React.createElement(Map, { onReady: ({ distance, duration }) => routeInfo.set({ distance, duration }), delta: 0.05, waypoints: latlnPoints.length > 2 ? latlnPoints.slice(1, -1) : [], origin: latlnPoints[0], destination: latlnPoints[latlnPoints.length - 1] })),
        React.createElement(DisplayRouteInfo, { points: pointsLink.value, routeInfo: routeInfo.value }),
        React.createElement(Layout, { height: 10 }),
        React.createElement(Layout, { gap: 2 }, pointsLive.map((point, index) => {
            var _a;
            return (React.createElement(PointMap, { onPress: () => onAddPoint(point, index), key: (_a = point === null || point === void 0 ? void 0 : point.GeoObject) === null || _a === void 0 ? void 0 : _a.name, point: point }));
        })),
        React.createElement(Button, { onPress: () => onAddPoint(null, -1) }, "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u0447\u043A\u0443"),
        React.createElement(Button, { disabled: pointsLink.value ? ((_b = pointsLink.value) === null || _b === void 0 ? void 0 : _b.length) < 2 : true, onPress: () => next() }, "\u0414\u0430\u043B\u0435\u0435")));
};
const DisplayRoute = createTypeComponent({
    noPoints: NoPoints,
    points: Points
});
const RoutePoint = ({ onBack, onAddPoint, point }) => {
    var _a;
    const modals = useContext(ModalsContext);
    const onMap = () => {
        Keyboard.dismiss();
        modals.add(React.createElement(SelectPoint, { onBack: modals.pop, point: point, onReady: (point) => {
                onAddPoint(toPos(point));
                modals.pop();
                modals.pop();
            } }));
    };
    return (React.createElement(Layout, { height: "100%", ph: 20, relative: true },
        React.createElement(Block, { absolute: true, zIndex: 1, width: 30, right: 12, top: 7 },
            React.createElement(TouchableOpacity, { onPress: onBack },
                React.createElement(Icons, { size: 30, name: 'cross' }))),
        React.createElement(Block, { flex: 1 },
            React.createElement(SelectAddress, { onSelect: onAddPoint, onMap: onMap, point: point, defaultValue: (_a = point === null || point === void 0 ? void 0 : point.GeoObject) === null || _a === void 0 ? void 0 : _a.name }))));
};
export const origin = {
    latitude: 53.9,
    longitude: 27.5667
};
const SelectPoint = ({ point, onBack, onReady }) => {
    const pos = useGeolocation();
    const or = toPoint(point || (pos && toPos(pos.coords)) || toPos(origin));
    const regionLink = useSingleLink(null);
    useEffect(() => {
        if (pos) {
            regionLink.set(or);
        }
    }, [pos]);
    return (React.createElement(Layout, { width: '100%', height: '100%', gap: 10 },
        React.createElement(Layout, { pv: 10 },
            React.createElement(Text, { h5: true }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0442\u043E\u0447\u043A\u0443:")),
        React.createElement(Block, { absolute: true, zIndex: 1, width: 30, right: 12, top: 7 },
            React.createElement(TouchableOpacity, { onPress: onBack },
                React.createElement(Icons, { size: 30, name: 'cross' }))),
        React.createElement(Layout, { width: '100%', flex: 1, align: 'center', justify: 'center' },
            React.createElement(Layout, { zIndex: 99, pointerEvents: 'none' }, (regionLink === null || regionLink === void 0 ? void 0 : regionLink.value) && React.createElement(CenterPoint, null)),
            (regionLink === null || regionLink === void 0 ? void 0 : regionLink.value) ? React.createElement(MapPoint, { initialRegion: Object.assign(Object.assign({}, or), { latitudeDelta: 0.02, longitudeDelta: 0.02 }), onRegionChange: regionLink.set }) : React.createElement(ActivityIndicator, null)),
        React.createElement(Layout, { gap: 20 },
            React.createElement(Button, { onPress: () => {
                    onReady(regionLink.value);
                }, chevron: false }, "\u0413\u043E\u0442\u043E\u0432\u043E"))));
};
const Route = (props) => {
    var _a, _b, _c;
    const size = useDeviceSize();
    const slide = useSingleLink(0);
    const hiddenRoute = useSingleLink(false);
    const points = useArrayLink(((_a = props.defaultValue) === null || _a === void 0 ? void 0 : _a.points) || []);
    const routeInfo = useSingleLink(((_b = props.defaultValue) === null || _b === void 0 ? void 0 : _b.route) || {});
    const addPointVisibleIndex = useSingleLink(-1);
    const update = () => {
        const updated = { route: routeInfo.value, points: points.value };
        props.update && props.update(updated);
    };
    const modals = useContext(ModalsContext);
    useEffect(() => {
        if (points.value) {
            update();
        }
    }, [points.value]);
    useEffect(() => {
        if (routeInfo.value) {
            update();
        }
    }, [routeInfo.value]);
    const onAddPoint = pointIndex => (p) => __awaiter(void 0, void 0, void 0, function* () {
        modals.pop();
        if (pointIndex !== -1) {
            points.update(pointIndex, p);
        }
        else {
            points.add(p);
        }
    });
    const Point = ({ point, pointIndex }) => React.createElement(RoutePoint, { point: point, slideLink: slide, onAddPoint: onAddPoint(pointIndex), onBack: modals.pop });
    return (React.createElement(Layout, { width: '100%' },
        React.createElement(DisplayRoute, { type: ((_c = points.value) === null || _c === void 0 ? void 0 : _c.length) === 0 ? "noPoints" : "points", onAddPoint: (point, pointIndex = -1) => {
                modals.add(React.createElement(Point, { point: point, pointIndex: pointIndex }));
            }, pointsLink: points, routeInfo: routeInfo, hidden: hiddenRoute.value, next: props.next })));
};
export default Route;
//# sourceMappingURL=index.js.map