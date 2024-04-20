import { injectable } from 'inversify';
import { makeAutoObservable, reaction } from 'mobx';

import { SessionStore } from './session.store';
import { ToastAgent, delay } from '../../lib';
import { ProfileService } from '../services';
import { type ProfileType } from '../types';

@injectable()
export class ProfileStore {
  profile: ProfileType | null = null;
  constructor(
    private readonly profile$$: ProfileService,
    private readonly toast$: ToastAgent,
    private readonly session$: SessionStore,
  ) {
    makeAutoObservable(this);
    reaction(
      () => this.session$.isAuthorized,
      () => this.load(),
    );
    reaction(
      () => this.session$.profileId,
      () => this.setProfileId(this.session$.profileId),
    );
  }

  async load(): Promise<void> {
    const { isAuthorized } = this.session$;

    if (isAuthorized) {
      try {
        const profile = await this.profile$$.getProfile();

        this.setProfile(profile);
      } catch (err: any) {
        if (err.statusCode === 401) {
          this.session$.unsetToken();
          this.setProfile(null);

          await delay(10);

          if (!location.pathname.startsWith('/auth')) {
            location.href = '/auth/signin';
          }

          return;
        }

        this.toast$.show('Ошибка сервера', { variant: 'error' });

        throw err;
      }
    } else {
      this.setProfile(null);

      if (!location.pathname.startsWith('/auth')) {
        location.href = '/auth/signin';
      }
    }
  }

  setProfile(profile: ProfileType | null): void {
    this.profile = profile;
    this.setProfileId(profile?.id ?? '');
  }

  setProfileId(profileId: string | null): void {
    this.session$.setProfileId(profileId);
  }
}
