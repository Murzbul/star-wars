import { Sort } from '@digichanges/shared-experience';

class FilmSort extends Sort
{
    static readonly TITLE: string = 'title';

    getFields(): string[]
    {
        return [
            FilmSort.TITLE
        ];
    }

    getDefaultSorts(): Record<string, 'asc' | 'desc'>[]
    {
        return [
            { [FilmSort.TITLE]: 'asc' }  as Record<string, 'asc' | 'desc'>
        ];
    }
}

export default FilmSort;
