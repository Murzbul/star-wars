import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Transformer } from '@digichanges/shared-experience';
import PlanetTransformer from '../../../Planet/Presentation/Transformers/PlanetTransformer';
import IPeopleMiniTransformer from './IPeopleMiniTransformer';
import IPeopleDomain from '../../../People/Domain/Entities/IPeopleDomain';

class PeopleMiniTransformer extends Transformer
{
    #planetTransformer: PlanetTransformer;

    constructor()
    {
        super();
        this.#planetTransformer = new PlanetTransformer();
    }

    public async transform(people: IPeopleDomain): Promise<IPeopleMiniTransformer>
    {
        dayjs.extend(utc);

        return {
            id: people.getId(),
            name: people.name,
            height: people.height,
            mass: people.mass,
            hairColor: people.hairColor,
            skinColor: people.skinColor,
            eyeColor: people.eyeColor,
            birthYear: people.birthYear,
            gender: people.gender,
            url: people.url,
            createdAt: dayjs(people.createdAt).utc().unix(),
            updatedAt: dayjs(people.updatedAt).utc().unix()
        };
    }
}

export default PeopleMiniTransformer;
