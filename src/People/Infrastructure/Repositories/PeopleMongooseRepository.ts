import * as mongoose from 'mongoose';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';

import IPeopleRepository from './IPeopleRepository';
import PeopleFilter from '../../Presentation/Criterias/PeopleFilter';
import MongoosePaginator from '../../../Main/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Main/Infrastructure/Repositories/BaseMongooseRepository';
import IPeopleDomain from '../../Domain/Entities/IPeopleDomain';
import People from '../../Domain/Entities/People';
import { PeopleMongooseDocument } from '../Schemas/PeopleMongoose';

class PeopleMongooseRepository extends BaseMongooseRepository<IPeopleDomain, PeopleMongooseDocument> implements IPeopleRepository
{
    constructor()
    {
        super(People.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: mongoose.Query<PeopleMongooseDocument[], PeopleMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();

        if (filter.has(PeopleFilter.NAME))
        {
            const name: string = filter.get(PeopleFilter.NAME) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(PeopleFilter.NAME).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default PeopleMongooseRepository;
