import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import { REPOSITORIES } from '../../../Config/Injects';
import IStarshipRepository from '../../Infrastructure/Repositories/IStarshipRepository';
import container from '../../../register';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import CriteriaSchemaValidation from '../../../Main/Presentation/Validations/CriteriaSchemaValidation';

class ListStarshipsUseCase
{
    private repository: IStarshipRepository;

    constructor()
    {
        this.repository = container.resolve<IStarshipRepository>(REPOSITORIES.IStarshipRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        return await this.repository.list(payload);
    }
}

export default ListStarshipsUseCase;
