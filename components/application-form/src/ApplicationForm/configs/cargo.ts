export default [
  {
    name: {
      component: "string",
      label: "Название груза",
      multiline: false,
      placeholder: "Введите название груза",
      required: true,
      icon: "archive"
    }
  },
  {
    description: {
      component: "multiline",
      label: "Описание груза",
      multiline: true,
      placeholder: "Введите описание",
      icon: "mail"
    }
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
    weight: {
      component: "number-options",
      label: "Вес",
      placeholder: "Вес",
      options: [
        {value: "x1", label: "Килограмы"},
        {value: "x1000", label: "Тонны"}
      ],
      required: true,
      icon: "megaphone"
    }
  },
  {
    volume: {
      component: "number",
      label: "Объём (м3)",
      valueLabel: "м3",
      placeholder: "Укажите примерный объем в м3",
      min: 0,
      step: 0.1,
      max: 1000,
      icon: "bucket"
    }
  }
];
