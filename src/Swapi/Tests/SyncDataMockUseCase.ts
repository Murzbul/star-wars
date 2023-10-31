import container from '../../register';
import IPlanetRepository from '../../Planet/Infrastructure/Repositories/IPlanetRepository';
import IPeopleRepository from '../../People/Infrastructure/Repositories/IPeopleRepository';
import { REPOSITORIES } from '../../Config/Injects';
import { faker } from '@faker-js/faker';
import logger from '../../Shared/Helpers/Logger';
import IPlanetDomain from '../../Planet/Domain/Entities/IPlanetDomain';
import IStarshipRepository from '../../Starship/Infrastructure/Repositories/IStarshipRepository';
import IFilmRepository from "../../Films/Infrastructure/Repositories/IFilmRepository";
import IStarshipDomain from "../../Starship/Domain/Entities/IStarshipDomain";

class SyncDataMockUseCase
{
    #planetRepository: IPlanetRepository;
    #peopleRepository: IPeopleRepository;
    #starshipRepository: IStarshipRepository;
    #filmRepository: IFilmRepository;

    constructor()
    {
        this.#planetRepository = container.resolve<IPlanetRepository>(REPOSITORIES.IPlanetRepository);
        this.#peopleRepository = container.resolve<IPeopleRepository>(REPOSITORIES.IPeopleRepository);
        this.#starshipRepository = container.resolve<IStarshipRepository>(REPOSITORIES.IStarshipRepository);
        this.#filmRepository = container.resolve<IFilmRepository>(REPOSITORIES.IFilmRepository);
    }

    async handle(): Promise<void>
    {
        const planets = await this.#planetAsync();
        const people = await this.#peopleAsync(planets);
        const starshipIds = await this.#starshipAsync(people);
        await this.#filmAsync(people, planets, starshipIds);
    }

    async #generatePlanet()
    {
        const planet = {
            name: faker.helpers.arrayElement([
                'Bla1', 'Bla2', 'Bla3', 'Bla4', 'Bla5'
            ]),
            rotationPeriod: faker.number.int({ min: 10, max: 40 }).toString(),
            orbitalPeriod: faker.number.int({ min: 300, max: 5000 }).toString(),
            diameter: faker.number.int({ min: 5000, max: 20000 }).toString(),
            climate: faker.person.firstName(),
            gravity: `${faker.number.float({ min: 0.5, max: 2 }).toFixed(1)  } standard`,
            terrain: faker.person.firstName(),
            surfaceWater: faker.number.int({ min: 0, max: 100 }).toString(),
            population: faker.number.int({ min: 1000, max: 1000000000000 }).toString(),
            url: faker.internet.url()
        };

        await this.#planetRepository.save(planet as IPlanetDomain);

        return planet;
    }

    async #generatePerson(planet)
    {
        return {
            name: faker.helpers.arrayElement([
                'Foo1', 'Foo2', 'Foo3', 'Foo4', 'Foo5'
            ]),
            height: faker.number.int({ min: 90, max: 200 }).toString(),
            mass: faker.number.int({ min: 30, max: 150 }).toString(),
            hairColor: faker.color.human(),
            skinColor: faker.color.human(),
            eyeColor: faker.color.human(),
            birthYear: `${faker.date.past().getFullYear() - 1900  }BBY`,
            gender: faker.person.gender(),
            homeWorld: planet._id,
            url: faker.internet.url()
        };
    }

    async #generateStarship(pilotIds: string[])
    {
        return {
            name: faker.helpers.arrayElement([
                'Starship1', 'Starship2', 'Starship3', 'Starship4', 'Starship5'
            ]),
            model: faker.word.adverb(),
            manufacturer: faker.company.name(),
            costInCredits: faker.finance.amount(),
            length: faker.number.int().toString(),
            maxAtmospheringSpeed: faker.number.int().toString(),
            crew: faker.number.int().toString(),
            passengers: faker.number.int().toString(),
            cargoCapacity: faker.number.int().toString(),
            consumables: faker.date.future().toDateString(),
            hyperdriveRating: faker.number.float({ max: 10 }).toFixed(1),
            mglt: faker.number.int().toString(),
            starshipClass: faker.word.sample(),
            pilots: pilotIds,
            url: faker.internet.url()
        };
    }

    async #generateFilm(people, planets, starshipIds)
    {
        const characterIds = people.map(person => person._id);
        const planetIds = planets.map(planet => planet._id);
        const randomStarships = faker.helpers.arrayElements(starshipIds, faker.number.int({ min: 1, max: starshipIds.length }));

        return {
            title: faker.lorem.words(),
            episodeUd: faker.number.int({ min: 1, max: 9 }).toString(),
            openingCrawl: faker.lorem.paragraphs(),
            director: faker.person.firstName(),
            producer: faker.person.firstName(),
            releaseDate: faker.date.past().toISOString().split('T')[0],
            characters: characterIds,
            planets: planetIds,
            starships: randomStarships,
            url: faker.internet.url()
        };
    }

    async #planetAsync()
    {
        const planets = [];

        for (let i = 0; i < 5; i++)
        {
            const planet = await this.#generatePlanet();
            planets.push(planet);
        }

        await logger.debug('Generated planets');

        return planets;
    }

    async #peopleAsync(planets)
    {
        const people = [];

        for (const planet of planets)
        {
            for (let i = 0; i < 5; i++)
            {
                const person = await this.#generatePerson(planet);
                people.push(person);
            }

            await this.#peopleRepository.saveMany(people);
        }

        await logger.debug('Generated people');

        return people;
    }

    async #starshipAsync(people)
    {
        const starships = [];
        const starshipIds = [];

        for (let i = 0; i < 5; i++)
        {
            const pilotIds = people.map(person => person._id);
            const randomPilots = faker.helpers.arrayElements(pilotIds, faker.number.int({ min: 1, max: pilotIds.length }));

            const starship = await this.#generateStarship(randomPilots as string[]);
            const savedStarship = await this.#starshipRepository.save(starship as any);
            starshipIds.push(savedStarship.getId());
            starships.push(starship);
        }

        await logger.debug('Generated starships');

        return starshipIds;
    }

   async #filmAsync(people, planets, starshipIds)
   {
       const films = [];

        for (let i = 0; i < 5; i++)
        {
            const film = await this.#generateFilm(people, planets, starshipIds);
            films.push(film);
        }

        await this.#filmRepository.saveMany(films);

        await logger.debug('Generated films');
    }
}

export default SyncDataMockUseCase;
