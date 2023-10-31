import * as mongoose from 'mongoose';
import { randomUUID } from 'crypto';
import Film from '../../Domain/Entities/Film';
import IFilmDomain from '../../Domain/Entities/IFilmDomain';

export type FilmMongooseDocument = Document & IFilmDomain;

const FilmSchema: any = new mongoose.Schema<Film>({
    _id: { type: String, default: randomUUID },
    title: { type: String, required: true },
    episodeUd: { type: String, required: true },
    openingCrawl: { type: String, required: true },
    director: { type: String, required: true },
    producer: { type: String, required: true },
    releaseDate: { type: String, required: true },
    characters: [{ type: mongoose.Schema.Types.String, ref: 'People' }],
    planets: [{ type: mongoose.Schema.Types.String, ref: 'Planet' }],
    starships: [{ type: mongoose.Schema.Types.String, ref: 'Starship' }],
    url: { type: String, required: true }
}, { timestamps: true });

FilmSchema.index({
    title: 'text',
    episodeUd: 'text',
    openingCrawl: 'text',
    producer: 'text'
}, {
    weights: {
        title: 1,
        episodeUd: 2,
        openingCrawl: 3,
        producer: 4
    },
    name: 'film_search_index_1'
});
FilmSchema.index({ url: 1 });
FilmSchema.loadClass(Film);

export default FilmSchema;
