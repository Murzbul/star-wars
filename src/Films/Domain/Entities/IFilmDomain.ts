import { IBaseDomain } from '@digichanges/shared-experience';
import FilmRepPayload from '../Payloads/FilmRepPayload';
import IPeopleDomain from '../../../People/Domain/Entities/IPeopleDomain';
import IPlanetDomain from '../../../Planet/Domain/Entities/IPlanetDomain';
import IStarshipDomain from '../../../Starship/Domain/Entities/IStarshipDomain';

interface IFilmDomain extends IBaseDomain, Omit<FilmRepPayload, 'characters' | 'planets' | 'starships'>
{
    characters: IPeopleDomain[];
    planets: IPlanetDomain[];
    starships: IStarshipDomain[];
}

export default IFilmDomain;
