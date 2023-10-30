import { IBaseDomain } from '@digichanges/shared-experience';
import PlanetRepPayload from '../Payloads/PlanetRepPayload';

interface IPlanetDomain extends IBaseDomain, PlanetRepPayload {}

export default IPlanetDomain;
