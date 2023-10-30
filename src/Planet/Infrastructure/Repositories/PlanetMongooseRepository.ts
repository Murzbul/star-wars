import * as mongoose from 'mongoose';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';

import IPlanetRepository from './IPlanetRepository';
import PlanetFilter from '../../Presentation/Criterias/PlanetFilter';
import MongoosePaginator from '../../../Main/Infrastructure/Orm/MongoosePaginator';

import BaseMongooseRepository from '../../../Main/Infrastructure/Repositories/BaseMongooseRepository';
import IPlanetDomain from '../../Domain/Entities/IPlanetDomain';
import Planet from '../../Domain/Entities/Planet';
import { PlanetMongooseDocument } from '../Schemas/PlanetMongoose';

class PlanetMongooseRepository extends BaseMongooseRepository<IPlanetDomain, PlanetMongooseDocument> implements IPlanetRepository
{
    constructor()
    {
        super(Planet.name);
    }

    async list(criteria: ICriteria): Promise<IPaginator>
    {
        const queryBuilder: mongoose.Query<PlanetMongooseDocument[], PlanetMongooseDocument> = this.repository.find();
        const filter = criteria.getFilter();


        if (filter.has(PlanetFilter.NAME))
        {
            const name: string = filter.get(PlanetFilter.NAME) as string;
            const rSearch = new RegExp(name, 'g');

            void queryBuilder.where(PlanetFilter.NAME).regex(rSearch);
        }

        if (filter.has(PlanetFilter.CLIMATE))
        {
            const type = filter.get(PlanetFilter.CLIMATE) as string;

            const rSearch = new RegExp(type, 'g');
            void queryBuilder.where(PlanetFilter.NAME).regex(rSearch);
        }

        return new MongoosePaginator(queryBuilder, criteria);
    }
}

export default PlanetMongooseRepository;
