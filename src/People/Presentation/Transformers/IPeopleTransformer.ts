import PeopleRepPayload from '../../Domain/Payloads/PeopleRepPayload';
import IPlanetDomain from '../../../Planet/Domain/Entities/IPlanetDomain';

interface IPeopleTransformer extends Omit<PeopleRepPayload, 'homeWorld'>
{
    id: string;
    homeWorld: IPlanetDomain;
    createdAt: number;
    updatedAt: number;
}

export default IPeopleTransformer;
