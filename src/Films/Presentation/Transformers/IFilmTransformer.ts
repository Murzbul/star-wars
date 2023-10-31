import IPeopleDomain from '../../../People/Domain/Entities/IPeopleDomain';
import IPlanetDomain from '../../../Planet/Domain/Entities/IPlanetDomain';
import IStarshipDomain from '../../../Starship/Domain/Entities/IStarshipDomain';

interface IFilmTransformer
{
    id: string;
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
    createdAt: number;
    updatedAt: number;
}

export default IFilmTransformer;
