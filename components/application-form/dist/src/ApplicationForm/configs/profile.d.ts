declare const _default: ({
    avatar: {
        component: string;
        label: string;
        placeholder: string;
        description: string;
        icon: string;
        storagePath: string;
        dbPath: string;
        requiredFields: {
            phone: string;
        }[];
    };
    unp?: undefined;
    role?: undefined;
    fullName?: undefined;
} | {
    unp: {
        component: string;
        label: string;
        multiline: boolean;
        placeholder: string;
        description: string;
        validation: string;
        icon: string;
    };
    avatar?: undefined;
    role?: undefined;
    fullName?: undefined;
} | {
    role: {
        component: string;
        label: string;
        options: {
            label: string;
            value: string;
        }[];
        placeholder: string;
        description: string;
        icon: string;
        required: boolean;
    };
    avatar?: undefined;
    unp?: undefined;
    fullName?: undefined;
} | {
    fullName: {
        component: string;
        label: string;
        multiline: boolean;
        placeholder: string;
        description: string;
        validation: string;
        required: boolean;
        icon: string;
    };
    avatar?: undefined;
    unp?: undefined;
    role?: undefined;
})[];
export default _default;
