import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import { IFilmResponse, IListFilmsResponse } from './types';
import MainConfig from '../../Config/MainConfig';
import ICreateConnection from '../../Main/Infrastructure/Database/ICreateConnection';

describe('Start Film Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    const filmId = '';

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

    describe('Film Success', () =>
    {
        test('Get Film /films/:id', async() =>
        {
            const response: IFilmResponse = await request
                .get(`/api/films/${filmId}`)
                .set('Accept', 'application/json')
                .send();

            expect(response.statusCode).toStrictEqual(200);
        });

        test('Get Films /films with pagination', async() =>
        {
            const config = MainConfig.getInstance();

            const response: IListFilmsResponse = await request
                .get('/api/films?pagination[offset]=0&pagination[limit]=5')
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
            expect(pagination.firstUrl).toContain('/api/films?pagination[offset]=0&pagination[limit]=5');
            expect(pagination.lastUrl).toContain('/api/films?pagination[offset]=0&pagination[limit]=5');
            expect(pagination.nextUrl).toStrictEqual(null);
            expect(pagination.prevUrl).toStrictEqual(null);
            expect(pagination.currentUrl).toContain('/api/films?pagination[offset]=0&pagination[limit]=5');
        });

        test('Get Films /films without pagination', async() =>
        {
            const response: IListFilmsResponse = await request
                .get('/api/films')
                .set('Accept', 'application/json')
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(5);
            expect(pagination).not.toBeDefined();
        });

        test('Get Films /films with Sort Desc Type', async() =>
        {
            const response: IListFilmsResponse = await request
                .get('/api/films?pagination[limit]=20&pagination[offset]=0&sort[name]=desc')
                .set('Accept', 'application/json')
                .send();

            expect(response.statusCode).toStrictEqual(200);
        });
    });

    describe('Film Fails', () =>
    {
        test('Get Film /films/:id', async() =>
        {
            const response: IFilmResponse = await request
                .get(`/api/films/${filmId}dasdasda123`)
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

