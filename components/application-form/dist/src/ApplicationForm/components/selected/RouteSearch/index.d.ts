/// <reference types="react" />
export declare const RouteMap: ({ points, ...wrapper }: {
    [x: string]: any;
    points: any;
}) => JSX.Element;
export declare const toPoint: (y: any) => {
    GeoObject: any;
    latitude: number;
    longitude: number;
};
export declare const toPos: (point: any) => {
    GeoObject: any;
};
export declare const CenterPoint: (props: any) => JSX.Element;
export declare const PersistMap: any;
declare const RouteSearch: (props: any) => JSX.Element;
export default RouteSearch;
