import { IBodyResponse } from '../../Main/Tests/IBodyResponse';
import { IFetchResponse } from '../../Main/Tests/IFetchResponse';
import IPlanetTransformer from '../Presentation/Transformers/IPlanetTransformer';

interface IPlanetBody extends IBodyResponse
{
    data: IPlanetTransformer;
}

interface IListPlanetBody extends IBodyResponse
{
    data: IPlanetTransformer[];
}

export interface IPlanetResponse extends IFetchResponse
{
    body: IPlanetBody;
}

export interface IListPlanetsResponse extends IFetchResponse
{
    body: IListPlanetBody;
}
