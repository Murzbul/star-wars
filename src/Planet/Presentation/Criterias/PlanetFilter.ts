import { Filter } from '@digichanges/shared-experience';

class PlanetFilter extends Filter
{
    static readonly NAME: string = 'name';
    static readonly CLIMATE: string = 'climate';

    getFields(): string[]
    {
        return [
            PlanetFilter.NAME,
            PlanetFilter.CLIMATE
        ];
    }

    getDefaultFilters(): Record<string, number | boolean | string>[]
    {
        return [];
    }
}

export default PlanetFilter;
