import {
  type LoginDto,
  type ProfileAuthResetPasswordDto,
  type ProfileConfirmEmailDto,
  type ProfileConfirmPasswordDto,
  type ProfileJwtOut,
  type ProfileSetEmailDto,
  type ProfileVerifyCodeDto,
  type RegisterDto,
  type UserEmailHashOut,
} from './types';
import { type HttpAgent } from '../../lib';
import { API_BASE_URL } from '../constants';
import { type SessionStore } from '../stores/session.store';
import { type ProfileType } from '../types';

export class ProfileApiService {
  constructor(private readonly http$: HttpAgent, private readonly session$: SessionStore) {
    this.http$.setBaseUrl(API_BASE_URL);
  }

  async getProfile(): Promise<ProfileType> {
    const result = await this.http$.get<ProfileType>('/user/users/profile', {
      headers: { ...this.session$.getHeaders() },
    });

    return result;
  }

  async login(body: LoginDto): Promise<ProfileJwtOut> {
    const result = await this.http$.post<ProfileJwtOut>('/user/users/login', {
      headers: { ...this.session$.getHeaders() },
      json: body,
    });

    return result;
  }

  async register(body: RegisterDto): Promise<ProfileJwtOut> {
    const result = await this.http$.post<ProfileJwtOut>('/user/users/register', {
      headers: { ...this.session$.getHeaders() },
      json: body,
    });

    return result;
  }

  async setEmail(body: ProfileSetEmailDto, signal?: AbortSignal): Promise<unknown> {
    const result = await this.http$.post<unknown>('/user/users/set_email', {
      signal,
      headers: {
        ...this.session$.getHeaders(),
      },
      json: body,
    });

    return result;
  }

  async confirmEmail(body: ProfileConfirmEmailDto, signal?: AbortSignal): Promise<ProfileJwtOut> {
    const result = await this.http$.post<ProfileJwtOut>('/user/users/confirm_email', {
      signal,
      headers: {
        ...this.session$.getHeaders(),
      },
      json: body,
    });

    return result;
  }

  async getEmailHash(
    query: { email: string; code: string },
    signal?: AbortSignal,
  ): Promise<UserEmailHashOut> {
    const result = await this.http$.get<UserEmailHashOut>('/user/users/email_hash', {
      signal,
      headers: {
        ...this.session$.getHeaders(),
      },
      query,
    });

    return result;
  }

  async resetPassword(body: ProfileAuthResetPasswordDto, signal?: AbortSignal): Promise<unknown> {
    const result = await this.http$.post<unknown>('/user/users/reset_password', {
      signal,
      headers: {
        ...this.session$.getHeaders(),
      },
      json: body,
    });

    return result;
  }

  async verifyEmailHash(body: ProfileVerifyCodeDto, signal?: AbortSignal): Promise<unknown> {
    const result = await this.http$.post<unknown>('/user/users/verify_code', {
      signal,
      headers: {
        ...this.session$.getHeaders(),
      },
      json: body,
    });

    return result;
  }

  async confirmPassword(
    body: ProfileConfirmPasswordDto,
    signal?: AbortSignal,
  ): Promise<ProfileJwtOut> {
    const result = await this.http$.post<ProfileJwtOut>('/user/users/confirm_password', {
      signal,
      headers: {
        ...this.session$.getHeaders(),
      },
      json: body,
    });

    return result;
  }
}
