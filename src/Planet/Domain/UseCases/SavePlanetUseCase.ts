import PlanetRepPayload from '../Payloads/PlanetRepPayload';
import IPlanetDomain from '../Entities/IPlanetDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IPlanetRepository from '../../Infrastructure/Repositories/IPlanetRepository';
import container from '../../../register';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import PlanetSchemaSaveValidation from '../../Presentation/Validations/PlanetSchemaSaveValidation';
import Planet from "../Entities/Planet";

class SavePlanetUseCase
{
    private repository: IPlanetRepository;

    constructor()
    {
        this.repository = container.resolve<IPlanetRepository>(REPOSITORIES.IPlanetRepository);
    }

    async handle(payload: PlanetRepPayload): Promise<IPlanetDomain>
    {
        await ValidatorSchema.handle(PlanetSchemaSaveValidation, payload);

        const planet: IPlanetDomain = new Planet();
        planet.name = payload.name;
        planet.rotationPeriod = payload.rotationPeriod;
        planet.orbitalPeriod = payload.orbitalPeriod;
        planet.diameter = payload.diameter;
        planet.climate = payload.climate;
        planet.gravity = payload.gravity;
        planet.terrain = payload.terrain;
        planet.surfaceWater = payload.surfaceWater;
        planet.population = payload.population;
        planet.url = payload.url;

        return await this.repository.save(planet);
    }
}

export default SavePlanetUseCase;
