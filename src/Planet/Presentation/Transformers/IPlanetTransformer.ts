import PlanetRepPayload from '../../Domain/Payloads/PlanetRepPayload';

interface IPlanetTransformer extends PlanetRepPayload
{
    id: string;
    createdAt: number;
    updatedAt: number;
}

export default IPlanetTransformer;
