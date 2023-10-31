import { IdPayload } from '@digichanges/shared-experience';
import IStarshipDomain from '../Entities/IStarshipDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IStarshipRepository from '../../Infrastructure/Repositories/IStarshipRepository';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import IdSchemaValidation from '../../../Main/Presentation/Validations/IdSchemaValidation';
import container from '../../../register';

class GetStarshipUseCase
{
    private repository: IStarshipRepository;

    constructor()
    {
        this.repository = container.resolve<IStarshipRepository>(REPOSITORIES.IStarshipRepository);
    }

    async handle(payload: IdPayload): Promise<IStarshipDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        return await this.repository.getOne(payload.id);
    }
}

export default GetStarshipUseCase;
