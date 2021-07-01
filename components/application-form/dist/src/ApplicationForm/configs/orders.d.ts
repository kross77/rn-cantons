declare const _default: ({
    name: {
        component: string;
        label: string;
        multiline: boolean;
        placeholder: string;
        required: boolean;
        icon: string;
    };
    gender?: undefined;
    description?: undefined;
    images?: undefined;
} | {
    gender: {
        component: string;
        label: string;
        multiline: boolean;
        placeholder: string;
        required: boolean;
        icon: string;
    };
    name?: undefined;
    description?: undefined;
    images?: undefined;
} | {
    description: {
        component: string;
        label: string;
        multiline: boolean;
        placeholder: string;
        required: boolean;
        icon: string;
    };
    name?: undefined;
    gender?: undefined;
    images?: undefined;
} | {
    images: {
        component: string;
        label: string;
        placeholder: string;
        description: string;
        icon: string;
    };
    name?: undefined;
    gender?: undefined;
    description?: undefined;
})[];
export default _default;
