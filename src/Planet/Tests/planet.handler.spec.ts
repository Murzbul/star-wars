import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import { IPlanetResponse, IListPlanetsResponse } from './types';
import MainConfig from '../../Config/MainConfig';
import ICreateConnection from '../../Main/Infrastructure/Database/ICreateConnection';

describe('Start Planet Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    const planetId = '';

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

    describe('Planet Success', () =>
    {
        test('Get Planet /planets/:id', async() =>
        {
            const response: IPlanetResponse = await request
                .get(`/api/planets/${planetId}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);
        });

        test('Get Planets /planets with pagination', async() =>
        {
            const config = MainConfig.getInstance();

            const response: IListPlanetsResponse = await request
                .get('/api/planets?pagination[offset]=0&pagination[limit]=5')
                .set('Accept', 'application/json')
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(5);
            expect(pagination.total).toStrictEqual(15);
            expect(pagination.perPage).toStrictEqual(5);
            expect(pagination.currentPage).toStrictEqual(1);
            expect(pagination.lastPage).toStrictEqual(3);
            expect(pagination.from).toStrictEqual(0);
            expect(pagination.to).toStrictEqual(5);
            expect(pagination.path).toContain(config.getConfig().url.urlApi);
            expect(pagination.firstUrl).toContain('/api/planets?pagination[offset]=0&pagination[limit]=5');
            expect(pagination.lastUrl).toContain('/api/planets?pagination[offset]=10&pagination[limit]=5');
            expect(pagination.nextUrl).toContain('/api/planets?pagination[offset]=5&pagination[limit]=5');
            expect(pagination.prevUrl).toStrictEqual(null);
            expect(pagination.currentUrl).toContain('/api/planets?pagination[offset]=0&pagination[limit]=5');
        });

        test('Get Planets /planets with Sort Desc Type', async() =>
        {
            const response: IListPlanetsResponse = await request
                .get('/api/planets?pagination[limit]=20&pagination[offset]=0&sort[name]=desc')
                .set('Accept', 'application/json')
                .send();

            expect(response.statusCode).toStrictEqual(200);
        });
    });

    describe('Planet Fails', () =>
    {
        test('Get Planet /planets/:id', async() =>
        {
            const response: IPlanetResponse = await request
                .get(`/api/planets/${planetId}dasdasda123`)
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

