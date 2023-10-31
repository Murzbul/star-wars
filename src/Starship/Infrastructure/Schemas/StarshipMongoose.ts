import * as mongoose from 'mongoose';
import Starship from '../../Domain/Entities/Starship';
import { randomUUID } from 'crypto';
import IStarshipDomain from '../../Domain/Entities/IStarshipDomain';

export type StarshipMongooseDocument = Document & IStarshipDomain;

const StarshipSchema: any = new mongoose.Schema<Starship>({
    _id: { type: String, default: randomUUID },
    name: { type: String, required: true },
    model: { type: String, required: true },
    manufacturer: { type: String, required: true },
    costInCredits: { type: String, required: true },
    length: { type: String, required: true },
    maxAtmospheringSpeed: { type: String, required: true },
    crew: { type: String, required: true },
    passengers: { type: String, required: true },
    cargoCapacity: { type: String, required: true },
    consumables: { type: String, required: true },
    hyperdriveRating: { type: String, required: true },
    mglt: { type: String, required: true },
    starshipClass: { type: String, required: true },
    pilots: [{ type: mongoose.Schema.Types.String, ref: 'People' }],
    url: { type: String, required: true }
}, { timestamps: true });

StarshipSchema.index({ url: 1 });
StarshipSchema.loadClass(Starship);

export default StarshipSchema;
