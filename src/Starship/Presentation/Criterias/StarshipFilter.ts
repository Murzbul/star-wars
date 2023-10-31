import { Filter } from '@digichanges/shared-experience';

class StarshipFilter extends Filter
{
    static readonly NAME: string = 'name';

    getFields(): string[]
    {
        return [
            StarshipFilter.NAME
        ];
    }

    getDefaultFilters(): Record<string, number | boolean | string>[]
    {
        return [];
    }
}

export default StarshipFilter;
