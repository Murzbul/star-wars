import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import { IPeopleResponse, IListPeoplesResponse } from './types';
import MainConfig from '../../Config/MainConfig';
import ICreateConnection from '../../Main/Infrastructure/Database/ICreateConnection';

describe('Start People Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    const peopleId = '';

    beforeAll(async() =>
    {
        const configServer = await initTestServer();

        request = configServer.request;
        dbConnection = configServer.dbConnection;
    });

    afterAll((async() =>
    {
        await dbConnection.drop();
        await dbConnection.close();
    }));

    describe('People Success', () =>
    {
        test('Get People /people/:id', async() =>
        {
            const response: IPeopleResponse = await request
                .get(`/api/people/${peopleId}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);
        });

        test('Get Peoples /people with pagination', async() =>
        {
            const config = MainConfig.getInstance();

            const response: IListPeoplesResponse = await request
                .get('/api/people?pagination[offset]=0&pagination[limit]=5')
                .set('Accept', 'application/json')
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(5);
            expect(pagination.perPage).toStrictEqual(5);
            expect(pagination.currentPage).toStrictEqual(1);
            expect(pagination.lastPage).toStrictEqual(15);
            expect(pagination.from).toStrictEqual(0);
            expect(pagination.to).toStrictEqual(5);
            expect(pagination.path).toContain(config.getConfig().url.urlApi);
            expect(pagination.prevUrl).toStrictEqual(null);
        });

        test('Get Peoples /people without pagination', async() =>
        {
            const response: IListPeoplesResponse = await request
                .get('/api/people')
                .set('Accept', 'application/json')
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(data.length).toStrictEqual(75);
            expect(pagination).not.toBeDefined();
        });

        test('Get Peoples /people with Filter Type', async() =>
        {
            const response: IListPeoplesResponse = await request
                .get('/api/people?pagination[limit]=20&pagination[offset]=0&filter[name]=Foo1')
                .set('Accept', 'application/json')
                .send();

            const { body: { pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(pagination.total).toBeGreaterThanOrEqual(1);
        });

        test('Get Peoples /people with Sort Desc Type', async() =>
        {
            const response: IListPeoplesResponse = await request
                .get('/api/people?pagination[limit]=20&pagination[offset]=0&sort[name]=desc')
                .set('Accept', 'application/json')
                .send();

            expect(response.statusCode).toStrictEqual(200);
        });
    });

    describe('People Fails', () =>
    {
        test('Get People /people/:id', async() =>
        {
            const response: IPeopleResponse = await request
                .get(`/api/people/${peopleId}dasdasda123`)
                .set('Accept', 'application/json')
                .send();

            const { body: { message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(message).toStrictEqual('Request Failed.');

            expect(error.code).toStrictEqual('invalid_string');
            expect(error.message).toStrictEqual('Invalid uuid');
        });
    });
});

