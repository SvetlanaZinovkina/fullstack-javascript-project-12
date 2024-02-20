import * as Yup from 'yup';

export const signinSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(50, 'Максимум 50 букв')
    .required('Обязательное поле'),
  password: Yup.string()
    .min(2, 'Минимум 2 буквы')
    .max(8, 'Максимум 8 букв')
    .required('Обязательное поле'),
});

export const messagesSchema = Yup.object().shape({
  message: Yup.string()
    .min(1, 'Минимум 1 буква')
    .required('Обязательное поле'),
});

export const channelsSchema = Yup.object().shape({
  channel: Yup.string()
    .min(1, 'Минимум 1 буква')
    .required('Обязательное поле'),
});
