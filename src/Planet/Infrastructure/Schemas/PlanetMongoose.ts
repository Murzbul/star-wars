import * as mongoose from 'mongoose';
import Planet from '../../Domain/Entities/Planet';
import { randomUUID } from 'crypto';
import IPlanetDomain from '../../Domain/Entities/IPlanetDomain';

export type PlanetMongooseDocument = Document & IPlanetDomain;

const PlanetSchema: any = new mongoose.Schema<Planet>({
    _id: { type: String, default: randomUUID },
    name: { type: String, required: true },
    rotationPeriod: { type: String, required: true },
    orbitalPeriod: { type: String, required: true },
    diameter: { type: String, required: true },
    climate: { type: String, required: true },
    gravity: { type: String, required: true },
    terrain: { type: String, required: true },
    surfaceWater: { type: String, required: true },
    population: { type: String, required: true },
    url: { type: String, required: true }
}, { timestamps: true });

PlanetSchema.index({ url: 1 });
PlanetSchema.loadClass(Planet);

export default PlanetSchema;
