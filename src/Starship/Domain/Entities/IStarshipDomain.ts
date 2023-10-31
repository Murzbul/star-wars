import { IBaseDomain } from '@digichanges/shared-experience';
import StarshipRepPayload from '../Payloads/StarshipRepPayload';
import IPeopleDomain from '../../../People/Domain/Entities/IPeopleDomain';

interface IStarshipDomain extends IBaseDomain, Omit<StarshipRepPayload, 'pilots'>
{
    pilots: IPeopleDomain[];
}

export default IStarshipDomain;
