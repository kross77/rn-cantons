declare const _default: ({
    type: {
        icon: string;
        component: string;
        placeholder: string;
        label: string;
        options: {
            label: string;
            value: string;
        }[];
    };
    number?: undefined;
    carModel?: undefined;
    yearIssue?: undefined;
    spaceCapacity?: undefined;
    capacity?: undefined;
    pallets?: undefined;
    photos?: undefined;
} | {
    number: {
        component: string;
        label: string;
        multiline: boolean;
        placeholder: string;
        description: string;
        validation: string;
        required: boolean;
        icon: string;
    };
    type?: undefined;
    carModel?: undefined;
    yearIssue?: undefined;
    spaceCapacity?: undefined;
    capacity?: undefined;
    pallets?: undefined;
    photos?: undefined;
} | {
    carModel: {
        component: string;
        label: string;
        placeholder: string;
        required: boolean;
        icon: string;
    };
    type?: undefined;
    number?: undefined;
    yearIssue?: undefined;
    spaceCapacity?: undefined;
    capacity?: undefined;
    pallets?: undefined;
    photos?: undefined;
} | {
    yearIssue: {
        component: string;
        label: string;
        valueLabel: string;
        placeholder: string;
        required: boolean;
        min: number;
        max: number;
        icon: string;
    };
    type?: undefined;
    number?: undefined;
    carModel?: undefined;
    spaceCapacity?: undefined;
    capacity?: undefined;
    pallets?: undefined;
    photos?: undefined;
} | {
    spaceCapacity: {
        component: string;
        label: string;
        valueLabel: string;
        placeholder: string;
        min: number;
        step: number;
        max: number;
        icon: string;
    };
    type?: undefined;
    number?: undefined;
    carModel?: undefined;
    yearIssue?: undefined;
    capacity?: undefined;
    pallets?: undefined;
    photos?: undefined;
} | {
    capacity: {
        component: string;
        label: string;
        valueLabel: string;
        placeholder: string;
        min: number;
        step: number;
        max: number;
        icon: string;
    };
    type?: undefined;
    number?: undefined;
    carModel?: undefined;
    yearIssue?: undefined;
    spaceCapacity?: undefined;
    pallets?: undefined;
    photos?: undefined;
} | {
    pallets: {
        component: string;
        valueLabel: string;
        min: number;
        max: number;
        label: string;
        placeholder: string;
        icon: string;
    };
    type?: undefined;
    number?: undefined;
    carModel?: undefined;
    yearIssue?: undefined;
    spaceCapacity?: undefined;
    capacity?: undefined;
    photos?: undefined;
} | {
    photos: {
        component: string;
        label: string;
        placeholder: string;
        icon: string;
    };
    type?: undefined;
    number?: undefined;
    carModel?: undefined;
    yearIssue?: undefined;
    spaceCapacity?: undefined;
    capacity?: undefined;
    pallets?: undefined;
})[];
export default _default;
