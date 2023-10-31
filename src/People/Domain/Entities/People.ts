import IPeopleDomain from './IPeopleDomain';
import { Base } from '@digichanges/shared-experience';
import IPlanetDomain from "../../../Planet/Domain/Entities/IPlanetDomain";

class People extends Base implements IPeopleDomain
{
    name: string;
    height: string;
    mass: string;
    hairColor: string;
    skinColor: string;
    eyeColor: string;
    birthYear: string;
    gender: string;
    homeWorld: IPlanetDomain;
    url: string;

    constructor()
    {
        super();
    }
}

export default People;
