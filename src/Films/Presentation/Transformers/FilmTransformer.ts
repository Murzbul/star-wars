import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Transformer } from '@digichanges/shared-experience';
import IFilmDomain from '../../Domain/Entities/IFilmDomain';
import IFilmTransformer from './IFilmTransformer';
import PeopleMiniTransformer from './PeopleMiniTransformer';
import PlanetTransformer from '../../../Planet/Presentation/Transformers/PlanetTransformer';
import StarshipMiniTransformer from './StarshipMiniTransformer';

class FilmTransformer extends Transformer
{
    #peopleTransformer: PeopleMiniTransformer;
    #planetTransformer: PlanetTransformer;
    #starshipTransformer: StarshipMiniTransformer;

    constructor()
    {
        super();
        this.#peopleTransformer = new PeopleMiniTransformer();
        this.#planetTransformer = new PlanetTransformer();
        this.#starshipTransformer = new StarshipMiniTransformer();
    }

    public async transform(film: IFilmDomain): Promise<IFilmTransformer>
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
            characters: await this.#peopleTransformer.handle(film.characters),
            planets: await this.#planetTransformer.handle(film.planets),
            starships: await this.#starshipTransformer.handle(film.starships),
            url: film.url,
            createdAt: dayjs(film.createdAt).utc().unix(),
            updatedAt: dayjs(film.updatedAt).utc().unix()
        };
    }
}

export default FilmTransformer;
