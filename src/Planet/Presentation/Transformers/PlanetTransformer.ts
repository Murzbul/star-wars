import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Transformer } from '@digichanges/shared-experience';
import IPlanetDomain from '../../Domain/Entities/IPlanetDomain';
import IPlanetTransformer from './IPlanetTransformer';

class PlanetTransformer extends Transformer
{
    constructor()
    {
        super();
    }

    public async transform(planet: IPlanetDomain): Promise<IPlanetTransformer>
    {
        dayjs.extend(utc);

        return {
            id: planet.getId(),
            name: planet.name,
            rotationPeriod: planet.rotationPeriod,
            orbitalPeriod: planet.orbitalPeriod,
            diameter: planet.diameter,
            climate: planet.climate,
            gravity: planet.gravity,
            terrain: planet.terrain,
            surfaceWater: planet.surfaceWater,
            population: planet.population,
            url: planet.url,
            createdAt: dayjs(planet.createdAt).utc().unix(),
            updatedAt: dayjs(planet.updatedAt).utc().unix()
        };
    }
}

export default PlanetTransformer;
