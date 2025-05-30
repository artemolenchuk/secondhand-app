// ЗАЛИШАЄМО ДНІ АНГЛІЙСЬКОЮ, ЩОБ ЛОГІКА ФІЛЬТРАЦІЇ ПРАЦЮВАЛА КОРЕКТНО
export const secondhands = [
  {
    id: '1',
    name: 'Секонд "Європа"',
    photo: require('../assets/secondone.png'),
    schedule: 'Пн-Сб: 9:00-19:00',
    firstDay: 'Monday', // Залишаємо англійською
    lastDay: 'Tuesday', // Залишаємо англійською
    type: 'Класичний',
  },
  {
    id: '2',
    name: 'Мега Секонд',
    photo: require('../assets/secondtwo.png'),
    schedule: 'Вт-Нд: 10:00-18:00',
    firstDay: 'Friday', // Залишаємо англійською
    lastDay: 'Saturday', // Залишаємо англійською
    type: 'Сток',
  },
  {
    id: '3',
    name: 'Фешн Хенд',
    photo: require('../assets/secondone.png'),
    schedule: 'Ср-Пн: 11:00-20:00',
    firstDay: 'Wednesday',
    lastDay: 'Friday',
    type: 'Преміум',
  },
  {
    id: '4',
    name: 'Вінтаж Маркет',
    photo: require('../assets/secondtwo.png'),
    schedule: 'Пт-Нд: 10:00-17:00',
    firstDay: 'Friday',
    lastDay: 'Sunday',
    type: 'Вінтаж',
  },
  {
    id: '5',
    name: 'Економка',
    photo: require('../assets/secondone.png'),
    schedule: 'Пн-Пт: 8:00-17:00',
    firstDay: 'Monday',
    lastDay: 'Thursday',
    type: 'Звичайнний',
  },
  {
    id: '6',
    name: 'Одежда-Одежда',
    photo: require('../assets/secondtwo.png'),
    schedule: 'Ср-Нд: 10:00-20:00',
    firstDay: 'Wednesday',
    lastDay: 'Sunday',
    type: 'Сток',
  },
  {
    id: '7',
    name: 'Ретро-Стиль',
    photo: require('../assets/secondone.png'),
    schedule: 'Вс-Пт: 12:00-19:00',
    firstDay: 'Sunday',
    lastDay: 'Friday',
    type: 'Вінтаж',
  },
];