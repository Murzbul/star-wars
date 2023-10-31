import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Transformer } from '@digichanges/shared-experience';
import IStarshipDomain from '../../Domain/Entities/IStarshipDomain';
import IStarshipTransformer from './IStarshipTransformer';
import PeopleMiniTransformer from './PeopleMiniTransformer';

class StarshipTransformer extends Transformer
{
    #peopleTransformer: PeopleMiniTransformer;

    constructor()
    {
        super();
        this.#peopleTransformer = new PeopleMiniTransformer();
    }

    public async transform(starship: IStarshipDomain): Promise<IStarshipTransformer>
    {
        dayjs.extend(utc);

        return {
            id: starship.getId(),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            maxAtmospheringSpeed: starship.maxAtmospheringSpeed,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity,
            consumables: starship.consumables,
            hyperdriveRating: starship.hyperdriveRating,
            mglt: starship.mglt,
            starshipClass: starship.starshipClass,
            pilots: await this.#peopleTransformer.handle(starship.pilots),
            url: starship.url,
            createdAt: dayjs(starship.createdAt).utc().unix(),
            updatedAt: dayjs(starship.updatedAt).utc().unix()
        };
    }
}

export default StarshipTransformer;
