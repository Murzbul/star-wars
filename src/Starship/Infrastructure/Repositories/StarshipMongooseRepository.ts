import * as mongoose from 'mongoose';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';

import IStarshipRepository from './IStarshipRepository';
import StarshipFilter from '../../Presentation/Criterias/StarshipFilter';
import MongoosePaginator from '../../../Main/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Main/Infrastructure/Repositories/BaseMongooseRepository';
import IStarshipDomain from '../../Domain/Entities/IStarshipDomain';
import Starship from '../../Domain/Entities/Starship';
import { StarshipMongooseDocument } from '../Schemas/StarshipMongoose';

class StarshipMongooseRepository extends BaseMongooseRepository<IStarshipDomain, StarshipMongooseDocument> implements IStarshipRepository
{
    constructor()
    {
        super(Starship.name, ['pilots']);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: mongoose.Query<StarshipMongooseDocument[], StarshipMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(StarshipFilter.NAME))
        {
            const name: string = filter.get(StarshipFilter.NAME) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(StarshipFilter.NAME).regex(rSearch);
        }

        void queryBuilder.populate(this.populate);

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default StarshipMongooseRepository;
