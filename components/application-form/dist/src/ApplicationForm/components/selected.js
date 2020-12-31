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
import Layout from "../../Layout";
import upgrade from "../../../utils/upgrade";
import Input from "../../Input";
import * as React from "react";
import { useEffect, useState } from "react";
import Tag from "../../Tag";
import Text from "../../Text";
import Block from "@kross77/rn-block";
import { TouchableOpacity, View } from "react-native";
import Avatar from "../../Avatar";
import Colors from "../../Colors";
import SelectedString from "./selected/SelectedString";
import SelectedPhoto from "./selected/SelectedPhoto";
import SelectedOption from "./selected/SelectedOption";
import SelectedPhoneConfirmationString from "./selected/SelectedPhoneConfirmationString";
import SelectedAvatar from "./selected/Avatar";
import PhoneConfirmation from "./selected/PhoneConfirmation";
import Button from "../../Button";
import Appear from "../../Appear";
import debounce from "../../../utils/debounce";
import { useSingleLink } from "../../../utils/linkUtils";
import SelectPhotos from "./selected/SelectPhotos";
import Route from "./selected/Route";
import MultilineSelectedString from "./selected/Multiline";
import SelectedTransport from "./selected/SelectedTransport";
import Rating from "./selected/Rating";
import SelectedStringNumber from "./selected/SelectedStringNumber";
import RouteSearch from "./selected/RouteSearch";
import DatePicker from "react-native-date-picker";
const useReference = (props) => {
    const [ref, setRef] = useState({});
    useEffect(() => {
        if (props.onRef) {
            props.onRef && props.onRef(ref);
        }
    }, [ref]);
    return [ref, setRef];
};
const OnlyTouch = ({ onPress, children }) => (React.createElement(TouchableOpacity, { onPress: onPress },
    React.createElement(View, { pointerEvents: "none" }, children)));
const wrap = (Parent, Component) => (props) => (React.createElement(Parent, Object.assign({}, props),
    React.createElement(Component, Object.assign({}, props))));
const phone = upgrade(SelectedString, {
    autoFocus: true,
    type: "string",
    returnKeyType: "next",
    dataDetectorType: "phoneNumber",
    keyboardType: "phone-pad"
});
const StringComponent = upgrade(SelectedString, ({ next }) => ({
    autoFocus: true,
    onBlur: () => {
        next();
    },
    type: "string",
    returnKeyType: "next"
}));
const formComponents = ({}) => ({
    layout: Layout,
    string: (props) => {
        const link = useSingleLink("");
        return React.createElement(Layout, null,
            React.createElement(StringComponent, Object.assign({ onFieldChange: link.set }, props)),
            React.createElement(Button, { onPress: () => __awaiter(void 0, void 0, void 0, function* () {
                    yield props.update(link.value);
                    yield props.next();
                }) }, "\u0414\u0430\u043B\u0435\u0435"));
    },
    phone: SelectedPhoneConfirmationString,
    reference: wrap(OnlyTouch, (props) => (React.createElement(Layout, { gap: 5 },
        React.createElement(Text, { meta: true }, props.label),
        React.createElement(Avatar, Object.assign({ iconColor: Colors.B800, size: 60, border: "grey", color: Colors.PLACEHOLDER, uri: props.value }, props))))),
    photo: SelectedPhoto,
    select: SelectedOption,
    tag: wrap(OnlyTouch, (props) => {
        return (React.createElement(Block, { relative: true, width: 90, height: 90 },
            React.createElement(Tag, Object.assign({ onPress: () => props.onFocus(400), size: 55 }, props))));
    })
});
const string = upgrade(SelectedString, ({ next }) => ({
    autoFocus: true,
    onBlur: () => {
        next();
    },
    type: "string",
    returnKeyType: "next"
}));
const delayedUpdate = debounce((update, value) => {
    update(value);
}, 1000);
const NumberComponent = upgrade(string, { keyboardType: "numeric" });
export const selectedComponents = {
    layout: Layout,
    string: (props) => {
        var _a;
        const link = useSingleLink("");
        return React.createElement(Layout, null,
            React.createElement(StringComponent, Object.assign({ onFieldChange: link.set }, props)),
            React.createElement(Appear, { visible: ((_a = link.value) === null || _a === void 0 ? void 0 : _a.length) > 3 },
                React.createElement(Button, { onPress: () => __awaiter(void 0, void 0, void 0, function* () {
                        yield props.update(link.value);
                        yield props.next();
                    }) }, "\u0414\u0430\u043B\u0435\u0435")));
    },
    multiline: MultilineSelectedString,
    route: Route,
    "route-search": RouteSearch,
    number: (props) => {
        var _a;
        const numberLink = useSingleLink(props.defaultValue);
        return (React.createElement(Layout, null,
            React.createElement(NumberComponent, Object.assign({}, props, { onFieldChange: numberLink.set, update: numberLink.set })),
            React.createElement(Appear, { visible: ((_a = numberLink.value) === null || _a === void 0 ? void 0 : _a.length) > 0 },
                React.createElement(Button, { onPress: () => __awaiter(void 0, void 0, void 0, function* () {
                        yield props.update(numberLink.value);
                        yield props.next();
                    }) }, "\u0414\u0430\u043B\u0435\u0435"))));
    },
    year: (props) => {
        const numberLink = useSingleLink(props.defaultValue);
        const validLink = useSingleLink(false);
        useEffect(() => {
            const year = Number(numberLink.value);
            const valid = !isNaN(year) && year >= 1960 && year <= new Date().getFullYear();
            validLink.set(valid);
        }, [numberLink.value]);
        return (React.createElement(Layout, null,
            React.createElement(NumberComponent, Object.assign({}, props, { update: numberLink.set })),
            React.createElement(Appear, { visible: validLink.value },
                React.createElement(Button, { onPress: () => __awaiter(void 0, void 0, void 0, function* () {
                        yield props.update(numberLink.value);
                        yield props.next();
                    }) }, "\u0414\u0430\u043B\u0435\u0435"))));
    },
    "number-options": SelectedStringNumber,
    range: (_a) => {
        var { icon, state } = _a, props = __rest(_a, ["icon", "state"]);
        const selectedValue = useSingleLink(null);
        useEffect(() => {
            if (selectedValue.value !== null) {
                delayedUpdate(props.update, selectedValue.value);
            }
        }, [selectedValue.value]);
        const value = (!isNaN(props.defaultValue) && props.defaultValue) || props.min;
        return (React.createElement(Block, { center: true },
            React.createElement(Block, { flex: 1, justify: "flex-end" },
                React.createElement(Tag, { size: 80, icon: icon })),
            React.createElement(Layout, { gap: 20, flex: 1, justify: "flex-start" },
                React.createElement(Input, Object.assign({ values: [value], range: true, sliderType: "single" }, props, { update: selectedValue.set })),
                props.valueLabel && React.createElement(Text, { h5: true }, props.valueLabel),
                React.createElement(Appear, { visible: props.defaultValue },
                    React.createElement(Button, { onPress: props.next, disabled: !selectedValue.value }, "\u0414\u0430\u043B\u0435\u0435")))));
    },
    date: props => {
        const dateLink = useSingleLink(new Date());
        return (React.createElement(Layout, { gap: 20 },
            React.createElement(Layout, { pv: 10 },
                React.createElement(Text, { h4: true }, props.label)),
            React.createElement(DatePicker, { mode: "date", locale: "ru_RU", date: dateLink.value, onDateChange: dateLink.set }),
            React.createElement(Appear, { visible: dateLink.value },
                React.createElement(Button, { onPress: () => __awaiter(void 0, void 0, void 0, function* () {
                        yield props.update(dateLink.value);
                        yield props.next();
                    }), disabled: !dateLink.value }, "\u0414\u0430\u043B\u0435\u0435"))));
    },
    multirange: (_a) => {
        var _b;
        var { icon, state } = _a, props = __rest(_a, ["icon", "state"]);
        const selectedValue = useSingleLink(props.defaultValue || []);
        const minValue = Number(selectedValue.value[0]);
        const maxValue = Number(selectedValue.value[1]);
        useEffect(() => {
            if (selectedValue.value !== null) {
                delayedUpdate(props.update, selectedValue.value);
            }
        }, [selectedValue.value]);
        const value = (!isNaN(props.defaultValue) && props.defaultValue) || [];
        return (React.createElement(Block, null,
            React.createElement(Block, { justify: "flex-end" },
                React.createElement(Tag, { size: 80, icon: icon })),
            React.createElement(Text, { h4: true }, props.label),
            React.createElement(Layout, { gap: 20, justify: "flex-start" },
                React.createElement(Input, Object.assign({ autoFocus: true, keyboardType: "numeric" }, props, { label: "от", defaultValue: (props.defaultValue && props.defaultValue[0]) || (selectedValue.value && selectedValue.value[0]) || props.min || 0, onChangeText: value => selectedValue.set([value, maxValue]) })),
                React.createElement(Input, Object.assign({ keyboardType: "numeric" }, props, { label: "до", defaultValue: (props.defaultValue && props.defaultValue[1]) || (selectedValue.value && maxValue) || props.max, onChangeText: value => selectedValue.set([selectedValue.value[0], value]) })),
                props.valueLabel && React.createElement(Text, { h5: true }, props.valueLabel),
                React.createElement(Appear, { visible: ((_b = selectedValue.value) === null || _b === void 0 ? void 0 : _b.length) === 2 },
                    React.createElement(Button, { onPress: () => {
                            props.update(selectedValue.value);
                            props.next();
                        }, disabled: !(minValue >= 0 &&
                            maxValue > 0) || minValue > maxValue }, "\u0414\u0430\u043B\u0435\u0435")))));
    },
    phone: PhoneConfirmation,
    rating: Rating,
    reference: wrap(OnlyTouch, (props) => (React.createElement(Layout, { gap: 5 },
        React.createElement(Text, { meta: true }, props.label),
        React.createElement(Avatar, Object.assign({ iconColor: Colors.B800, size: 60, border: "grey", color: Colors.PLACEHOLDER, uri: props.value }, props))))),
    photo: SelectedAvatar,
    photos: SelectPhotos,
    select: SelectedOption,
    selectTransport: SelectedTransport,
    tag: wrap(OnlyTouch, (props) => {
        return (React.createElement(Block, { relative: true, width: 90, height: 90 },
            React.createElement(Tag, Object.assign({ onPress: () => props.onFocus(400), size: 55 }, props))));
    })
};
export default formComponents;
//# sourceMappingURL=selected.js.map