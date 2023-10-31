import PeopleRepPayload from '../../../People/Domain/Payloads/PeopleRepPayload';

interface IPeopleMiniTransformer extends Omit<PeopleRepPayload, 'homeWorld'>
{
    id: string;
    createdAt: number;
    updatedAt: number;
}

export default IPeopleMiniTransformer;
