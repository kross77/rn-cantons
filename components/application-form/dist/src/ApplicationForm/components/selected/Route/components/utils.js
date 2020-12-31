import { useSingleLink } from "../../../../../../utils/linkUtils";
import Geolocation from '@react-native-community/geolocation';
import { useEffect } from "react";
export const useGeolocation = () => {
    const location = useSingleLink(null);
    useEffect(() => {
        Geolocation.getCurrentPosition((info) => location.set(info));
    }, []);
    return location.value;
};
export const ng = (s) => Math.round(Number(s) * 1000) / 1000;
export const getPointName = pos => {
    const [ln, lt] = pos.split(" ");
    return `Координаты \n${ng(lt)}, ${ng(ln)}`;
};
export const toPoint = (y) => {
    var _a;
    const [ln, lt] = (_a = y === null || y === void 0 ? void 0 : y.GeoObject) === null || _a === void 0 ? void 0 : _a.Point.pos.split(' ');
    return { GeoObject: y === null || y === void 0 ? void 0 : y.GeoObject, latitude: Number(lt), longitude: Number(ln) };
};
export const toPos = (point, parent = {}) => {
    return {
        GeoObject: Object.assign(Object.assign({}, point === null || point === void 0 ? void 0 : point.GeoObject), { Point: { pos: `${point.longitude} ${point.latitude}` } })
    };
};
//# sourceMappingURL=utils.js.map