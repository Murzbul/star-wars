import {
    RequestCriteria,
    IPaginator, StatusCode
} from '@digichanges/shared-experience';
import KoaResponder from '../../../Main/Presentation/Utils/KoaResponder';
import StarshipTransformer from '../Transformers/StarshipTransformer';
import { IdPayload } from '@digichanges/shared-experience';
import { ICriteria } from '@digichanges/shared-experience';
import StarshipFilter from '../Criterias/StarshipFilter';
import StarshipSort from '../Criterias/StarshipSort';
import Pagination from '../../../Shared/Utils/Pagination';
import ListStarshipsUseCase from '../../Domain/UseCases/ListStarshipsUseCase';
import GetStarshipUseCase from '../../Domain/UseCases/GetStarshipUseCase';
import IStarshipDomain from '../../Domain/Entities/IStarshipDomain';

const responder: KoaResponder = new KoaResponder();

class StarshipController
{
    static async list(ctx: any): Promise<void>
    {
        const { url, query } = ctx.request;

        const requestCriteria: ICriteria = new RequestCriteria({
            filter: new StarshipFilter(query),
            sort: new StarshipSort(query),
            pagination: new Pagination(query, url)
        });

        const useCase = new ListStarshipsUseCase();
        const paginator: IPaginator = await useCase.handle(requestCriteria);

        await responder.paginate<IStarshipDomain>(paginator, ctx, StatusCode.HTTP_OK, new StarshipTransformer());
    }

    static async show(ctx: any): Promise<void>
    {
        const useCase = new GetStarshipUseCase();
        const Starship = await useCase.handle(ctx.params as IdPayload);

        void await responder.send(Starship, ctx, StatusCode.HTTP_OK, new StarshipTransformer());
    }
}

export default StarshipController;
