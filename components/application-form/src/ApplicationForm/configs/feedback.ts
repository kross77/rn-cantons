export default [
  {
    score: {
      component: "rating",
      label: "Оценка",
      description: "Ваша оценка работы с клиентом",
      placeholder: "Поставьте вашу оценку",
      required: true,
      icon: "star"
    }
  },
  {
    message: {
      component: "multiline",
      label: "Отзыв",
      placeholder: "Напишите ваш отзыв",
      description:
        "Не бойтесь писать правду, хвалите и жалуйтесь на водителя. Будте честны и вы получать более адекватную информацию о водителях в будущем",
      required: true,
      icon: "mail"
    }
  }
];
