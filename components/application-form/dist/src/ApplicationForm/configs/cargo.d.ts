declare const _default: ({
    name: {
        component: string;
        label: string;
        multiline: boolean;
        placeholder: string;
        required: boolean;
        icon: string;
    };
    description?: undefined;
    images?: undefined;
    weight?: undefined;
    volume?: undefined;
} | {
    description: {
        component: string;
        label: string;
        multiline: boolean;
        placeholder: string;
        icon: string;
    };
    name?: undefined;
    images?: undefined;
    weight?: undefined;
    volume?: undefined;
} | {
    images: {
        component: string;
        label: string;
        placeholder: string;
        description: string;
        icon: string;
    };
    name?: undefined;
    description?: undefined;
    weight?: undefined;
    volume?: undefined;
} | {
    weight: {
        component: string;
        label: string;
        placeholder: string;
        options: {
            value: string;
            label: string;
        }[];
        required: boolean;
        icon: string;
    };
    name?: undefined;
    description?: undefined;
    images?: undefined;
    volume?: undefined;
} | {
    volume: {
        component: string;
        label: string;
        valueLabel: string;
        placeholder: string;
        min: number;
        step: number;
        max: number;
        icon: string;
    };
    name?: undefined;
    description?: undefined;
    images?: undefined;
    weight?: undefined;
})[];
export default _default;
