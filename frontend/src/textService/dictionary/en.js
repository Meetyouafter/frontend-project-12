export default {
  translation: {
    network_error: 'Network error',
    connection_error: 'Please, check your connection227',
    header: {
      title: 'Hexlet Chat',
      en: 'En',
      ru: 'Ru',
      button: 'Logout',
      notification: 'Language changed to english',
    },
    login: {
      pages_data: {
        title: 'Login',
        button: 'Login',
        footer_description: "Don't have an account?",
        footer_link: 'Sign Up',
      },
      forms: {
        name: 'Username',
        password: 'Password',
      },
      errors: {
        unregister: 'This user is not registed',
      },
    },
    sign_up: {
      pages_data: {
        title: 'Sign Up',
        button: 'Sign Up',
        footer_description: 'Do you have an account?',
        footer_link: 'Login',
      },
      forms: {
        name: 'Username',
        password: 'Password',
        password_repeat: 'Repeat password',
      },
      errors: {
        required: 'This form is required',
        password_length: 'Password must be more than 6 characters',
        password_match: 'Passwords must match',
        name_length: 'From 3 to 20 characters',
        user_not_uniq: 'Such a user already exist',
      },
    },
    chat: {
      channels: 'Channels',
      label: 'Channel settings',
      message_form: 'Text your message',
      message_label: 'New message',
      countMessages: {
        message_one: '{{count}} message',
        message_other: '{{count}} messages',
      },
    },
    modal: {
      addModal: {
        title: 'Add a new channel',
        label: 'Channel name',
        input_form: 'New channel name',
        escape_button: 'Close',
        success_button: 'Add',
        required_error: 'This form is required',
        length_error: 'From 3 to 20 characters',
        unique_error: 'Name must be unique',
        notification: 'Channel was added',
        error_notification: 'Network error',
        error_connection: 'Please, check your connection',
      },
      renameModal: {
        rename_link: 'Rename',
        label: 'Channel name',
        title: 'Rename channel',
        input_form: 'New channel name',
        escape_button: 'Close',
        success_button: 'Rename',
        required_error: 'This form is required',
        unique_error: 'Name must be unique',
        length_error: 'From 3 to 20 characters',
        notification: 'Channel was renamed',
        error_notification: 'Network error',
      },
      removeModal: {
        remove_link: 'Remove',
        title: 'Remove channel',
        description: 'Are you shure?',
        escape_button: 'Close',
        success_button: 'Remove',
        notification: 'Channel was removed',
        error_notification: 'Network error',
      },
    },
    error: {
      button: 'Back to the chat',
      not_found: 'Page not found',
    },
    loader: {
      title: 'Loading...',
    },
  },
};
