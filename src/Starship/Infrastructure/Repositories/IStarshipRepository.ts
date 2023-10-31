import IBaseRepository from '../../../Main/Infrastructure/Repositories/IBaseRepository';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import IStarshipDomain from '../../Domain/Entities/IStarshipDomain';

interface IStarshipRepository extends IBaseRepository<IStarshipDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IStarshipRepository;
