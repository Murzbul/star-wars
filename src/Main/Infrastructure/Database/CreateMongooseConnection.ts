import { connect, connection } from 'mongoose';
import { urlAlphabet } from 'nanoid';
import { customAlphabet } from 'nanoid/async';

import PlanetSchema, { PlanetMongooseDocument } from '../../../Planet/Infrastructure/Schemas/PlanetMongoose';

import {
    EmailNotificationSchema, NotificationMongooseDocument,
    NotificationSchema,
    PushNotificationSchema
} from '../../../Notification/Infrastructure/Schemas/NotificationMongoose';
import ICreateConnection from './ICreateConnection';

type MongooseOptions = { autoIndex: boolean };

class CreateMongooseConnection implements ICreateConnection
{
    #uri: string;
    readonly #options: MongooseOptions;

    constructor(config: { uri: string })
    {
        this.#uri = config.uri;
        this.#options = {
            autoIndex: true
        };
    }

    async initConfig(): Promise<void>
    {
        //
    }

    async initConfigTest(): Promise<void>
    {
        const nanoId = customAlphabet(urlAlphabet, 5);
        const dbName = await nanoId();
        this.#uri = `${process.env.MONGO_URL}${dbName}`;
    }

    async create(): Promise<void>
    {
        await connect(this.#uri, this.#options);

        // Domain
        connection.model<PlanetMongooseDocument>('Planet', PlanetSchema);

        // Infrastructure
        const NotificationModel = connection.model<NotificationMongooseDocument>('Notification', NotificationSchema);
        NotificationModel.discriminator('EmailNotification', EmailNotificationSchema);
        NotificationModel.discriminator('PushNotification', PushNotificationSchema);
    }

    async close(force = true): Promise<any>
    {
        if (connection)
        {
            await connection.close(force);
        }
    }

    async synchronize(): Promise<void>
    {
        return Promise.resolve(undefined); // There is no need to synchronize
    }

    async drop(): Promise<void>
    {
        const collections = connection ? await connection.db.collections() : [];

        for (const collection of collections)
        {
            await collection.drop();
        }
    }
}

export default CreateMongooseConnection;
