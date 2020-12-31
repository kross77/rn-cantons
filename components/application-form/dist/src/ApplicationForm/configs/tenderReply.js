export default [
    {
        message: {
            component: "multiline",
            label: "Сообщение",
            multiline: true,
            placeholder: "Введите сообщение для клиента",
            required: true,
            icon: "mail"
        }
    },
    {
        price: {
            component: "number",
            label: "Ваша Стоимость",
            description: "По умолчанию отображается цена назначенная заказчиком",
            required: true,
            valueLabel: "руб",
            placeholder: "Укажите цену в рублях",
            min: 0,
            step: 1,
            icon: "dribbble-with-circle"
        }
    }
];
//# sourceMappingURL=tenderReply.js.map