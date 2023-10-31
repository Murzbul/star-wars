import IByOptions from './IByOptions';

interface IBaseRepository<T>
{
    save(element: T): Promise<T>;
    saveMany(element: any): Promise<any>;
    update(element: T): Promise<T>;
    getOne(id: string): Promise<T>;
    delete(id: string): Promise<T>;
    getBy(condition: Record<string, any>, options: IByOptions): Promise<T[]>;

    getOneBy(condition: Record<string, any>, options: IByOptions): Promise<T | null>;
    getInBy(condition: Record<string, string[]>): Promise<T[]>;
}

export default IBaseRepository;
