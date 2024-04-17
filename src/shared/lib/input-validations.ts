import { isEmail } from '@/shared/lib';

export const EMAIL_VALIDATION = {
  required: 'E-mail не должен быть пустым',
  validate: (val: string) => isEmail(val) || 'Не валидный e-mail',
};

export const PHONE_VALIDATION = {
  required: 'Телефон не должен быть пустым',
};

export const PASSWORD_VALIDATION = {
  required: 'Пароль не должен быть пустым',
  minLength: {
    value: 6,
    message: 'Пароль не должен быть меньше 6 символов',
  },
};
