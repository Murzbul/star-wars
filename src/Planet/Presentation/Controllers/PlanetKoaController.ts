import {
    ResponseMessageEnum,
    DefaultMessageTransformer,
    RequestCriteria,
    IPaginator, StatusCode
} from '@digichanges/shared-experience';
import KoaResponder from '../../../Main/Presentation/Utils/KoaResponder';
import PlanetTransformer from '../Transformers/PlanetTransformer';
import PlanetRepPayload from '../../Domain/Payloads/PlanetRepPayload';
import { IdPayload } from '@digichanges/shared-experience';
import SavePlanetUseCase from '../../Domain/UseCases/SavePlanetUseCase';
import { ICriteria } from '@digichanges/shared-experience';
import PlanetFilter from '../Criterias/PlanetFilter';
import PlanetSort from '../Criterias/PlanetSort';
import Pagination from '../../../Shared/Utils/Pagination';
import ListPlanetsUseCase from '../../Domain/UseCases/ListPlanetsUseCase';
import GetPlanetUseCase from '../../Domain/UseCases/GetPlanetUseCase';
import IPlanetDomain from '../../Domain/Entities/IPlanetDomain';

const responder: KoaResponder = new KoaResponder();

class PlanetController
{
    static async save(ctx: any): Promise<void>
    {
        const payload: PlanetRepPayload = {
            ...ctx.request.body
        };

        const useCase = new SavePlanetUseCase();
        const Planet = await useCase.handle(payload);

        void await responder.send(Planet, ctx, StatusCode.HTTP_CREATED, new DefaultMessageTransformer(ResponseMessageEnum.CREATED));
    }

    static async list(ctx: any): Promise<void>
    {
        const { url, query } = ctx.request;

        const requestCriteria: ICriteria = new RequestCriteria({
            filter: new PlanetFilter(query),
            sort: new PlanetSort(query),
            pagination: new Pagination(query, url)
        });

        const useCase = new ListPlanetsUseCase();
        const paginator: IPaginator = await useCase.handle(requestCriteria);

        await responder.paginate<IPlanetDomain>(paginator, ctx, StatusCode.HTTP_OK, new PlanetTransformer());
    }

    static async show(ctx: any): Promise<void>
    {
        const useCase = new GetPlanetUseCase();
        const Planet = await useCase.handle(ctx.params as IdPayload);

        void await responder.send(Planet, ctx, StatusCode.HTTP_OK, new PlanetTransformer());
    }
}

export default PlanetController;
