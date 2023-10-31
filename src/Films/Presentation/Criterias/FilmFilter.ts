import { Filter } from '@digichanges/shared-experience';

class FilmFilter extends Filter
{
    static readonly SEARCH: string = 'search';

    getFields(): string[]
    {
        return [
            FilmFilter.SEARCH
        ];
    }

    getDefaultFilters(): Record<string, number | boolean | string>[]
    {
        return [];
    }
}

export default FilmFilter;
