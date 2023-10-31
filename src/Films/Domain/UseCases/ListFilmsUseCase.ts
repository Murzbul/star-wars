import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import { REPOSITORIES } from '../../../Config/Injects';
import IFilmRepository from '../../Infrastructure/Repositories/IFilmRepository';
import container from '../../../register';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import CriteriaSchemaValidation from '../../../Main/Presentation/Validations/CriteriaSchemaValidation';

class ListFilmsUseCase
{
    private repository: IFilmRepository;

    constructor()
    {
        this.repository = container.resolve<IFilmRepository>(REPOSITORIES.IFilmRepository);
    }

    async handle(payload: ICriteria): Promise<IPaginator>
    {
        await ValidatorSchema.handle(CriteriaSchemaValidation, payload);

        return await this.repository.list(payload);
    }
}

export default ListFilmsUseCase;
