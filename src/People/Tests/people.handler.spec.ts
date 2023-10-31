import { SuperAgentTest } from 'supertest';
import initTestServer from '../../initTestServer';
import { IPeopleResponse, IListPeoplesResponse } from './types';
import MainConfig from '../../Config/MainConfig';
import ICreateConnection from '../../Main/Infrastructure/Database/ICreateConnection';
import { faker } from "@faker-js/faker";
import SavePlanetUseCase from "../../Planet/Domain/UseCases/SavePlanetUseCase";

describe('Start People Test', () =>
{
    let request: SuperAgentTest;
    let dbConnection: ICreateConnection;
    let peopleId = '';

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
        let payload;

        beforeAll(async() =>
        {
           const payloadPlanet = {
                name: faker.person.firstName(),
                rotationPeriod: `${faker.number.int({ max: 24 })}`,
                orbitalPeriod: `${faker.number.int({ max: 500 })}`,
                diameter: `${faker.number.int({ max: 100000 })}`,
                climate: faker.science.chemicalElement().name,
                gravity: faker.person.firstName(),
                terrain: faker.word.adjective(10),
                surfaceWater: faker.person.firstName(),
                population: `${faker.number.int({ max: 500000 })}`,
                url: faker.internet.url()
            }

            const savePlanetUseCase = new SavePlanetUseCase();
            const planet = await savePlanetUseCase.handle(payloadPlanet);

            payload = {
                name: faker.person.firstName(),
                height: `${faker.number.int({ max: 24 })}`,
                mass: `${faker.number.int({ max: 500 })}`,
                hairColor: `${faker.number.int({ max: 100000 })}`,
                skinColor: faker.science.chemicalElement().name,
                eyeColor: faker.person.firstName(),
                birthYear: faker.word.adjective(10),
                gender: faker.person.gender(),
                homeWorld: planet.getId(),
                url: faker.internet.url()
            };
        });

        test('Add People /people', async() =>
        {
            const response: IPeopleResponse = await request
                .post('/api/people')
                .set('Accept', 'application/json')
                .send(payload);

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(201);

            peopleId = data.id;
        });

        test('Get People /people/:id', async() =>
        {
            const response: IPeopleResponse = await request
                .get(`/api/people/${peopleId}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data } } = response;

            expect(response.statusCode).toStrictEqual(200);
            expect(data.name).toStrictEqual(payload.name);
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

            expect(data.length).toStrictEqual(1);
            expect(pagination.total).toStrictEqual(1);
            expect(pagination.perPage).toStrictEqual(1);
            expect(pagination.currentPage).toStrictEqual(1);
            expect(pagination.lastPage).toStrictEqual(1);
            expect(pagination.from).toStrictEqual(0);
            expect(pagination.to).toStrictEqual(1);
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
            expect(data.length).toStrictEqual(1);
            expect(pagination).not.toBeDefined();
        });

        test('Get Peoples /people with Filter Type', async() =>
        {
            const response: IListPeoplesResponse = await request
                .get(`/api/people?pagination[limit]=20&pagination[offset]=0&filter[name]=${payload.name}`)
                .set('Accept', 'application/json')
                .send();

            const { body: { data, pagination } } = response;

            expect(response.statusCode).toStrictEqual(200);

            expect(data.length).toStrictEqual(1);
            expect(pagination.total).toStrictEqual(1);

            expect(data[0].name).toStrictEqual(payload.name);
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
        test('Add People /Peoples', async() =>
        {
            const payload = {
                name: 'People 2',
                climate: true
            };

            const response: IPeopleResponse = await request
                .post('/api/people')
                .set('Accept', 'application/json')
                .send(payload);

            const { body: { message, errors: [error] } } = response;

            expect(response.statusCode).toStrictEqual(422);
            expect(message).toStrictEqual('Request Failed.');

            expect(error.code).toStrictEqual('invalid_type');
            expect(error.message).toStrictEqual('Required');
        });

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

