import { Sort } from '@digichanges/shared-experience';

class StarshipSort extends Sort
{
    static readonly NAME: string = 'name';

    getFields(): string[]
    {
        return [
            StarshipSort.NAME
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [StarshipSort.NAME]: 'asc' }  as Record<string, 'asc' | 'desc'>
        ];
    }
}

export default StarshipSort;
