import { IdPayload } from '@digichanges/shared-experience';
import IFilmDomain from '../Entities/IFilmDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IFilmRepository from '../../Infrastructure/Repositories/IFilmRepository';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import IdSchemaValidation from '../../../Main/Presentation/Validations/IdSchemaValidation';
import container from '../../../register';

class GetFilmUseCase
{
    private repository: IFilmRepository;

    constructor()
    {
        this.repository = container.resolve<IFilmRepository>(REPOSITORIES.IFilmRepository);
    }

    async handle(payload: IdPayload): Promise<IFilmDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        return await this.repository.getOne(payload.id);
    }
}

export default GetFilmUseCase;
