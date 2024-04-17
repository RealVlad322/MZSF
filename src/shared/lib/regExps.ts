const regExps = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  password: /^[~`!@#$%^&*()_+=[\]{}|;':",./<>?a-zA-Z0-9-]+$/,
  phone: /^\+\d+$/,
  phrase: /^[а-яА-ЯёЁa-zA-Z0-9][-а-яА-ЯёЁa-zA-Z0-9& ]+[а-яА-ЯёЁa-zA-Z0-9]$/iu,
};

const validationFunctions = Object.fromEntries(
  Object.entries(regExps).map(([regExpName]) => [
    `${regExpName}Validate`,
    (str: string) => regExps[regExpName as keyof typeof regExps].test(str),
  ]),
);

export const { emailValidate, passwordValidate, phoneValidate, phraseValidate } =
  validationFunctions;
