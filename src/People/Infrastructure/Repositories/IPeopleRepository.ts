import IBaseRepository from '../../../Main/Infrastructure/Repositories/IBaseRepository';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import IPeopleDomain from '../../Domain/Entities/IPeopleDomain';

interface IPeopleRepository extends IBaseRepository<IPeopleDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IPeopleRepository;
