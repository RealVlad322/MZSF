export interface LoginDto {
  email: string;

  pwd: string;
}

export interface RegisterDto {
  email: string;

  pwd: string;

  telegramName?: string;
}

export interface ProfileJwtOut {
  accessToken: string;
}

export interface UserEmailHashOut {
  hash: string;
}

export interface ProfileSetEmailDto {
  email: string;
}

export interface ProfileConfirmEmailDto {
  email: string;

  hash: string;
}

export interface ProfileAuthResetPasswordDto {
  email: string;
}

export interface ProfileVerifyCodeDto {
  email: string;

  hash: string;
}

export interface ProfileConfirmPasswordDto {
  email: string;

  pwd: string;

  hash: string;
}
