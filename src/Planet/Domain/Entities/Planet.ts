import IPlanetDomain from './IPlanetDomain';
import { Base } from '@digichanges/shared-experience';

class Planet extends Base implements IPlanetDomain
{
    name: string;
    rotationPeriod: string;
    orbitalPeriod: string;
    diameter: string;
    climate: string;
    gravity: string;
    terrain: string;
    surfaceWater: string;
    population: string;
    url: string;

    constructor()
    {
        super();
    }
}

export default Planet;
