import * as React from "react";
import {useSingleLink} from "../../../../../../utils/linkUtils";
import Geolocation from '@react-native-community/geolocation';
import {useEffect} from "react";

export const useGeolocation = () => {
    const location = useSingleLink(null);
    useEffect(() => {
        Geolocation.getCurrentPosition((info: any) => location.set(info));
    }, [])

    return location.value;
}


export const ng = (s: any) => Math.round(Number(s) * 1000) / 1000

export const getPointName = pos => {
    const [ln, lt] = pos.split(" ");
    return `Координаты \n${ng(lt)}, ${ng(ln)}`
}

export const toPoint = (y: any) => {
    const [ln, lt] = y?.GeoObject?.Point.pos.split(' ');
    return {GeoObject: y?.GeoObject, latitude: Number(lt), longitude: Number(ln)}
}

export const toPos = (point: any, parent = {}) => {
    return {
        GeoObject: {
            ...point?.GeoObject,
            Point: {pos: `${point.longitude} ${point.latitude}`}
        }
    }
}
