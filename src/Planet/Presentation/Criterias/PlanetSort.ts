import { Sort } from '@digichanges/shared-experience';

class PlanetSort extends Sort
{
    static readonly NAME: string = 'name';

    getFields(): string[]
    {
        return [
            PlanetSort.NAME
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [PlanetSort.NAME]: 'asc' }  as Record<string, 'asc' | 'desc'>
        ];
    }
}

export default PlanetSort;
