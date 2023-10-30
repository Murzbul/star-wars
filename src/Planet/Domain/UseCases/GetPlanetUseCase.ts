import { IdPayload } from '@digichanges/shared-experience';
import IPlanetDomain from '../Entities/IPlanetDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IPlanetRepository from '../../Infrastructure/Repositories/IPlanetRepository';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import IdSchemaValidation from '../../../Main/Presentation/Validations/IdSchemaValidation';
import container from '../../../register';

class GetPlanetUseCase
{
    private repository: IPlanetRepository;

    constructor()
    {
        this.repository = container.resolve<IPlanetRepository>(REPOSITORIES.IPlanetRepository);
    }

    async handle(payload: IdPayload): Promise<IPlanetDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        return await this.repository.getOne(payload.id);
    }
}

export default GetPlanetUseCase;
