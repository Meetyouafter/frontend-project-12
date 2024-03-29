export default {
  translation: {
    network_error: 'Ошибка соединения',
    connection_error: 'Пожалуйста, проверьте соединение',
    header: {
      title: 'Hexlet Chat',
      en: 'En',
      ru: 'Ru',
      button: 'Выйти',
      notification: 'Язык изменен на русский',
    },
    login: {
      pages_data: {
        title: 'Войти',
        button: 'Войти',
        footer_description: 'Нет аккаунта?',
        footer_link: 'Регистрация',
      },
      forms: {
        name: 'Ваш ник',
        password: 'Пароль',
      },
      errors: {
        unregister: 'Неверные имя пользователя или пароль',
      },
    },
    sign_up: {
      pages_data: {
        title: 'Регистрация',
        button: 'Регистрация',
        footer_description: 'Уже есть аккаунт?',
        footer_link: 'Войти',
      },
      forms: {
        name: 'Имя пользователя',
        password: 'Пароль',
        password_repeat: 'Подтвердите пароль',
      },
      errors: {
        required: 'Поле обязательно для заполнения',
        password_length: 'Не менее 6 символов',
        password_match: 'Пароли должны совпадать',
        name_length: 'От 3 до 20 символов',
        user_not_uniq: 'Такой пользователь уже существует',
      },
    },
    chat: {
      channels: 'Каналы',
      label: 'Управление каналом',
      message_form: 'Введите сообщение',
      message_label: 'Новое сообщение',
      countMessages: {
        message_one: '{{count}} сообщение',
        message_few: '{{count}} сообщения',
        message_many: '{{count}} сообщений',
      },
    },
    modal: {
      addModal: {
        title: 'Добавить канал',
        label: 'Имя канала',
        input_form: 'Новый канал',
        escape_button: 'Отменить',
        success_button: 'Добавить',
        required_error: 'Поле обязательно для заполнения',
        length_error: 'От 3 до 20 символов',
        unique_error: 'Должно быть уникальным',
        notification: 'Канал создан',
        error_notification: 'Ошибка соединения',
        error_connection: 'Пожалуйста, проверьте соединение',

      },
      renameModal: {
        rename_link: 'Переименовать',
        label: 'Имя канала',
        title: 'Переименовать канал',
        input_form: 'Новое имя',
        escape_button: 'Отменить',
        success_button: 'Переименовать',
        required_error: 'Поле обязательно для заполнения',
        unique_error: 'Должно быть уникальным',
        length_error: 'От 3 до 20 символов',
        notification: 'Канал переименован',
        error_notification: 'Ошибка соединения',
      },
      removeModal: {
        remove_link: 'Удалить',
        title: 'Удалить канал',
        description: 'Уверены?',
        escape_button: 'Отменить',
        success_button: 'Удалить',
        notification: 'Канал удалён',
        error_notification: 'Ошибка соединения',
      },
    },
    error: {
      button: 'Вернуться на главную',
      not_found: 'Страница не найдена',
    },
    loader: {
      title: 'Загрузка...',
    },
  },
};
