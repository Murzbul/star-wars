import { faker } from '@faker-js/faker';
import BaseSeed from '../../../Shared/Infrastructure/Seeds/BaseSeed';
import ISeed from '../../../Shared/Infrastructure/Seeds/ISeed';
import SavePlanetUseCase from "../../Domain/UseCases/SavePlanetUseCase";

class PlanetSeed extends BaseSeed implements ISeed
{
    constructor()
    {
        super();
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
            }

            const savePlanetUseCase = new SavePlanetUseCase();
            await savePlanetUseCase.handle(payload);
        }
    }
}

export default PlanetSeed;
