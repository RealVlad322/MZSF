import { emailValidate, passwordValidate } from '@/shared/lib/regExps';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
        <Stack mb="50px" alignItems="center">
          <Typography className={$.title} variant="h2">
            Login
          </Typography>
        </Stack>
        <Stack mb="50px" gap="20px" alignItems="center">
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
            label="Password"
          />
        </Stack>
        <Stack gap="40px" alignItems="center">
          <Stack width="100%" justifyContent="space-between" flexBasis="50%" flexDirection="row">
            <Button
              type="submit"
              disabled={!pwd || !mail}
              fullWidth
              className={$.buttons}
              variant="contained"
              color="success"
            >
            Log In
            </Button>
            <Button
              type="button"
              fullWidth
              className={$.buttons}
              variant="contained"
              color="primary"
            >
            Sign Up
            </Button>
          </Stack>
          <Link>Forgot password?</Link>
        </Stack>
      </Box>
    </div>
  );
};

export interface SignInFeatureProps {}
