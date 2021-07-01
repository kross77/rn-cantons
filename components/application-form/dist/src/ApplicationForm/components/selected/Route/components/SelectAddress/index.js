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
import Layout from "../../../../../../Layout";
import Text from "../../../../../../Text";
import Input from "../../../../../../Input";
import useYMapsGeocoder from "../../../../../../../services/ymaps/geocoder/useYMapsGeocoder";
import { useSingleLink } from "../../../../../../../utils/linkUtils";
import debounce from "../../../../../../../utils/debounce";
import * as React from "react";
import SelectAddressList from "./list";
import { useEffect, useRef } from "react";
import CenterPoint from "../CenterPoint";
import PersistMap from "../PersistMap";
import { toPoint, toPos } from "../utils";
import Button from "../../../../../../Button";
const t = {
    selectPoint: "Выберите точку",
    edit: "Редактировать",
    accurate: "Уточните",
    inputAddress: "Введите адрес",
    savePoint: "Сохранить"
};
const SelectAddress = (_a) => {
    var { onSelect, point, onMap, focus } = _a, props = __rest(_a, ["onSelect", "point", "onMap", "focus"]);
    const inputRef = useRef();
    const geocode = useSingleLink("");
    const [data, loading, error] = useYMapsGeocoder({
        api: "fe91030b-c315-45ef-8ea5-1e4db231bc6b",
        geocode: geocode.value
    });
    const pointLink = useSingleLink(point);
    const accuratedPointLink = useSingleLink(null);
    useEffect(() => {
        if (inputRef.current) {
            if (focus) {
                inputRef.current.focus();
            }
            else {
                inputRef.current.blur();
            }
        }
    }, [focus]);
    return (React.createElement(Layout, { flex: 1, pv: 10, gap: 20 },
        React.createElement(Text, { h4: true },
            pointLink.value ? point ? t.edit : t.accurate : t.selectPoint,
            ":"),
        !pointLink.value ?
            React.createElement(React.Fragment, null,
                React.createElement(Input, Object.assign({ autoFocus: true, ref: inputRef, blurOnSubmit: false, onChangeText: debounce(text => geocode.set(text), 1000), placeholder: t.inputAddress, icon: 'location' }, props)),
                React.createElement(SelectAddressList, { onSelect: (p) => __awaiter(void 0, void 0, void 0, function* () {
                        inputRef.current.blur();
                        inputRef.current.clear();
                        pointLink.set(p);
                    }), type: loading ? "loading" : error ? "error" : "display", loading: loading, error: error, data: (data === null || data === void 0 ? void 0 : data.response.GeoObjectCollection.featureMember) || [] }),
                React.createElement(Layout, { gap: 20 },
                    React.createElement(Button, { onPress: onMap, chevron: false }, "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043D\u0430 \u043A\u0430\u0440\u0442\u0435"))) :
            React.createElement(Layout, { gap: 10, flex: 1 },
                React.createElement(Layout, { flex: 1, width: '100%', align: 'center', justify: 'center' },
                    React.createElement(Layout, { absolute: true, zIndex: 1 },
                        React.createElement(CenterPoint, null)),
                    React.createElement(PersistMap, { displayRoute: false, displayMarkers: false, origin: toPoint(pointLink.value), destination: toPoint(pointLink.value), onRegionChange: p => {
                            const updatedPoint = toPos(Object.assign(Object.assign({}, p), { GeoObject: pointLink.value }));
                            accuratedPointLink.set(updatedPoint);
                        } })),
                React.createElement(Layout, { gap: 20 },
                    React.createElement(Button, { onPress: () => {
                            onSelect(accuratedPointLink.value || pointLink.value);
                        }, chevron: false }, t.savePoint),
                    React.createElement(Button, { onPress: () => pointLink.set(null), chevron: false }, t.inputAddress)))));
};
export default SelectAddress;
//# sourceMappingURL=index.js.map