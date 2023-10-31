import { faker } from '@faker-js/faker';
import BaseSeed from '../../../Shared/Infrastructure/Seeds/BaseSeed';
import ISeed from '../../../Shared/Infrastructure/Seeds/ISeed';
import container from '../../../register';
import IPlanetRepository from '../Repositories/IPlanetRepository';
import { REPOSITORIES } from '../../../Config/Injects';
import IPlanetDomain from '../../Domain/Entities/IPlanetDomain';

class PlanetSeed extends BaseSeed implements ISeed
{
    #repository: IPlanetRepository;

    constructor()
    {
        super();
        this.#repository = container.resolve<IPlanetRepository>(REPOSITORIES.IPlanetRepository);
    }

    public async init()
    {
        const indexes = Array.from({ length: 10 }, (v, i) => i + 1);

        for await (const index of indexes)
        {
            const payload = {
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
            };

            await this.#repository.save(payload as IPlanetDomain);
        }
    }
}

export default PlanetSeed;
