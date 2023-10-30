import IBaseRepository from '../../../Main/Infrastructure/Repositories/IBaseRepository';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import IPlanetDomain from '../../Domain/Entities/IPlanetDomain';

interface IPlanetRepository extends IBaseRepository<IPlanetDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IPlanetRepository;
