export default [
  {
    name: {
      component: "string",
      label: "Название заявки",
      multiline: false,
      placeholder: "Имя",
      required: true,
      icon: "megaphone"
    }
  },
  {
    gender: {
      component: "string",
      label: "You gender",
      multiline: false,
      placeholder: "You gender",
      required: true,
      icon: "male"
    }
  },
  {
    description: {
      component: "multiline",
      label: "Описание заявки",
      multiline: true,
      placeholder: "Введите описание",
      required: true,
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
  }
];
