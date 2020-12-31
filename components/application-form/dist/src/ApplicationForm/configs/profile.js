export default [
    {
        avatar: {
            component: "photo",
            label: "Фотография",
            placeholder: "Фото",
            description: "Роль определяет функциональность приложения",
            icon: "camera",
            storagePath: "users/%userId%",
            dbPath: "users/%userId%/avatar",
            requiredFields: [
                {
                    phone: "Пожалуйста потвердите ваш номер телефона, перед тем как загружать фотографию на сервер"
                }
            ]
        }
    },
    {
        unp: {
            component: "string",
            label: "УНП",
            multiline: false,
            placeholder: "Введите ваше УНП",
            description: "Учётный номер плательщика (УНП — единый уникальный номер, присваиваемый каждому плательщику при постановке на учёт в налоговом органе в Беларуси, и используемый по всем налогам, сборам, пошлинам, в том числе по таможенным платежам.",
            validation: "unp",
            icon: "open-book"
        }
    },
    {
        role: {
            component: "select",
            label: "Роль",
            options: [
                { label: "Водитель", value: "driver" },
                { label: "Заказчик", value: "client" }
            ],
            placeholder: "Выберите роль",
            description: "Роль определяет функциональность приложения",
            icon: "list",
            required: true
        }
    },
    {
        fullName: {
            component: "string",
            label: "ФИО",
            multiline: false,
            placeholder: "Введите ваше ФИО",
            description: "Ваше ФИО будут видеть клиенты или водители",
            validation: "name",
            required: true,
            icon: "user"
        }
    },
];
//# sourceMappingURL=profile.js.map