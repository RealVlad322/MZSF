import { injectable } from 'inversify';
import { makeAutoObservable } from 'mobx';

import { CookieAgent, type HttpHeaders, fromBase64 } from '../../lib';

@injectable()
export class SessionStore {
  private accessToken: string | null;

  payload: Session | null;

  profileId: string | null = null;
  isAuthorized: boolean;

  constructor(
    private readonly cookie$: CookieAgent,
  ) {
    this.accessToken = cookie$.get('accessToken');
    this.payload = this.accessToken ? this._parsePayload(this.accessToken) : null;
    this.profileId = cookie$.get('profileId') || this.payload?.profileId || null;
    this.isAuthorized = !!this.payload;
    makeAutoObservable(this);
  }

  setToken(accessToken: string, rememberMe: boolean = false): void {
    this.accessToken = accessToken;

    this.payload = this._parsePayload(accessToken);

    this.profileId ||= this.payload!.profileId || null;
    this.isAuthorized = true;

    if (rememberMe) {
      const date = new Date(Date.now() + 86400e3 * 30);
      this.cookie$.set('accessToken', accessToken, { expires: date });
    } else {
      this.cookie$.set('accessToken', accessToken);
    }

    if (this.profileId) {
      this.cookie$.set('profileId', this.profileId);
    }
  }

  unsetToken(): void {
    this.accessToken = null;
    this.cookie$.delete('accessToken');
    this.cookie$.delete('adminAccessToken');
    this.payload = null;
    this.profileId = null;
    this.isAuthorized = false;
  }

  setProfileId(profileId: string | null): void {
    this.profileId = profileId;

    if (this.profileId) {
      this.cookie$.set('profileId', this.profileId);
    }
  }

  getHeaders(): HttpHeaders {
    if (!this.accessToken) {
      return {};
    }

    return {
      'Authorization': `Bearer ${this.accessToken}`,
    };
  }

  private _parsePayload<T>(accessToken: string): T {
    if (!accessToken) {
      throw new Error('Bad access token');
    }

    const [, b64] = accessToken.split('.');
    const json = fromBase64(b64);

    const payload = JSON.parse(json) as T;

    return payload;
  }
}

export interface Session {
  id: string;
  profileId: string;
  role: string;
  scope: string[];
  iat: number;
  exp: number;
}
