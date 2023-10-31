import IStarshipDomain from './IStarshipDomain';
import { Base } from '@digichanges/shared-experience';
import IPeopleDomain from '../../../People/Domain/Entities/IPeopleDomain';

class Starship extends Base implements IStarshipDomain
{
    name: string;
    model: string;
    manufacturer: string;
    costInCredits: string;
    length: string;
    maxAtmospheringSpeed: string;
    crew: string;
    passengers: string;
    cargoCapacity: string;
    consumables: string;
    hyperdriveRating: string;
    mglt: string;
    starshipClass: string;
    pilots: IPeopleDomain[];
    url: string;

    constructor()
    {
        super();
    }
}

export default Starship;
