import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import { IStarshipResponse, IListStarshipsResponse } from './types';
import MainConfig from '../../Config/MainConfig';
import ICreateConnection from '../../Main/Infrastructure/Database/ICreateConnection';

describe('Start Starship Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    const starshipId = '';

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

    describe('Starship Success', () =>
    {
        test('Get Starship /starships/:id', async() =>
        {
            const response: IStarshipResponse = await request
                .get(`/api/starships/${starshipId}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);
        });

        test('Get Starships /starships with pagination', async() =>
        {
            const config = MainConfig.getInstance();

            const response: IListStarshipsResponse = await request
                .get('/api/starships?pagination[offset]=0&pagination[limit]=5')
                .set('Accept', 'application/json')
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(5);
            expect(pagination.total).toStrictEqual(5);
            expect(pagination.perPage).toStrictEqual(5);
            expect(pagination.currentPage).toStrictEqual(1);
            expect(pagination.lastPage).toStrictEqual(1);
            expect(pagination.from).toStrictEqual(0);
            expect(pagination.to).toStrictEqual(5);
            expect(pagination.path).toContain(config.getConfig().url.urlApi);
            expect(pagination.firstUrl).toContain('/api/starships?pagination[offset]=0&pagination[limit]=5');
            expect(pagination.lastUrl).toContain('/api/starships?pagination[offset]=0&pagination[limit]=5');
            expect(pagination.nextUrl).toStrictEqual(null);
            expect(pagination.prevUrl).toStrictEqual(null);
            expect(pagination.currentUrl).toContain('/api/starships?pagination[offset]=0&pagination[limit]=5');
        });

        test('Get Starships /starships without pagination', async() =>
        {
            const response: IListStarshipsResponse = await request
                .get('/api/starships')
                .set('Accept', 'application/json')
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(5);
            expect(pagination).not.toBeDefined();
        });

        test('Get Starships /starships with Sort Desc Type', async() =>
        {
            const response: IListStarshipsResponse = await request
                .get('/api/starships?pagination[limit]=20&pagination[offset]=0&sort[name]=desc')
                .set('Accept', 'application/json')
                .send();

            expect(response.statusCode).toStrictEqual(200);
        });
    });

    describe('Starship Fails', () =>
    {
        test('Get Starship /starships/:id', async() =>
        {
            const response: IStarshipResponse = await request
                .get(`/api/starships/${starshipId}dasdasda123`)
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

