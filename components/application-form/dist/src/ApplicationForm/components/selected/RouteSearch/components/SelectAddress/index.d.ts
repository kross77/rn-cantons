/// <reference types="react" />
declare const SelectAddress: ({ onSelect, point, onMap, focus, ...props }: {
    [x: string]: any;
    onSelect: any;
    point?: {
        GeoObject: any;
    } | undefined;
    onMap: any;
    focus: any;
}) => JSX.Element;
export default SelectAddress;