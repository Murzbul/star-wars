import { IdPayload } from '@digichanges/shared-experience';
import IPeopleDomain from '../Entities/IPeopleDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IPeopleRepository from '../../Infrastructure/Repositories/IPeopleRepository';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import IdSchemaValidation from '../../../Main/Presentation/Validations/IdSchemaValidation';
import container from '../../../register';

class GetPeopleUseCase
{
    private repository: IPeopleRepository;

    constructor()
    {
        this.repository = container.resolve<IPeopleRepository>(REPOSITORIES.IPeopleRepository);
    }

    async handle(payload: IdPayload): Promise<IPeopleDomain>
    {
        await ValidatorSchema.handle(IdSchemaValidation, payload);

        return await this.repository.getOne(payload.id);
    }
}

export default GetPeopleUseCase;
