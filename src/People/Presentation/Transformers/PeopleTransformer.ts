import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Transformer } from '@digichanges/shared-experience';
import IPeopleDomain from '../../Domain/Entities/IPeopleDomain';
import IPeopleTransformer from './IPeopleTransformer';

class PeopleTransformer extends Transformer
{
    constructor()
    {
        super();
    }

    public async transform(people: IPeopleDomain): Promise<IPeopleTransformer>
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
            homeWorld: people.homeWorld,
            url: people.url,
            createdAt: dayjs(people.createdAt).utc().unix(),
            updatedAt: dayjs(people.updatedAt).utc().unix()
        };
    }
}

export default PeopleTransformer;
