import {
    RequestCriteria,
    IPaginator, StatusCode
} from '@digichanges/shared-experience';
import KoaResponder from '../../../Main/Presentation/Utils/KoaResponder';
import FilmTransformer from '../Transformers/FilmTransformer';
import { IdPayload } from '@digichanges/shared-experience';
import { ICriteria } from '@digichanges/shared-experience';
import FilmFilter from '../Criterias/FilmFilter';
import FilmSort from '../Criterias/FilmSort';
import Pagination from '../../../Shared/Utils/Pagination';
import ListFilmsUseCase from '../../Domain/UseCases/ListFilmsUseCase';
import GetFilmUseCase from '../../Domain/UseCases/GetFilmUseCase';
import IFilmDomain from '../../Domain/Entities/IFilmDomain';

const responder: KoaResponder = new KoaResponder();

class FilmController
{
    static async list(ctx: any): Promise<void>
    {
        const { url, query } = ctx.request;

        const requestCriteria: ICriteria = new RequestCriteria({
            filter: new FilmFilter(query),
            sort: new FilmSort(query),
            pagination: new Pagination(query, url)
        });

        const useCase = new ListFilmsUseCase();
        const paginator: IPaginator = await useCase.handle(requestCriteria);

        await responder.paginate<IFilmDomain>(paginator, ctx, StatusCode.HTTP_OK, new FilmTransformer());
    }

    static async show(ctx: any): Promise<void>
    {
        const useCase = new GetFilmUseCase();
        const Film = await useCase.handle(ctx.params as IdPayload);

        void await responder.send(Film, ctx, StatusCode.HTTP_OK, new FilmTransformer());
    }
}

export default FilmController;
