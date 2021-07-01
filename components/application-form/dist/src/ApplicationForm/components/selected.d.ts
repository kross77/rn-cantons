/// <reference types="react" />
import SelectedOption from "./selected/SelectedOption";
declare const formComponents: ({}: {}) => {
    layout: any;
    string: (props: any) => JSX.Element;
    phone: (props: any) => JSX.Element;
    reference: (props: any) => JSX.Element;
    photo: (item: any) => JSX.Element;
    select: {
        <T extends unknown>(item: SelectedOption<T>): JSX.Element;
        defaultProps: {
            nextLabel: string;
        };
    };
    tag: (props: any) => JSX.Element;
};
export declare const selectedComponents: {
    layout: any;
    string: (props: any) => JSX.Element;
    multiline: (item: any) => JSX.Element;
    route: (props: any) => JSX.Element;
    "route-search": (props: any) => JSX.Element;
    number: (props: any) => JSX.Element;
    year: (props: any) => JSX.Element;
    "number-options": (item: any) => JSX.Element;
    range: ({ icon, state, ...props }: {
        [x: string]: any;
        icon: any;
        state: any;
    }) => JSX.Element;
    date: (props: any) => JSX.Element;
    multirange: ({ icon, state, ...props }: {
        [x: string]: any;
        icon: any;
        state: any;
    }) => JSX.Element;
    phone: (props: any) => JSX.Element;
    rating: any;
    reference: (props: any) => JSX.Element;
    photo: (item: any) => JSX.Element;
    photos: (item: any) => JSX.Element;
    select: {
        <T extends unknown>(item: SelectedOption<T>): JSX.Element;
        defaultProps: {
            nextLabel: string;
        };
    };
    selectTransport: (item: any) => JSX.Element;
    tag: (props: any) => JSX.Element;
};
export default formComponents;
