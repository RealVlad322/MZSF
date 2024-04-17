import { emailValidate, passwordValidate } from '@/shared/lib/regExps';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { type FC, useEffect, useState } from 'react';

import $ from './sign-in.module.scss';

export const SignInFeature: FC<SignInFeatureProps> = (props) => {
  const {} = props;

  const [mail, setMail] = useState('');
  const [pwd, setPwd] = useState('');
  const [isValidMail, setIsValidMail] = useState(false);
  const [isValidPwd, setIsValidPwd] = useState(false);
  const [validTextMail, setValidTextMail] = useState('');
  const [validTextPwd, setValidTextPwd] = useState('');

  useEffect(() => {
    if (emailValidate(mail)) {
      setIsValidMail(true);
    } else {
      setIsValidMail(false);
      setValidTextMail('Введите правильный e-mail');
    }

    if (passwordValidate(pwd)) {
      setIsValidPwd(true);
    } else {
      setIsValidPwd(false);
      setValidTextPwd('Введите правильный пароль');
    }
  }, [mail, pwd]);

  return (
    <div className={$.container}>
      <Box component="form">
        <Stack gap="20px" alignItems="center">
          <Typography className={$.title} variant="h2">
            Авторизация
          </Typography>
          <TextField
            error={mail ? !isValidMail : false}
            helperText={mail && !isValidMail ? validTextMail : undefined}
            required
            onChange={(e) => setMail(e.target.value)}
            value={mail}
            fullWidth
            type="email"
            label="E-mail"
          />
          <TextField
            error={pwd ? !isValidPwd : false}
            helperText={pwd && !isValidPwd ? validTextPwd : undefined}
            required
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            fullWidth
            type="password"
            label="Пароль"
          />
          <Button
            type="submit"
            disabled={!pwd || !mail}
            className={$.button}
            variant="contained"
            color="success"
          >
            Войти
          </Button>
          <Divider variant="middle" />
          <Link>Забыли пароль?</Link>
        </Stack>
      </Box>
    </div>
  );
};

export interface SignInFeatureProps {}
