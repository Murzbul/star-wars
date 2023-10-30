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
            rotationPeriod: planet.name,
            orbitalPeriod: planet.name,
            diameter: planet.name,
            climate: planet.name,
            gravity: planet.name,
            terrain: planet.name,
            surfaceWater: planet.name,
            population: planet.name,
            url: planet.name,
            createdAt: dayjs(planet.createdAt).utc().unix(),
            updatedAt: dayjs(planet.updatedAt).utc().unix()
        };
    }
}

export default PlanetTransformer;
