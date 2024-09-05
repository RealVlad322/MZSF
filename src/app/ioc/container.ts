import '@abraham/reflection';

import { SheduleApiService } from '@/shared/contract';
import { SheduleService } from '@/shared/contract/services';
import { HttpAgent, StorageAgent, ToastAgent } from '@/shared/lib';
import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

import { MainStore } from '../../features/main/main.store';

export const container = new Container({ defaultScope: 'Singleton' });

export const { lazyInject } = getDecorators(container);

container.bind(HttpAgent).toSelf().inTransientScope();
container.bind(ToastAgent).toSelf();
container.bind(StorageAgent).toSelf();

container.bind(SheduleApiService).toSelf();
container.bind(SheduleService).toSelf();
container.bind(MainStore).toSelf();
