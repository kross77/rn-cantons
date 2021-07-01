/// <reference types="react" />
declare const formComponents: {
    layout: any;
    string: ({ removable, ...props }: {
        [x: string]: any;
        removable: any;
    }) => JSX.Element;
    date: (props: any) => JSX.Element;
    rating: any;
    multiline: any;
    route: (props: any) => JSX.Element;
    "route-search": (props: any) => JSX.Element;
    number: ({ removable, ...props }: {
        [x: string]: any;
        removable: any;
    }) => JSX.Element;
    year: ({ removable, ...props }: {
        [x: string]: any;
        removable: any;
    }) => JSX.Element;
    "number-options": (props: any) => JSX.Element;
    range: any;
    multirange: any;
    phone: (props: any) => JSX.Element;
    photo: (props: any) => JSX.Element;
    photos: (props: any) => JSX.Element;
    reference: (props: any) => JSX.Element;
    list: ({ removable, ...props }: {
        [x: string]: any;
        removable: any;
    }) => JSX.Element;
    select: (props: any) => JSX.Element;
    tag: (props: any) => JSX.Element;
};
export default formComponents;
