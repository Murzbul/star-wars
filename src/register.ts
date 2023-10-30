import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';
import { IEncryption, Md5EncryptionStrategy } from '@digichanges/shared-experience';

import { FACTORIES, REPOSITORIES } from './Config/Injects';

import IItemRepository from './Item/Infrastructure/Repositories/IItemRepository';
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';

import ItemMongooseRepository from './Item/Infrastructure/Repositories/ItemMongooseRepository';
import NotificationMongooseRepository from './Notification/Infrastructure/Repositories/NotificationMongooseRepository';

// Repositories
container.register<IItemRepository>(REPOSITORIES.IItemRepository, { useClass: ItemMongooseRepository }, { lifecycle: Lifecycle.Singleton });
container.register<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository, { useClass: NotificationMongooseRepository }, { lifecycle: Lifecycle.Singleton });

// Shared
container.register<IEncryption>(FACTORIES.Md5EncryptionStrategy, { useClass: Md5EncryptionStrategy }, { lifecycle: Lifecycle.Singleton });

export default container;
