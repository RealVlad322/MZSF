import { injectable } from 'inversify';

import { ProfileApiService } from '../api';
import { type LoginDto, type RegisterDto } from '../api/types';
import { type ProfileType } from '../types';

@injectable()
export class ProfileService {
  constructor(
    private readonly profileApi: ProfileApiService,
  ) {}

  async getProfile(): Promise<ProfileType> {
    const result = await this.profileApi.getProfile();

    return result;
  }

  async login(body: LoginDto): Promise<string> {
    const result = await this.profileApi.login(body);

    const { accessToken } = result;

    return accessToken;
  }

  async register(body: RegisterDto): Promise<string> {
    const result = await this.profileApi.register(body);

    const { accessToken } = result;

    return accessToken;
  }
}
