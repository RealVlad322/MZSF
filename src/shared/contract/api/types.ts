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

export interface SubjectDto {
  index: number;

  name?: string;

  type?: string;

  place?: string;

  teacher?: string;

  groupName?: string;
}

export interface SheduleOut {
  grade: number;

  faculty?: string;

  groupName: string;

  group: number;

  subgroup?: string;

  date: string;

  index: number;

  discipline: string;

  type: string;

  place: string;

  address?: string;

  teacher: string;
}

export interface SheduleGetListDto {
  grade?: number;

  groupName?: string;

  group?: number;

  teacher?: string;

  startTimeStamp: string;

  endTimeStamp: string;

  sortByDate?: Directions;
}

export enum Directions {
  ASC = 'asc',
  DESC = 'desc',
}
