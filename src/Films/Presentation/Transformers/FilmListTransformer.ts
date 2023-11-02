import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Transformer } from '@digichanges/shared-experience';
import IFilmDomain from '../../Domain/Entities/IFilmDomain';
import IFilmTransformer from './IFilmTransformer';

class FilmListTransformer extends Transformer
{
    constructor()
    {
        super();
    }

    public async transform(film: IFilmDomain): Promise<Omit<IFilmTransformer, 'characters' | 'planets' | 'starships'>>
    {
        dayjs.extend(utc);

        return {
            id: film.getId(),
            title: film.title,
            episodeUd: film.episodeUd,
            openingCrawl: film.openingCrawl,
            director: film.director,
            producer: film.producer,
            releaseDate: film.releaseDate,
            url: film.url,
            createdAt: dayjs(film.createdAt).utc().unix(),
            updatedAt: dayjs(film.updatedAt).utc().unix()
        };
    }
}

export default FilmListTransformer;
