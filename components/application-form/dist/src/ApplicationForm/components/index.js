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
import Layout from "../../Layout";
import upgrade from "../../../utils/upgrade";
import Input from "../../Input";
import * as React from "react";
import { useEffect, useState } from "react";
import moment from "moment";
import Tag from "../../Tag";
import Text from "../../Text";
import Block from "@kross77/rn-block";
import { Image, TouchableOpacity, View } from "react-native";
import Avatar from "../../Avatar";
import Colors from "../../Colors";
import { RouteMap } from "./selected/Route";
import Rating from "./selected/Rating";
import Icons from "../../Icons";
import useDeviceSize from "../../../native/useDeviceSize";
const useReference = (props) => {
    const [ref, setRef] = useState({});
    useEffect(() => {
        if (props.onRef) {
            props.onRef && props.onRef(ref);
        }
    }, [ref]);
    return [ref, setRef];
};
const OnlyTouch = ({ select, children, touch, view }) => (React.createElement(TouchableOpacity, Object.assign({ activeOpacity: 1, onPress: () => select() }, touch),
    React.createElement(View, Object.assign({ pointerEvents: "none" }, view), children)));
const wrap = (Parent, Component) => (props) => (React.createElement(Parent, Object.assign({}, props),
    React.createElement(Component, Object.assign({}, props))));
const string = (_a) => {
    var { removable } = _a, props = __rest(_a, ["removable"]);
    if (removable) {
        return React.createElement(Layout, { row: true, gap: 10 },
            React.createElement(Block, { flex: 1 },
                React.createElement(String, Object.assign({}, props))),
            React.createElement(TouchableOpacity, { hitSlop: { top: 5, bottom: 5, left: 5, right: 5 }, onPress: () => props.update(undefined) },
                React.createElement(Icons, { name: 'trash', size: 20, color: Colors.B800 })));
    }
    else {
        return React.createElement(String, Object.assign({}, props));
    }
};
const StringWrap = string;
const String = wrap(OnlyTouch, upgrade(Input, {
    type: "string",
    returnKeyType: "next"
}));
const Route = wrap(upgrade(TouchableOpacity, ({ select }) => ({
    onPress: () => select(),
    style: { height: '100%', width: '100%' },
    pointerEvents: 'box-only'
})), upgrade(RouteMap, { pointerEvents: 'none' }));
const RouteSearch = wrap(upgrade(TouchableOpacity, ({ select }) => ({
    onPress: () => select(),
    style: { height: '100%', width: '100%' },
    pointerEvents: 'box-only'
})), upgrade(RouteMap, { pointerEvents: 'none', map: { displayWaypoints: true, displayRoute: false } }));
const formComponents = {
    layout: Layout,
    string: string,
    date: (props) => {
        const String = string;
        const value = props.defaultValue && moment(props.defaultValue).format('DD.MM.YYYY');
        const size = useDeviceSize();
        return React.createElement(Layout, { width: '100%' },
            React.createElement(String, Object.assign({}, props, { defaultValue: value })));
    },
    rating: upgrade(Rating, { behaviour: 'display' }),
    multiline: upgrade(string, { multiline: true }),
    route: (props) => {
        var _a, _b, _c;
        return ((_b = (_a = props.defaultValue) === null || _a === void 0 ? void 0 : _a.points) === null || _b === void 0 ? void 0 : _b.length) > 1 ?
            React.createElement(Layout, { align: 'flex-start' },
                props.label && React.createElement(Text, { meta: true }, props.label),
                React.createElement(Layout, { pv: 10, width: '100%', height: 200 },
                    React.createElement(Route, { select: props.select, points: (_c = props.defaultValue) === null || _c === void 0 ? void 0 : _c.points })))
            :
                React.createElement(String, Object.assign({}, props));
    },
    "route-search": (props) => {
        var _a, _b, _c;
        return ((_b = (_a = props.defaultValue) === null || _a === void 0 ? void 0 : _a.points) === null || _b === void 0 ? void 0 : _b.length) > 1 ?
            React.createElement(Layout, { pv: 10, width: '100%', height: 200 },
                React.createElement(RouteSearch, { select: props.select, points: (_c = props.defaultValue) === null || _c === void 0 ? void 0 : _c.points })) :
            React.createElement(String, Object.assign({}, props));
    },
    number: string,
    year: string,
    "number-options": (props) => {
        var _a;
        const String = string;
        const item = props.options.find(v => { var _a; return v.value === ((_a = props.defaultValue) === null || _a === void 0 ? void 0 : _a.optionValue); });
        const defaultValue = props.defaultValue && (item === null || item === void 0 ? void 0 : item.value) ? `${(_a = props.defaultValue) === null || _a === void 0 ? void 0 : _a.inputValue} ${item === null || item === void 0 ? void 0 : item.label}` : '';
        return React.createElement(String, Object.assign({}, props, { defaultValue: defaultValue }));
    },
    range: upgrade(string, ({ defaultValue, valueLabel }) => ({ value: defaultValue && `${defaultValue} ${valueLabel}` })),
    multirange: upgrade(string, ({ defaultValue, valueLabel }) => ({ value: defaultValue && `от ${defaultValue[0]} до ${defaultValue[1]} ${valueLabel}` })),
    phone: wrap(OnlyTouch, upgrade(Input, {
        type: "string",
        returnKeyType: "next",
        dataDetectorType: "phoneNumber",
        keyboardType: "phone-pad"
    })),
    photo: wrap(OnlyTouch, (props) => (React.createElement(Layout, { gap: 5 },
        React.createElement(Text, { meta: true }, props.label),
        React.createElement(Avatar, Object.assign({ iconColor: Colors.B800, size: 150, border: "grey", color: Colors.PLACEHOLDER, uri: props.defaultValue }, props))))),
    photos: wrap(upgrade(OnlyTouch, {
        touch: {
            style: {
                width: '100%'
            }
        }
    }), (props) => (React.createElement(Layout, { width: '100%', gap: 5, align: 'flex-start' },
        React.createElement(Text, { meta: true }, props.label),
        React.createElement(Layout, { row: true, gap: 5, wrap: true, justify: "flex-start", flexWrap: "wrap" }, props.defaultValue && props.defaultValue.map(uri => React.createElement(Layout, { width: 'auto' },
            React.createElement(Avatar, Object.assign({ reactangle: true, key: uri, iconColor: Colors.B800, size: 75, border: "grey", color: Colors.PLACEHOLDER, uri: uri }, props)),
            React.createElement(Layout, { height: 5 }))))))),
    reference: wrap(OnlyTouch, (props) => (React.createElement(Layout, { gap: 5 },
        React.createElement(Text, { meta: true }, props.label),
        React.createElement(Image, Object.assign({ iconColor: Colors.B800, size: 350, border: "grey", color: Colors.PLACEHOLDER, style: {
                width: 350,
                height: 350,
                borderRadius: 350 / 2,
            }, source: { uri: props.defaultValue } }, props))))),
    list: string,
    select: wrap(OnlyTouch, (_a) => {
        var { wrapper } = _a, props = __rest(_a, ["wrapper"]);
        const [_, setRef] = useReference(props);
        const selectedItem = props.options.find(v => v.value === props.defaultValue);
        return (React.createElement(Layout, Object.assign({}, wrapper),
            React.createElement(Input, Object.assign({ select: true }, props, { value: (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.label) || null, onRef: setRef }))));
    }),
    tag: wrap(OnlyTouch, (props) => {
        return (React.createElement(Block, { relative: true, width: 90, height: 90 },
            React.createElement(Tag, Object.assign({ onPress: () => props.onFocus(400), size: 55 }, props))));
    })
};
export default formComponents;
//# sourceMappingURL=index.js.map