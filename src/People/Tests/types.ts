import { IBodyResponse } from '../../Main/Tests/IBodyResponse';
import { IFetchResponse } from '../../Main/Tests/IFetchResponse';
import IPeopleTransformer from '../Presentation/Transformers/IPeopleTransformer';

interface IPeopleBody extends IBodyResponse
{
    data: IPeopleTransformer;
}

interface IListPeopleBody extends IBodyResponse
{
    data: IPeopleTransformer[];
}

export interface IPeopleResponse extends IFetchResponse
{
    body: IPeopleBody;
}

export interface IListPeoplesResponse extends IFetchResponse
{
    body: IListPeopleBody;
}
