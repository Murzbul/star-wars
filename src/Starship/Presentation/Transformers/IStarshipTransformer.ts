import StarshipRepPayload from '../../Domain/Payloads/StarshipRepPayload';
import IPeopleDomain from '../../../People/Domain/Entities/IPeopleDomain';

interface IStarshipTransformer extends Omit<StarshipRepPayload, 'pilots'>
{
    id: string;
    pilots: IPeopleDomain[];
    createdAt: number;
    updatedAt: number;
}

export default IStarshipTransformer;
