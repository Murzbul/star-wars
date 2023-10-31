import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Transformer } from '@digichanges/shared-experience';
import IStarshipDomain from '../../../Starship/Domain/Entities/IStarshipDomain';
import IStarshipMiniTransformer from './IStarshipMiniTransformer';

class StarshipMiniTransformer extends Transformer
{
    constructor()
    {
        super();
    }

    public async transform(starship: IStarshipDomain): Promise<IStarshipMiniTransformer>
    {
        dayjs.extend(utc);

        return {
            id: starship.getId(),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            cargoCapacity: starship.cargoCapacity,
            starshipClass: starship.starshipClass,
            url: starship.url,
            createdAt: dayjs(starship.createdAt).utc().unix(),
            updatedAt: dayjs(starship.updatedAt).utc().unix()
        };
    }
}

export default StarshipMiniTransformer;
