import PeopleRepPayload from '../Payloads/PeopleRepPayload';
import IPeopleDomain from '../Entities/IPeopleDomain';
import { REPOSITORIES } from '../../../Config/Injects';
import IPeopleRepository from '../../Infrastructure/Repositories/IPeopleRepository';
import container from '../../../register';
import ValidatorSchema from '../../../Main/Presentation/Utils/ValidatorSchema';
import PeopleSchemaSaveValidation from '../../Presentation/Validations/PeopleSchemaSaveValidation';
import People from "../Entities/People";
import IPlanetRepository from "../../../Planet/Infrastructure/Repositories/IPlanetRepository";

class SavePeopleUseCase
{
    #repository: IPeopleRepository;
    #planetRepository: IPlanetRepository;

    constructor()
    {
        this.#repository = container.resolve<IPeopleRepository>(REPOSITORIES.IPeopleRepository);
        this.#planetRepository = container.resolve<IPlanetRepository>(REPOSITORIES.IPlanetRepository);
    }

    async handle(payload: PeopleRepPayload): Promise<IPeopleDomain>
    {
        await ValidatorSchema.handle(PeopleSchemaSaveValidation, payload);

        const people: IPeopleDomain = new People();
        people.name = payload.name;
        people.height = payload.height;
        people.mass = payload.mass;
        people.hairColor = payload.hairColor;
        people.skinColor = payload.skinColor;
        people.eyeColor = payload.eyeColor;
        people.birthYear = payload.birthYear;
        people.gender = payload.gender;
        people.homeWorld = await this.#planetRepository.getOne(payload.homeWorld);
        people.url = payload.url;

        return await this.#repository.save(people);
    }
}

export default SavePeopleUseCase;
