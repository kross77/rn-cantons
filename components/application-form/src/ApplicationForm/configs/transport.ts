export default [
  {
    type: {
      icon: "grid",
      component: "select",
      placeholder: "Выберите тип транспорта",
      label: "Тип",
      options: [
        { label: "Грузовой", value: "cargo" },
        { label: "Легковой", value: "personal" },
        { label: "Велосипед", value: "cycle" }
      ]
    }
  },
  {
    number: {
      component: "string",
      label: "Номер",
      multiline: false,
      placeholder: "Введите регистрационный номер",
      description: "Ваше ФИО будут видеть клиенты или водители",
      validation: "autonumber",
      required: true,
      icon: "progress-full"
    }
  },
  {
    carModel: {
      component: "string",
      label: "Марка автомобиля",
      placeholder: "Введите марку автомобиля",
      required: true,
      icon: "transport"
    }
  },
  {
    yearIssue: {
      component: "number",
      label: "Год выпуска",
      valueLabel: "год",
      placeholder: "Введите год выпуска",
      required: true,
      min: 1960,
      max: 2020,
      icon: "shopping-cart"
    }
  },
  {
    spaceCapacity: {
      component: "number",
      label: "Объем",
      valueLabel: "м3",
      placeholder: "Введите значение",
      min: 0,
      step: 0.5,
      max: 100,
      icon: "dropbox"
    }
  },
  {
    capacity: {
      component: "number",
      label: "Грузоподъемность",
      valueLabel: "тонн(ы)",
      placeholder: "Введите значение",
      min: 0,
      step: 0.1,
      max: 25,
      icon: "lock"
    }
  },
  {
    pallets: {
      component: "number",
      valueLabel: "штук(и)",
      min: 0,
      max: 15,
      label: "Количество паллет",
      placeholder: "Введите значение",
      icon: "list"
    }
  },
  {
    photos: {
      component: "photos",
      label: "Фотографии транспорта",
      placeholder: "Введите значение",
      icon: "camera"
    }
  }
];
