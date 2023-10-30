import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import { IPlanetResponse, IListPlanetsResponse } from './types';
import MainConfig from '../../Config/MainConfig';
import ICreateConnection from '../../Main/Infrastructure/Database/ICreateConnection';
import { faker } from "@faker-js/faker";

describe('Start Planet Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let planetId = '';

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
        const payload = {
                name: faker.person.firstName(),
                rotationPeriod: `${faker.number.int({ max: 24 })}`,
                orbitalPeriod: `${faker.number.int({ max: 500 })}`,
                diameter: `${faker.number.int({ max: 100000 })}`,
                climate: faker.science.chemicalElement().name,
                gravity: faker.person.firstName(),
                terrain: faker.word.adjective(),
                surfaceWater: faker.person.firstName(),
                population: `${faker.number.int({ max: 500000 })}`,
                url: faker.internet.url()
            };

        test('Add Planet /planets', async() =>
        {
            const response: IPlanetResponse = await request
                .post('/api/planets')
                .set('Accept', 'application/json')
                .send(payload);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);

            planetId = data.id;
        });

        test('Get Planet /planets/:id', async() =>
        {
            const response: IPlanetResponse = await request
                .get(`/api/planets/${planetId}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.name).toStrictEqual(payload.name);
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
            expect(pagination.total).toStrictEqual(11);
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

        test('Get Planets /planets without pagination', async() =>
        {
            const response: IListPlanetsResponse = await request
                .get('/api/planets')
                .set('Accept', 'application/json')
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(11);
            expect(pagination).not.toBeDefined();
        });

        test('Get Planets /planets with Filter Type', async() =>
        {
            const response: IListPlanetsResponse = await request
                .get(`/api/planets?pagination[limit]=20&pagination[offset]=0&filter[name]=${payload.name}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(1);
            expect(pagination.total).toStrictEqual(1);

            expect(data[0].name).toStrictEqual(payload.name);
        });

        test('Get Planets /planets with Sort Desc Type', async() =>
        {
            const response: IListPlanetsResponse = await request
                .get('/api/planets?pagination[limit]=20&pagination[offset]=0&sort[type]=desc')
                .set('Accept', 'application/json')
                .send();

            expect(response.statusCode).toStrictEqual(200);
        });
    });

    describe('Planet Fails', () =>
    {
        test('Add Planet /Planets', async() =>
        {
            const payload = {
                name: 'Planet 2',
                climate: true
            };

            const response: IPlanetResponse = await request
                .post('/api/planets')
                .set('Accept', 'application/json')
                .send(payload);

            const { body: { message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(message).toStrictEqual('Request Failed.');

            expect(error.code).toStrictEqual('invalid_type');
            expect(error.message).toStrictEqual('Required');
        });

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

