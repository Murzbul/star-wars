import { IApp } from '@digichanges/shared-experience';

import supertest from 'supertest';

import DatabaseFactory from './Main/Infrastructure/Factories/DatabaseFactory';
import { EventHandler } from '@digichanges/shared-experience';
import { validateEnv } from './Config/validateEnv';
import SeedFactory from './Shared/Factories/SeedFactory';
import Locales from './Shared/Utils/Locales';
import MainConfig from './Config/MainConfig';
import AppBootstrapFactory from './Main/Presentation/Factories/AppBootstrapFactory';
import ICreateConnection from './Main/Infrastructure/Database/ICreateConnection';
import SendMessageEvent from './Notification/Infrastructure/Events/SendMessageEvent';
import SyncDataMockUseCase from './Swapi/Tests/SyncDataMockUseCase';

type TestServerData = {
    request: supertest.SuperAgentTest,
    dbConnection: ICreateConnection
}

const initTestServer = async(): Promise<TestServerData> =>
{
    validateEnv();

    const config = MainConfig.getInstance().getConfig();

    const databaseFactory: DatabaseFactory = new DatabaseFactory();
    const dbConnection: ICreateConnection = databaseFactory.create();

    await dbConnection.initConfigTest();
    await dbConnection.create();
    await dbConnection.synchronize();

    const eventHandler = EventHandler.getInstance();
    eventHandler.setEvent(new SendMessageEvent());

    void Locales.getInstance();

    const appBootstrap = AppBootstrapFactory.create(config.app.default);

    const app: IApp = await appBootstrap({
        serverPort: 8088,
        proxy: false,
        env: 'test',
        dbConfigDefault: 'Mongoose'
    });

    const application = app.callback();
    const request: supertest.SuperAgentTest = supertest.agent(application);

    const seed = new SeedFactory();
    await seed.init();

    const useCase = new SyncDataMockUseCase();
    await useCase.handle();

    return { request, dbConnection };
};

export default initTestServer;
