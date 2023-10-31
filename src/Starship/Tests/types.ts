import { IBodyResponse } from '../../Main/Tests/IBodyResponse';
import { IFetchResponse } from '../../Main/Tests/IFetchResponse';
import IStarshipTransformer from '../Presentation/Transformers/IStarshipTransformer';

interface IStarshipBody extends IBodyResponse
{
    data: IStarshipTransformer;
}

interface IListStarshipBody extends IBodyResponse
{
    data: IStarshipTransformer[];
}

export interface IStarshipResponse extends IFetchResponse
{
    body: IStarshipBody;
}

export interface IListStarshipsResponse extends IFetchResponse
{
    body: IListStarshipBody;
}
