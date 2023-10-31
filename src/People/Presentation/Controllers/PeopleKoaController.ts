import {
    ResponseMessageEnum,
    DefaultMessageTransformer,
    RequestCriteria,
    IPaginator, StatusCode
} from '@digichanges/shared-experience';
import KoaResponder from '../../../Main/Presentation/Utils/KoaResponder';
import PeopleTransformer from '../Transformers/PeopleTransformer';
import PeopleRepPayload from '../../Domain/Payloads/PeopleRepPayload';
import { IdPayload } from '@digichanges/shared-experience';
import SavePeopleUseCase from '../../Domain/UseCases/SavePeopleUseCase';
import { ICriteria } from '@digichanges/shared-experience';
import PeopleFilter from '../Criterias/PeopleFilter';
import PeopleSort from '../Criterias/PeopleSort';
import Pagination from '../../../Shared/Utils/Pagination';
import ListPeoplesUseCase from '../../Domain/UseCases/ListPeoplesUseCase';
import GetPeopleUseCase from '../../Domain/UseCases/GetPeopleUseCase';
import IPeopleDomain from '../../Domain/Entities/IPeopleDomain';

const responder: KoaResponder = new KoaResponder();

class PeopleController
{
    static async save(ctx: any): Promise<void>
    {
        const payload: PeopleRepPayload = {
            ...ctx.request.body
        };

        const useCase = new SavePeopleUseCase();
        const People = await useCase.handle(payload);

        void await responder.send(People, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    static async list(ctx: any): Promise<void>
    {
        const { url, query } = ctx.request;

        const requestCriteria: ICriteria = new RequestCriteria({
            filter: new PeopleFilter(query),
            sort: new PeopleSort(query),
            pagination: new Pagination(query, url)
        });

        const useCase = new ListPeoplesUseCase();
        const paginator: IPaginator = await useCase.handle(requestCriteria);

        await responder.paginate<IPeopleDomain>(paginator, ctx, StatusCode.HTTP_OK, new PeopleTransformer());
    }

    static async show(ctx: any): Promise<void>
    {
        const useCase = new GetPeopleUseCase();
        const People = await useCase.handle(ctx.params as IdPayload);

        void await responder.send(People, ctx, StatusCode.HTTP_OK, new PeopleTransformer());
    }
}

export default PeopleController;
