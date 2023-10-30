import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import { REPOSITORIES } from '../../../Config/Injects';
import IPlanetRepository from '../../Infrastructure/Repositories/IPlanetRepository';
import container from '../../../register';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import CriteriaSchemaValidation from '../../../Main/Presentation/Validations/CriteriaSchemaValidation';

class ListPlanetsUseCase
{
    private repository: IPlanetRepository;

    constructor()
    {
        this.repository = container.resolve<IPlanetRepository>(REPOSITORIES.IPlanetRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        return await this.repository.list(payload);
    }
}

export default ListPlanetsUseCase;
