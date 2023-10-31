import { IBodyResponse } from '../../Main/Tests/IBodyResponse';
import { IFetchResponse } from '../../Main/Tests/IFetchResponse';
import IFilmTransformer from '../Presentation/Transformers/IFilmTransformer';

interface IFilmBody extends IBodyResponse
{
    data: IFilmTransformer;
}

interface IListFilmBody extends IBodyResponse
{
    data: IFilmTransformer[];
}

export interface IFilmResponse extends IFetchResponse
{
    body: IFilmBody;
}

export interface IListFilmsResponse extends IFetchResponse
{
    body: IListFilmBody;
}
