import 'reflect-metadata';
import { container, Lifecycle } from 'tsyringe';
import { IEncryption, Md5EncryptionStrategy } from '@digichanges/shared-experience';

import { FACTORIES, REPOSITORIES } from './Config/Injects';

import IPlanetRepository from './Planet/Infrastructure/Repositories/IPlanetRepository';
import INotificationRepository from './Notification/Infrastructure/Repositories/INotificationRepository';
import INotificationDomain from './Notification/Domain/Entities/INotificationDomain';
import IPeopleRepository from './People/Infrastructure/Repositories/IPeopleRepository';
import IStarshipRepository from './Starship/Infrastructure/Repositories/IStarshipRepository';

import PlanetMongooseRepository from './Planet/Infrastructure/Repositories/PlanetMongooseRepository';
import NotificationMongooseRepository from './Notification/Infrastructure/Repositories/NotificationMongooseRepository';
import PeopleMongooseRepository from './People/Infrastructure/Repositories/PeopleMongooseRepository';
import StarshipMongooseRepository from './Starship/Infrastructure/Repositories/StarshipMongooseRepository';
import IFilmRepository from "./Films/Infrastructure/Repositories/IFilmRepository";
import FilmMongooseRepository from "./Films/Infrastructure/Repositories/FilmMongooseRepository";

// Repositories
container.register<IPlanetRepository>(REPOSITORIES.IPlanetRepository, { useClass: PlanetMongooseRepository }, { lifecycle: Lifecycle.Singleton });
container.register<IPeopleRepository>(REPOSITORIES.IPeopleRepository, { useClass: PeopleMongooseRepository }, { lifecycle: Lifecycle.Singleton });
container.register<IStarshipRepository>(REPOSITORIES.IStarshipRepository, { useClass: StarshipMongooseRepository }, { lifecycle: Lifecycle.Singleton });
container.register<IFilmRepository>(REPOSITORIES.IFilmRepository, { useClass: FilmMongooseRepository }, { lifecycle: Lifecycle.Singleton });
container.register<INotificationRepository<INotificationDomain>>(REPOSITORIES.INotificationRepository, { useClass: NotificationMongooseRepository }, { lifecycle: Lifecycle.Singleton });

// Shared
container.register<IEncryption>(FACTORIES.Md5EncryptionStrategy, { useClass: Md5EncryptionStrategy }, { lifecycle: Lifecycle.Singleton });

export default container;
