import { IBaseDomain } from '@digichanges/shared-experience';
import PeopleRepPayload from '../Payloads/PeopleRepPayload';
import IPlanetDomain from '../../../Planet/Domain/Entities/IPlanetDomain';

interface IPeopleDomain extends IBaseDomain, Omit<PeopleRepPayload, 'homeWorld'>
{
    homeWorld: IPlanetDomain;
}

export default IPeopleDomain;
