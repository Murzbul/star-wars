import { Filter } from '@digichanges/shared-experience';

class PeopleFilter extends Filter
{
    static readonly NAME: string = 'name';

    getFields(): string[]
    {
        return [
            PeopleFilter.NAME
        ];
    }

    getDefaultFilters(): Record<string, number | boolean | string>[]
    {
        return [];
    }
}

export default PeopleFilter;
