import * as mongoose from 'mongoose';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';

import IFilmRepository from './IFilmRepository';
import FilmFilter from '../../Presentation/Criterias/FilmFilter';
import MongoosePaginator from '../../../Main/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Main/Infrastructure/Repositories/BaseMongooseRepository';
import IFilmDomain from '../../Domain/Entities/IFilmDomain';
import Film from '../../Domain/Entities/Film';
import { FilmMongooseDocument } from '../Schemas/FilmMongoose';

class FilmMongooseRepository extends BaseMongooseRepository<IFilmDomain, FilmMongooseDocument> implements IFilmRepository
{
    constructor()
    {
        super(Film.name, ['characters', 'planets', 'starships']);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        let queryBuilder: mongoose.Query<FilmMongooseDocument[], FilmMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(FilmFilter.SEARCH))
        {
            queryBuilder = this.repository
                .find(
                    {
                        $text: {
                            $search: filter.get(FilmFilter.SEARCH) as string
                        }
                    })
                .sort({
                    score: {
                        $meta: 'textScore'
                    }
                });
        }

        void queryBuilder.populate(this.populate);

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default FilmMongooseRepository;
