import IBaseRepository from '../../../Main/Infrastructure/Repositories/IBaseRepository';
import { IPaginator, ICriteria } from '@digichanges/shared-experience';
import IFilmDomain from '../../Domain/Entities/IFilmDomain';

interface IFilmRepository extends IBaseRepository<IFilmDomain>
{
    list(criteria: ICriteria): Promise<IPaginator>
}

export default IFilmRepository;
