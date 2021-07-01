export default [
    {
        name: {
            component: "string",
            label: "Название заявки",
            placeholder: "Имя",
            required: true,
            icon: "list"
        },
    },
    {
        startDate: {
            component: "date",
            validation: "route",
            label: "Дата загрузки",
            placeholder: "Выберите дату",
            icon: "clock"
        },
        format: 'displayDay',
        displayVerification: 'notNullUndefined',
    },
    {
        endDate: {
            component: "date",
            validation: "route",
            label: "Дата доставки",
            placeholder: "Выберите дату",
            icon: "clock"
        },
        format: 'displayDay',
        displayVerification: 'notNullUndefined',
    },
    {
        description: {
            component: "multiline",
            label: "Описание заявки",
            placeholder: "Введите описание",
            icon: "mail"
        }
    },
    {
        route: {
            component: "route",
            validation: "route",
            label: "Маршрут",
            placeholder: "Выберите маршрут",
            required: true,
            icon: "map"
        }
    },
    {
        weight: {
            component: "number",
            label: "Вес (тонн)",
            valueLabel: "тонн",
            placeholder: "Вес",
            required: true,
            icon: "megaphone"
        },
        format: "addValueLabel"
    },
    {
        volume: {
            component: "number",
            label: "Объём (м3)",
            valueLabel: "м3",
            max: 130,
            placeholder: "Укажите примерный объем в м3",
            icon: "bucket"
        },
        format: "addValueLabel",
    },
    {
        images: {
            component: "photos",
            label: "Фотографии",
            placeholder: "Фото",
            description: "Роль определяет функциональность приложения",
            icon: "camera"
        }
    },
    {
        price: {
            component: "number",
            label: "Стоимость",
            valueLabel: "руб",
            placeholder: "Укажите цену в рублях",
            min: 0,
            step: 1,
            max: 1000,
            icon: "dribbble-with-circle"
        }
    }
];
//# sourceMappingURL=tender.js.map