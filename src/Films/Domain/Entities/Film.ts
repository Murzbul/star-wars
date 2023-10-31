import IFilmDomain from './IFilmDomain';
import { Base } from '@digichanges/shared-experience';
import IPeopleDomain from '../../../People/Domain/Entities/IPeopleDomain';
import IPlanetDomain from '../../../Planet/Domain/Entities/IPlanetDomain';
import IStarshipDomain from '../../../Starship/Domain/Entities/IStarshipDomain';

class Film extends Base implements IFilmDomain
{
    title: string;
    episodeUd: string;
    openingCrawl: string;
    director: string;
    producer: string;
    releaseDate: string;
    characters: IPeopleDomain[];
    planets: IPlanetDomain[];
    starships: IStarshipDomain[];
    url: string;

    constructor()
    {
        super();
    }
}

export default Film;
