import container from '../../../register';
import IPlanetRepository from '../../../Planet/Infrastructure/Repositories/IPlanetRepository';
import IPeopleRepository from '../../../People/Infrastructure/Repositories/IPeopleRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import AxiosFactory from '../../../Shared/Factories/AxiosFactory';
import PlanetRepPayload from '../../../Planet/Domain/Payloads/PlanetRepPayload';
import IPlanetDomain from '../../../Planet/Domain/Entities/IPlanetDomain';
import logger from '../../../Shared/Helpers/Logger';
import AxiosHandler from '../../../Shared/Infrastructure/AxiosHandler';
import StarshipRepPayload from '../../../Starship/Domain/Payloads/StarshipRepPayload';
import IStarshipRepository from '../../../Starship/Infrastructure/Repositories/IStarshipRepository';
import IFilmRepository from "../../../Films/Infrastructure/Repositories/IFilmRepository";

class SyncDataUseCase
{
    #planetRepository: IPlanetRepository;
    #peopleRepository: IPeopleRepository;
    #starshipRepository: IStarshipRepository;
    #filmRepository: IFilmRepository;

    #requester: AxiosHandler;
    #baseUrl = 'https://swapi.dev/api';

    constructor()
    {
        this.#planetRepository = container.resolve<IPlanetRepository>(REPOSITORIES.IPlanetRepository);
        this.#peopleRepository = container.resolve<IPeopleRepository>(REPOSITORIES.IPeopleRepository);
        this.#starshipRepository = container.resolve<IStarshipRepository>(REPOSITORIES.IStarshipRepository);
        this.#filmRepository = container.resolve<IFilmRepository>(REPOSITORIES.IFilmRepository);
    }

    async handle(): Promise<void>
    {
        this.#requester = AxiosFactory.getAxiosHandlerInstance();
        await this.#planetAsync();
        await this.#peopleAsync();
        await this.#starshipAsync();
        await this.#filmAsync();
    }

    async #planetAsync()
    {
        let nextUrl = `${this.#baseUrl}/planets`;

        while (nextUrl)
        {
            const response = await this.#requester.send({
                method: 'GET',
                url: nextUrl,
                config: {
                    headers: {
                        Accept: '*/*'
                    }
                }
            });

            if (response && response.results)
            {
                const planetsPayloads: PlanetRepPayload[] = [];

                for (let i = 0; i < response.results.length; i++)
                {
                    const planetData = response.results[i];
                    const planetPayload: PlanetRepPayload = {
                        name: planetData.name,
                        rotationPeriod: planetData.rotation_period,
                        orbitalPeriod: planetData.orbital_period,
                        diameter: planetData.diameter,
                        climate: planetData.climate,
                        gravity: planetData.gravity,
                        terrain: planetData.terrain,
                        surfaceWater: planetData.surface_water,
                        population: planetData.population,
                        url: planetData.url
                    };
                    planetsPayloads.push(planetPayload as IPlanetDomain);
                }

                await this.#planetRepository.saveMany(planetsPayloads as any[]);
            }
            else
            {
                await logger.error('Invalid response format:', response);
                break;
            }

            nextUrl = response.next ?? null;
        }

        await logger.info('Planet sync succesfully');
    }

    async #peopleAsync()
    {
        let nextUrl = `${this.#baseUrl}/people`;
        const planetCache = {};

        while (nextUrl)
        {
            const response = await this.#requester.send({
                method: 'GET',
                url: nextUrl,
                config: {
                    headers: {
                        Accept: '*/*'
                    }
                }
            });

            if (response && response.results)
            {
                const peoplePayloads = [];

                for (const personData of response.results)
                {
                    const homeWorldUrl = personData.homeworld;

                    // Intenta obtener el planeta del caché
                    let homeWorld = planetCache[homeWorldUrl];

                    // Si el planeta no está en el caché, búscalo en la base de datos y guárdalo en el caché
                    if (!homeWorld)
                    {
                        homeWorld = await this.#planetRepository.getOneBy({ url: homeWorldUrl }, {});

                        if (!homeWorld)
                        {
                            console.error(`Planet not found for URL: ${homeWorldUrl}`);
                            continue;
                        }

                        planetCache[homeWorldUrl] = homeWorld;
                    }

                    const personPayload = {
                        name: personData.name,
                        height: personData.height,
                        mass: personData.mass,
                        hairColor: personData.hair_color,
                        skinColor: personData.skin_color,
                        eyeColor: personData.eye_color,
                        birthYear: personData.birth_year,
                        gender: personData.gender,
                        homeWorld: homeWorld._id,
                        url: personData.url
                    };

                    peoplePayloads.push(personPayload);
                }

                if (peoplePayloads.length > 0)
                {
                    await this.#peopleRepository.saveMany(peoplePayloads);
                }
            }
            else
            {
                await logger.error('Invalid response format:', response);
                break;
            }

            nextUrl = response.next ?? null;
        }

        await logger.info('People sync successfully');
    }

    async #starshipAsync()
    {
        let nextUrl = `${this.#baseUrl}/starships`;

        while (nextUrl)
        {
            const response = await this.#requester.send({
                method: 'GET',
                url: nextUrl,
                config: {
                    headers: {
                        Accept: '*/*'
                    }
                }
            });

            if (response && response.results)
            {
                const starshipPayloads: StarshipRepPayload[] = [];

                for (let i = 0; i < response.results.length; i++)
                {
                    const starshipData = response.results[i];
                    const pilotUrls = starshipData.pilots;

                    const pilotIds = await Promise.all(pilotUrls.map(async(url) =>
                    {
                        const pilot = await this.#peopleRepository.getOneBy({ url }, {});

                        if (!pilot)
                        {
                            await logger.error(`Pilot not found for URL: ${url}`);
                            return null;
                        }

                        return pilot.getId();
                    }));

                    const validPilotIds = pilotIds.filter(id => id !== null);

                    const starshipPayload: StarshipRepPayload = {
                        name: starshipData.name,
                        model: starshipData.model,
                        manufacturer: starshipData.manufacturer,
                        costInCredits: starshipData.cost_in_credits,
                        length: starshipData.length,
                        maxAtmospheringSpeed: starshipData.max_atmosphering_speed,
                        crew: starshipData.crew,
                        passengers: starshipData.passengers,
                        cargoCapacity: starshipData.cargo_capacity,
                        consumables: starshipData.consumables,
                        hyperdriveRating: starshipData.hyperdrive_rating,
                        mglt: starshipData.MGLT,
                        starshipClass: starshipData.starship_class,
                        pilots: validPilotIds,
                        url: starshipData.url
                    };
                    starshipPayloads.push(starshipPayload);
                }

                await this.#starshipRepository.saveMany(starshipPayloads as any[]);
            }
            else
            {
                await logger.error('Invalid response format:', response);
                break;
            }

            nextUrl = response.next ?? null;
        }

        await logger.info('Starship sync successfully');
    }

    async #filmAsync()
    {
        let nextUrl = `${this.#baseUrl}/films`;

        while (nextUrl)
        {
            const response = await this.#requester.send({
                method: 'GET',
                url: nextUrl,
                config: {
                    headers: {
                        Accept: '*/*'
                    }
                }
            });

            if (response && response.results)
            {
                const filmPayloads = [];

                for (const filmData of response.results)
                {
                    const characterIds = await Promise.all(filmData.characters.map(async (url) =>
                    {
                        const character = await this.#peopleRepository.getOneBy({ url }, {});

                        if (!character)
                        {
                            await logger.error(`Character not found for URL: ${url}`);
                            return null;
                        }

                        return character.getId();
                    })).then(ids => ids.filter(id => id !== null));

                    const planetIds = await Promise.all(filmData.planets.map(async (url) =>
                    {
                        const planet = await this.#planetRepository.getOneBy({ url }, {});

                        if (!planet)
                        {
                            await logger.error(`Planet not found for URL: ${url}`);
                            return null;
                        }

                        return planet.getId();
                    })).then(ids => ids.filter(id => id !== null));

                    const starshipIds = await Promise.all(filmData.starships.map(async (url) =>
                    {
                        const starship = await this.#starshipRepository.getOneBy({ url }, {});

                        if (!starship)
                        {
                            await logger.error(`Starship not found for URL: ${url}`);
                            return null;
                        }

                        return starship.getId();
                    })).then(ids => ids.filter(id => id !== null));

                    const filmPayload = {
                        title: filmData.title,
                        episodeUd: filmData.episode_id.toString(),
                        openingCrawl: filmData.opening_crawl,
                        director: filmData.director,
                        producer: filmData.producer,
                        releaseDate: filmData.release_date,
                        characters: characterIds,
                        planets: planetIds,
                        starships: starshipIds,
                        url: filmData.url
                    };

                    filmPayloads.push(filmPayload);
                }

                if (filmPayloads.length > 0)
                {
                    await this.#filmRepository.saveMany(filmPayloads);
                }
            }
            else
            {
                await logger.error('Invalid response format:', response);
                break;
            }

            nextUrl = response.next ?? null;
        }

        await logger.info('Film sync successfully');
    }
}

export default SyncDataUseCase;
