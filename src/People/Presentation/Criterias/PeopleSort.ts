import { Sort } from '@digichanges/shared-experience';

class PeopleSort extends Sort
{
    static readonly NAME: string = 'name';

    getFields(): string[]
    {
        return [
            PeopleSort.NAME
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [PeopleSort.NAME]: 'asc' }  as Record<string, 'asc' | 'desc'>
        ];
    }
}

export default PeopleSort;
