import '@abraham/reflection';
import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

export const container = new Container({ defaultScope: 'Singleton' });

export const { lazyInject } = getDecorators(container);
