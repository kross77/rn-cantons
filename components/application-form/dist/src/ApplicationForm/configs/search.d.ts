declare const _default: ({
    weight: {
        removable: boolean;
        component: string;
        label: string;
        placeholder: string;
        icon: string;
        sign: string;
        valueLabel: string;
        min: number;
        max: number;
    };
    volume?: undefined;
    price?: undefined;
    route?: undefined;
    currentPosition?: undefined;
    startDate?: undefined;
    endDate?: undefined;
} | {
    volume: {
        removable: boolean;
        component: string;
        label: string;
        valueLabel: string;
        sign: string;
        placeholder: string;
        min: number;
        step: number;
        max: number;
        icon: string;
    };
    weight?: undefined;
    price?: undefined;
    route?: undefined;
    currentPosition?: undefined;
    startDate?: undefined;
    endDate?: undefined;
} | {
    price: {
        removable: boolean;
        component: string;
        label: string;
        valueLabel: string;
        sign: string;
        placeholder: string;
        min: number;
        step: number;
        max: number;
        icon: string;
    };
    weight?: undefined;
    volume?: undefined;
    route?: undefined;
    currentPosition?: undefined;
    startDate?: undefined;
    endDate?: undefined;
} | {
    route: {
        removable: boolean;
        component: string;
        validation: string;
        label: string;
        placeholder: string;
        icon: string;
    };
    weight?: undefined;
    volume?: undefined;
    price?: undefined;
    currentPosition?: undefined;
    startDate?: undefined;
    endDate?: undefined;
} | {
    currentPosition: {
        removable: boolean;
        component: string;
        label: string;
        valueLabel: string;
        placeholder: string;
        min: number;
        step: number;
        max: number;
        icon: string;
    };
    weight?: undefined;
    volume?: undefined;
    price?: undefined;
    route?: undefined;
    startDate?: undefined;
    endDate?: undefined;
} | {
    startDate: {
        removable: boolean;
        component: string;
        validation: string;
        label: string;
        placeholder: string;
        icon: string;
    };
    weight?: undefined;
    volume?: undefined;
    price?: undefined;
    route?: undefined;
    currentPosition?: undefined;
    endDate?: undefined;
} | {
    endDate: {
        removable: boolean;
        component: string;
        validation: string;
        label: string;
        placeholder: string;
        icon: string;
    };
    weight?: undefined;
    volume?: undefined;
    price?: undefined;
    route?: undefined;
    currentPosition?: undefined;
    startDate?: undefined;
})[];
export default _default;
