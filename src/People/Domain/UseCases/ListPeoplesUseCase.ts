import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import { REPOSITORIES } from '../../../Config/Injects';
import IPeopleRepository from '../../Infrastructure/Repositories/IPeopleRepository';
import container from '../../../register';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import CriteriaSchemaValidation from '../../../Main/Presentation/Validations/CriteriaSchemaValidation';

class ListPeoplesUseCase
{
    private repository: IPeopleRepository;

    constructor()
    {
        this.repository = container.resolve<IPeopleRepository>(REPOSITORIES.IPeopleRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        return await this.repository.list(payload);
    }
}

export default ListPeoplesUseCase;
