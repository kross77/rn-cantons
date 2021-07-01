export default [
    {
        weight: {
            removable: true,
            component: "multirange",
            label: "Вес",
            placeholder: "Вес",
            icon: "megaphone",
            sign: "кг",
            valueLabel: "кг",
            min: 0,
            max: 15000
        }
    },
    {
        volume: {
            removable: true,
            component: "multirange",
            label: "Объем",
            valueLabel: "м3",
            sign: "м3",
            placeholder: "Выберите промежуток",
            min: 0,
            step: 1,
            max: 1500,
            icon: "dribbble-with-circle"
        }
    },
    {
        price: {
            removable: true,
            component: "multirange",
            label: "Цена",
            valueLabel: "бел руб",
            sign: "",
            placeholder: "Укажите цену в рублях",
            min: 0,
            step: 1,
            max: 7000,
            icon: "dribbble-with-circle"
        }
    },
    {
        route: {
            removable: true,
            component: "route-search",
            validation: "route",
            label: "Области поиска",
            placeholder: "Добавьте области поиска ",
            icon: "map"
        }
    },
    {
        currentPosition: {
            removable: true,
            component: "number",
            label: "От текущей геопозиции (км)",
            valueLabel: "км",
            placeholder: "Укажите радиус в км",
            min: 0,
            step: 1,
            max: 1000,
            icon: "map"
        }
    },
    {
        startDate: {
            removable: true,
            component: "date",
            validation: "route",
            label: "Дата загрузки",
            placeholder: "Выберите дату",
            icon: "calendar"
        }
    },
    {
        endDate: {
            removable: true,
            component: "date",
            validation: "route",
            label: "Дата выгрузки",
            placeholder: "Выберите дату",
            icon: "calendar"
        }
    }
];
//# sourceMappingURL=search.js.map